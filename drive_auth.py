# drive_auth.py
from pydrive2.auth import GoogleAuth
from pydrive2.drive import GoogleDrive
from pydrive2.files import ApiRequestError
import os
import re # For URL parsing
import gdown # For public downloads

# Path to the credentials.json file
CLIENT_SECRETS_FILE = 'credentials.json'
SAVED_CREDENTIALS_FILE = 'mycreds.txt'

def extract_id_from_url(url):
    """
    Extracts the Google Drive file or folder ID from various URL formats.
    """
    patterns = [
        r"/file/d/([a-zA-Z0-9_-]+)",
        r"/drive/folders/([a-zA-Z0-9_-]+)",
        r"/drive/u/[0-9]+/folders/([a-zA-Z0-9_-]+)",
        r"id=([a-zA-Z0-9_-]+)"
    ]
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    return None

def authenticate_gdrive():
    """
    Authenticates with Google Drive using OAuth 2.0.
    Returns:
        GoogleDrive: An authenticated GoogleDrive object from PyDrive2, or None if authentication fails.
    """
    gauth = GoogleAuth()
    try:
        gauth.LoadCredentialsFile(SAVED_CREDENTIALS_FILE)
    except Exception:
        print(f"Could not load saved credentials from {SAVED_CREDENTIALS_FILE}. Proceeding with new authentication.")

    if gauth.credentials is None:
        try:
            if not os.path.exists(CLIENT_SECRETS_FILE):
                print(f"ERROR: {CLIENT_SECRETS_FILE} not found. Please complete Step 2 of setup_guide.py.")
                return None
            gauth.LoadClientConfigFile(CLIENT_SECRETS_FILE)
            gauth.LocalWebserverAuth()
        except Exception as e:
            print(f"Error during LocalWebserverAuth: {e}")
            return None
    elif gauth.access_token_expired:
        try:
            gauth.Refresh()
        except Exception as e:
            print(f"Error refreshing token: {e}")
            print(f"Token refresh failed. Please try re-authenticating by deleting {SAVED_CREDENTIALS_FILE}")
            return None
    else:
        try:
            gauth.Authorize()
        except Exception as e:
            print(f"Error authorizing with saved credentials: {e}")
            return None

    try:
        gauth.SaveCredentialsFile(SAVED_CREDENTIALS_FILE)
    except Exception as e:
        print(f"Warning: Error saving credentials to {SAVED_CREDENTIALS_FILE}: {e}")

    try:
        drive = GoogleDrive(gauth)
        return drive
    except Exception as e:
        print(f"Error creating GoogleDrive instance: {e}")
        return None

def get_file_or_folder_details(drive_service, item_id):
    """
    Fetches metadata for a given Google Drive file or folder ID.
    """
    if not drive_service:
        print("Drive service not authenticated.")
        return None
    try:
        drive_item = drive_service.CreateFile({'id': item_id})
        drive_item.FetchMetadata(fields="id, title, mimeType, capabilities, labels, shared, exportLinks") # Added exportLinks
        return drive_item
    except ApiRequestError as e:
        if 'HttpError 404' in str(e) or 'notFound' in str(e):
            print(f"Error: Item with ID '{item_id}' not found via API.")
        elif 'HttpError 403' in str(e):
            print(f"Error: Permission denied for item ID '{item_id}' via API. You might not have access or it's not shared with you.")
        else:
            print(f"API Error fetching details for item ID '{item_id}': {e}")
        return None
    except Exception as e:
        print(f"Generic error fetching details for item ID '{item_id}': {e}")
        return None

def check_permissions(drive_item):
    """
    Checks download/list capabilities for a Drive item.
    """
    if drive_item is None:
        return None

    item_type = 'unknown'
    if 'application/vnd.google-apps.folder' in drive_item['mimeType']:
        item_type = 'folder'
    elif 'google-apps' not in drive_item['mimeType']:
        item_type = 'file'
    else:
        item_type = 'google_doc'

    capabilities = drive_item.get('capabilities', {})
    can_download = capabilities.get('canDownload', False)
    can_export = bool(drive_item.get('exportLinks')) # More reliable for Google Docs
    can_list_children = capabilities.get('canListChildren', False) if item_type == 'folder' else False

    actual_can_download = can_download
    if item_type == 'google_doc':
        actual_can_download = can_export # For google docs, "download" means "export"

    return {
        'id': drive_item['id'],
        'title': drive_item['title'],
        'type': item_type,
        'mime_type': drive_item['mimeType'],
        'can_download': actual_can_download, # Reflects direct download or export capability
        'can_list_children': can_list_children,
        'shared': drive_item.get('shared', False)
    }

