# setup_guide.py

print("""
--------------------------------------------------------------------------------
Step 1: Install Required Python Libraries
--------------------------------------------------------------------------------

Please open your terminal or command prompt and run the following pip commands
to install the necessary libraries for this project:

pip install google-api-python-client google-auth-oauthlib google-auth-httplib2 pydrive2 gdown tkinter

--------------------------------------------------------------------------------
Step 2: Configure Google Cloud Project and Obtain credentials.json
--------------------------------------------------------------------------------

To use the Google Drive API, you need to set up a project in the Google Cloud
Platform and get OAuth 2.0 credentials.

1.  **Go to the Google Cloud Console:**
    Visit https://console.cloud.google.com/ and log in with your Google account.

2.  **Create a New Project (or Select an Existing One):**
    *   Click the project dropdown in the top navigation bar.
    *   Click "NEW PROJECT".
    *   Enter a "Project name" (e.g., "My Drive Downloader App") and click "CREATE".

3.  **Enable the Google Drive API:**
    *   Once your project is selected, use the search bar at the top to search for
        "Google Drive API".
    *   Select "Google Drive API" from the search results.
    *   Click the "ENABLE" button. If it's already enabled, you'll see "MANAGE".

4.  **Configure the OAuth Consent Screen:**
    *   In the left navigation menu (or by searching), go to "APIs & Services" > "OAuth consent screen".
    *   Choose "External" for the User Type (unless you have a Google Workspace account and want to limit it internally). Click "CREATE".
    *   Fill in the required fields:
        *   "App name": Something like "Tkinter Drive Downloader"
        *   "User support email": Your email address.
        *   "Developer contact information" (email): Your email address.
    *   Click "SAVE AND CONTINUE" through the "Scopes" and "Test users" sections.
        You don't need to add specific scopes here; the application will request them.
        For "Test users", you can add your own Google account if you chose "External" and your app is in "testing" mode.
    *   Review the summary and click "BACK TO DASHBOARD".

5.  **Create OAuth 2.0 Credentials:**
    *   In the left navigation menu, go to "APIs & Services" > "Credentials".
    *   Click "+ CREATE CREDENTIALS" at the top.
    *   Select "OAuth client ID".
    *   For "Application type", choose "Desktop app".
    *   Give it a "Name" (e.g., "Drive Downloader Desktop Client").
    *   Click "CREATE".
    *   A dialog will appear showing your "Client ID" and "Client secret".
        **Important:** Click "DOWNLOAD JSON" on this screen. This will download
        a file, likely named `client_secret_xxxxxxxx.json`.

6.  **Rename and Place credentials.json:**
    *   Rename the downloaded JSON file to exactly `credentials.json`.
    *   Place this `credentials.json` file in the **same directory** as the
        main Python application script you will be creating for the downloader.
        If you are running this `setup_guide.py` script, place it in the same
        directory as this guide for now.

--------------------------------------------------------------------------------
Step 3: (Optional) Create an API Key for Public Files (Alternative to gdown)
--------------------------------------------------------------------------------

If you want to access public Google Drive files without user authentication
(OAuth) for some specific scenarios, and prefer not to use the `gdown` library,
you can create an API Key. Note: `gdown` is often simpler for this purpose.

1.  **Go to "APIs & Services" > "Credentials".**
2.  **Click "+ CREATE CREDENTIALS" and select "API key".**
3.  The API key will be created. You can copy it and use it in your application.
    **Important:** Restrict your API key to only the Google Drive API to enhance
    security. Click on the newly created API key, go to "API restrictions",
    select "Restrict key", and choose "Google Drive API" from the dropdown.

--------------------------------------------------------------------------------
Setup guidance complete. Once you have followed these steps, you'll be ready
to proceed with building the application.
--------------------------------------------------------------------------------
""")

if __name__ == "__main__":
    # This script is just a guide, so it prints the instructions.
    # No actual setup is performed by running this script.
    pass