def download_public_item_gdown(item_id_or_url, destination_folder, is_folder=False):
    """
    Downloads a public Google Drive file or folder using gdown.
    Note: For folders, gdown typically downloads them as a zip archive if the URL is specific.
    Downloading a folder ID directly with gdown might be more complex or might only fetch an HTML page.

    Args:
        item_id_or_url (str): The Google Drive file/folder ID or its public URL.
        destination_folder (str): The local folder to save the downloaded item.
        is_folder (bool): Set to True if the ID/URL points to a folder.
                          gdown handles folders by zipping them, requires folder URL.
    Returns:
        str: Path to the downloaded file/folder, or None if download failed.
    """
    if not os.path.exists(destination_folder):
        try:
            os.makedirs(destination_folder)
        except Exception as e:
            print(f"Error creating destination folder {destination_folder}: {e}")
            return None

    # If it's an ID, construct a common URL format gdown might understand
    # For files: https://drive.google.com/uc?id=FILE_ID
    # For folders: https://drive.google.com/drive/folders/FOLDER_ID (gdown needs this for --folder)
    if not item_id_or_url.startswith('http'):
        if is_folder:
            url = f"https://drive.google.com/drive/folders/{item_id_or_url}"
        else:
            url = f"https://drive.google.com/uc?id={item_id_or_url}"
    else:
        url = item_id_or_url

    try:
        print(f"Attempting to download with gdown: {url}")
        if is_folder:
            # gdown downloads folders as zip files. Output path needs to be handled accordingly.
            # The output will be {destination_folder}/{folder_name}.zip if gdown zips it.
            # Or it might download into a subdirectory if gdown extracts.
            # For simplicity, let's assume gdown handles naming within the dest folder.
            output_path = gdown.download_folder(url, output=destination_folder, quiet=False, use_cookies=False)
            # gdown.download_folder returns the path to the downloaded folder (or zip)
        else:
            output_path = gdown.download(url, output=os.path.join(destination_folder, url.split('/')[-1]), quiet=False, fuzzy=True)
            # Try to get a better name if possible, gdown might create a generic name from URL
            # For uc?id= type URLs, the above os.path.join might not be ideal.
            # gdown.download returns the path to the downloaded file.

        print(f"gdown downloaded to: {output_path}")
        return output_path
    except Exception as e:
        print(f"Error downloading with gdown (URL: {url}): {e}")
        print("This could be due to the file not being public, an invalid URL/ID, or gdown limitations.")
        return None

if __name__ == '__main__':
    # --- Test URL Extraction ---
    print("\n--- Testing URL Extraction ---")
    test_urls = [
        "https://drive.google.com/file/d/1abcdef123456/view?usp=sharing",
        "https://drive.google.com/drive/folders/1ghijkl789012?usp=sharing",
        "https://docs.google.com/document/d/1mnopqr345678/edit",
        "https://drive.google.com/drive/u/0/folders/1stuvwx901234"
    ]
    for t_url in test_urls:
        print(f"URL: {t_url} -> ID: {extract_id_from_url(t_url)}")

    # --- Test gdown Download (requires actual public file/folder) ---
    print("\n--- Testing gdown Download ---")
    # IMPORTANT: Replace with a REAL PUBLICLY ACCESSIBLE Google Drive file URL or ID for testing gdown
    public_file_id_for_gdown = "19gO9gG540gTdxoP3G2tDqL_123abcXYZ" # Replace! This is a fake ID.
    # Example public file ID (a small PNG image): 1drvD9vSgF5j2S_QkQ019y2kH7kAbctUn (This is a real example you can try)
    # public_file_id_for_gdown = "1drvD9vSgF5j2S_QkQ019y2kH7kAbctUn" # Real public small PNG

    # IMPORTANT: Replace with a REAL PUBLICLY ACCESSIBLE Google Drive folder URL for testing gdown folder download
    # public_folder_url_for_gdown = "https://drive.google.com/drive/folders/YOUR_PUBLIC_FOLDER_ID_HERE?usp=sharing" # Replace!
    # Example public folder URL (contains a few small files):
    # public_folder_url_for_gdown = "https://drive.google.com/drive/folders/1Y1peEv9kfXifjRjS_yPjV3R8D7gqvXJc?usp=sharing" # Real public folder

    gdown_test_destination = "gdown_downloads" # gdown will create this folder if it doesn't exist

    if public_file_id_for_gdown == "19gO9gG540gTdxoP3G2tDqL_123abcXYZ":
        print("Skipping gdown file download test - please replace 'public_file_id_for_gdown' with a real public file ID.")
    else:
        print(f"Attempting gdown download for file ID: {public_file_id_for_gdown}")
        downloaded_file_path = download_public_item_gdown(public_file_id_for_gdown, gdown_test_destination, is_folder=False)
        if downloaded_file_path:
            print(f"gdown file download test successful: {downloaded_file_path}")
        else:
            print("gdown file download test failed.")

    # if "YOUR_PUBLIC_FOLDER_ID_HERE" in public_folder_url_for_gdown:
    #     print("Skipping gdown folder download test - please replace 'public_folder_url_for_gdown' with a real public folder URL.")
    # else:
    #     print(f"Attempting gdown download for folder URL: {public_folder_url_for_gdown}")
    #     downloaded_folder_path = download_public_item_gdown(public_folder_url_for_gdown, gdown_test_destination, is_folder=True)
    #     if downloaded_folder_path:
    #         print(f"gdown folder download test successful: {downloaded_folder_path}")
    #     else:
    #         print("gdown folder download test failed.")


    print("\n--- Testing Authenticated API Access ---")
    drive = authenticate_gdrive()
    if drive:
        print("Successfully authenticated with Google Drive.")
        test_ids = {
            # Using the example public IDs from before for authenticated access test too
            "public_file_id_api": "1drvD9vSgF5j2S_QkQ019y2kH7kAbctUn", # Real public small PNG
            "public_folder_id_api": "1Y1peEv9kfXifjRjS_yPjV3R8D7gqvXJc", # Real public folder
            "your_private_file_id": "YOUR_FILE_ID_HERE",
            "your_private_folder_id": "YOUR_FOLDER_ID_HERE"
        }
        for name, item_id_to_test in test_ids.items():
            if "YOUR_" in item_id_to_test:
                 print(f"\nSkipping '{name}' - Please replace with an actual private ID for testing.")
                 continue

            print(f"\n--- Testing API Access for '{name}' (ID: {item_id_to_test}) ---")
            item_details = get_file_or_folder_details(drive, item_id_to_test)
            if item_details:
                permissions_info = check_permissions(item_details)
                if permissions_info:
                    print(f"Details for '{permissions_info['title']}' (ID: {permissions_info['id']}):")
                    print(f"  Type: {permissions_info['type']} (MIME: {permissions_info['mime_type']})")
                    print(f"  Shared: {permissions_info['shared']}")
                    if permissions_info['type'] == 'folder':
                        print(f"  Can list children: {permissions_info['can_list_children']}")
                    else: # file or google_doc
                        print(f"  Can download/export: {permissions_info['can_download']}")
                        if permissions_info['type'] == 'google_doc' and item_details.get('exportLinks'):
                            print(f"  Exportable (e.g., as PDF, DOCX): True")
                        elif permissions_info['type'] == 'google_doc':
                            print(f"  Exportable: False (No exportLinks found)")
                else:
                    print(f"Could not determine permissions for item ID {item_id_to_test}")
            else:
                print(f"Could not retrieve details for item ID {item_id_to_test} via API.")
    else:
        print("Failed to authenticate with Google Drive for API tests.")
