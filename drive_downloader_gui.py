# drive_downloader_gui.py
import tkinter as tk
from tkinter import ttk, filedialog, messagebox
import threading
import os

try:
    from drive_auth import (
        extract_id_from_url,
        authenticate_gdrive,
        get_file_or_folder_details,
        check_permissions,
        download_public_item_gdown
    )
    from pydrive2.files import ApiRequestError # For more specific API error catching
    DRIVE_AUTH_AVAILABLE = True
except ImportError:
    DRIVE_AUTH_AVAILABLE = False
    ApiRequestError = Exception # Dummy for fallback
    print("WARNING: drive_auth.py not found. GUI will run with limited functionality.")
    # Dummy functions
    def extract_id_from_url(url): return "dummy_id_" + url.split('/')[-1][:5] if url else None
    def authenticate_gdrive(): print("Auth: Dummy"); return None
    def get_file_or_folder_details(drive, item_id): return {'id': item_id, 'title': 'Dummy Item', 'mimeType': 'application/octet-stream', 'capabilities': {'canDownload': True}, 'fileSize': '1024', 'shared': False}
    def check_permissions(item): return {'id': item['id'], 'title': item['title'], 'type': 'file', 'mime_type': item['mimeType'], 'can_download': True, 'can_list_children': False, 'shared': item.get('shared',False)} if item else None

class DriveDownloaderApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Google Drive Downloader")
        self.root.geometry("750x600")

        self.drive_service = None
        self.current_drive_item_details = None
        self.total_files_to_download = 0
        self.files_downloaded_count = 0
        self.failed_downloads = [] # For aggregated error reporting

        # UI Setup (Frames, Buttons, Treeview, etc. - keeping it concise here as it's mostly unchanged)
        top_frame = ttk.Frame(self.root, padding="10"); top_frame.pack(fill=tk.X)
        middle_frame = ttk.Frame(self.root, padding="10"); middle_frame.pack(fill=tk.BOTH, expand=True)
        bottom_frame = ttk.Frame(self.root, padding="10"); bottom_frame.pack(fill=tk.X)
        progress_info_frame = ttk.Frame(self.root, padding="5"); progress_info_frame.pack(fill=tk.X, side=tk.BOTTOM)

        ttk.Label(top_frame, text="Google Drive Link:").pack(side=tk.LEFT, padx=(0, 5))
        self.url_entry = ttk.Entry(top_frame, width=60)
        self.url_entry.pack(side=tk.LEFT, expand=True, fill=tk.X, padx=(0, 5))
        self.fetch_button = ttk.Button(top_frame, text="Fetch Info", command=self.threaded_fetch_drive_info)
        self.fetch_button.pack(side=tk.LEFT)

        tree_frame = ttk.Frame(middle_frame); tree_frame.pack(fill=tk.BOTH, expand=True)
        self.tree = ttk.Treeview(tree_frame, columns=("type", "size", "id"), show="tree headings")
        self.tree.heading("#0", text="Name"); self.tree.column("#0", width=300, minwidth=150, stretch=tk.YES, anchor=tk.W)
        self.tree.heading("type", text="Type"); self.tree.column("type", width=100, anchor=tk.W)
        self.tree.heading("size", text="Size"); self.tree.column("size", width=100, anchor=tk.W)
        self.tree.heading("id", text="ID"); self.tree.column("id", width=200, anchor=tk.W)
        tree_ysb = ttk.Scrollbar(tree_frame, orient=tk.VERTICAL, command=self.tree.yview); tree_ysb.pack(side=tk.RIGHT, fill=tk.Y)
        tree_xsb = ttk.Scrollbar(tree_frame, orient=tk.HORIZONTAL, command=self.tree.xview); tree_xsb.pack(side=tk.BOTTOM, fill=tk.X)
        self.tree.configure(yscrollcommand=tree_ysb.set, xscrollcommand=tree_xsb.set); self.tree.pack(fill=tk.BOTH, expand=True)

        ttk.Label(bottom_frame, text="Download to:").pack(side=tk.LEFT, padx=(0, 5))
        self.download_path_entry = ttk.Entry(bottom_frame, width=50, state="readonly")
        self.download_path_entry.pack(side=tk.LEFT, expand=True, fill=tk.X, padx=(0, 5))
        self.select_folder_button = ttk.Button(bottom_frame, text="Select Folder", command=self.select_download_folder)
        self.select_folder_button.pack(side=tk.LEFT, padx=(0,5))
        self.download_button = ttk.Button(bottom_frame, text="Start Download", command=self.threaded_start_download, state=tk.DISABLED)
        self.download_button.pack(side=tk.LEFT)

        self.progress_label = ttk.Label(progress_info_frame, text="Progress: 0/0 files (0.00%)")
        self.progress_label.pack(side=tk.LEFT, fill=tk.X, expand=True)
        self.progress_bar = ttk.Progressbar(progress_info_frame, orient=tk.HORIZONTAL, length=100, mode='determinate')
        self.progress_bar.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(5,0))

        self.status_bar = ttk.Label(self.root, text="Status: Ready.", relief=tk.SUNKEN, anchor=tk.W, padding="2 5")
        self.status_bar.pack(side=tk.BOTTOM, fill=tk.X)

        if not DRIVE_AUTH_AVAILABLE:
            self.update_status("Status: CRITICAL - drive_auth.py not found.")
            messagebox.showerror("Setup Error", "drive_auth.py is missing.")

    def update_status(self, message):
        self.status_bar.config(text=message)
        # print(message) # Optional: for console logging during dev

    def update_progress_display(self):
        percentage = 0
        if self.total_files_to_download > 0:
            percentage = (self.files_downloaded_count / self.total_files_to_download) * 100
        self.progress_label.config(text=f"Progress: {self.files_downloaded_count}/{self.total_files_to_download} files ({percentage:.2f}%)")
        self.progress_bar['value'] = percentage
        self.root.update_idletasks()

    def _clear_treeview(self):
        for i in self.tree.get_children(): self.tree.delete(i)

    def threaded_fetch_drive_info(self):
        self.fetch_button.config(state=tk.DISABLED)
        self.download_button.config(state=tk.DISABLED)
        self.update_status("Status: Starting to fetch info...")
        threading.Thread(target=self.fetch_drive_info, daemon=True).start()

    def fetch_drive_info(self): # Mostly unchanged, error messages updated slightly
        try:
            url = self.url_entry.get()
            if not url: messagebox.showwarning("Input Error", "Please enter a Google Drive link."); return
            self.update_status(f"Status: Extracting ID from URL...")
            item_id = extract_id_from_url(url)
            if not item_id: messagebox.showerror("Link Error", "Could not extract ID from link."); self.update_status("Status: Invalid link."); return

            if not self.drive_service:
                self.update_status("Status: Authenticating...")
                self.drive_service = authenticate_gdrive()
            if not self.drive_service: messagebox.showerror("Auth Error", "Failed to authenticate. Check console."); self.update_status("Status: Authentication failed."); return

            self.update_status(f"Status: Fetching details for {item_id}...")
            drive_item_metadata = get_file_or_folder_details(self.drive_service, item_id) # From drive_auth
            if not drive_item_metadata: messagebox.showerror("Fetch Error", f"Could not fetch details for {item_id}. Check console."); self.update_status(f"Status: Fetch failed for {item_id}."); return

            self.current_drive_item_details = drive_item_metadata
            perms_info = check_permissions(drive_item_metadata) # From drive_auth
            if not perms_info: messagebox.showerror("Permission Error", "Could not check permissions. Check console."); self.update_status("Status: Permission check failed."); return

            self._clear_treeview()
            title, item_type, item_id_val = perms_info['title'], perms_info['type'], perms_info['id']

            self.update_status(f"Status: Displaying '{title}'...")
            if item_type == 'folder':
                if perms_info['can_list_children']:
                    self.tree.insert("", "end", text=title, iid=item_id_val, values=(item_type, "", item_id_val), open=True)
                    self._list_folder_contents(item_id_val, item_id_val)
                else:
                    self.tree.insert("", "end", text=f"{title} (Folder - No permission to list)", values=(item_type, "N/A", item_id_val))
            else:
                if perms_info['can_download']:
                    size_str = self._format_size(drive_item_metadata.get('fileSize'))
                    self.tree.insert("", "end", text=title, iid=item_id_val, values=(item_type, size_str, item_id_val))
                else:
                    self.tree.insert("", "end", text=f"{title} (File - No download permission)", values=(item_type, "N/A", item_id_val))

            self.update_status(f"Status: Displayed '{title}'.")
            if self.download_path_entry.get() and self.tree.get_children():
                self.download_button.config(state=tk.NORMAL)
        except ApiRequestError as ae: # More specific error
            messagebox.showerror("Drive API Error", f"Google Drive API error: {ae}")
            self.update_status(f"Status: Drive API Error - {ae}")
        except Exception as e:
            messagebox.showerror("Fetch Exception", f"An unexpected error occurred: {e}")
            self.update_status(f"Status: Error fetching - {e}")
        finally:
            if hasattr(self, 'fetch_button'): self.fetch_button.config(state=tk.NORMAL)

    def _list_folder_contents(self, folder_id, parent_tree_iid): # Mostly unchanged
        query = f"'{folder_id}' in parents and trashed=false"
        file_list = self.drive_service.ListFile({'q': query, 'maxResults': 500}).GetList()
        for drive_file_meta in file_list:
            perms = check_permissions(drive_file_meta)
            if perms:
                size_str = self._format_size(drive_file_meta.get('fileSize')) if perms['type'] != 'folder' else ""
                self.tree.insert(parent_tree_iid, "end", text=perms['title'], iid=perms['id'],
                                 values=(perms['type'], size_str, perms['id']))
            else: # Fallback if permissions check fails for a sub-item
                 self.tree.insert(parent_tree_iid, "end", text=drive_file_meta.get('title', 'Unknown item') + " (perms error)",
                                 values=(drive_file_meta.get('mimeType','unknown'), "", drive_file_meta.get('id','unknown')))


    def _format_size(self, s_val): # Mostly unchanged
        if s_val is None or not str(s_val).isdigit(): return "N/A"
        s = int(s_val)
        if s < 1024: return f"{s} B"
        if s < 1024**2: return f"{s/1024:.1f} KB"
        if s < 1024**3: return f"{s/1024**2:.1f} MB"
        return f"{s/1024**3:.1f} GB"

    def select_download_folder(self): # Mostly unchanged
        folder_selected = filedialog.askdirectory()
        if folder_selected:
            self.download_path_entry.config(state="normal"); self.download_path_entry.delete(0, tk.END)
            self.download_path_entry.insert(0, folder_selected); self.download_path_entry.config(state="readonly")
            if self.tree.get_children() and self.current_drive_item_details: # Check if item is loaded
                 self.download_button.config(state=tk.NORMAL)

    def threaded_start_download(self): # Mostly unchanged
        self.download_button.config(state=tk.DISABLED)
        self.fetch_button.config(state=tk.DISABLED)
        self.update_status("Status: Preparing to download...")
        threading.Thread(target=self.start_download_logic, daemon=True).start()

    def start_download_logic(self): # MODIFIED for aggregated error reporting
        self.failed_downloads = [] # Clear previous errors
        try:
            download_path = self.download_path_entry.get()
            if not download_path: messagebox.showwarning("Input Error", "Select download folder."); return
            if not self.current_drive_item_details: messagebox.showwarning("Download Error", "No item loaded. Please fetch info first."); return

            self.total_files_to_download = 0
            self.files_downloaded_count = 0

            if self.current_drive_item_details['mimeType'] == 'application/vnd.google-apps.folder':
                self.update_status("Status: Counting files in folder...")
                self.total_files_to_download = self._count_files_recursive(self.current_drive_item_details['id'])
            else:
                self.total_files_to_download = 1
            self.update_progress_display()
            if self.total_files_to_download == 0 and self.current_drive_item_details['mimeType'] == 'application/vnd.google-apps.folder':
                messagebox.showinfo("Info", "The selected folder appears to be empty or contains no downloadable files.")
                self.update_status("Status: Folder empty or no downloadable files.")
                return


            if self.current_drive_item_details['mimeType'] == 'application/vnd.google-apps.folder':
                self._recursive_download_folder(self.current_drive_item_details['id'], self.current_drive_item_details['title'], download_path)
            else:
                self._perform_download_item(
                    self.current_drive_item_details['id'],
                    self.current_drive_item_details['title'],
                    self.current_drive_item_details['mimeType'],
                    download_path
                )

            # After download loop finishes
            if not self.failed_downloads:
                messagebox.showinfo("Download Complete", f"All items downloaded successfully to {download_path}")
                self.update_status("Status: Download complete.")
            else:
                error_summary = f"{len(self.failed_downloads)} item(s) failed to download:\n"
                for title, err in self.failed_downloads[:10]: # Show first 10 errors
                    error_summary += f"- {title}: {err}\n"
                if len(self.failed_downloads) > 10:
                    error_summary += f"...and {len(self.failed_downloads) - 10} more."
                messagebox.showwarning("Download Partially Complete", error_summary)
                self.update_status(f"Status: Download complete with {len(self.failed_downloads)} errors.")

        except Exception as e:
            messagebox.showerror("Download Exception", f"An unexpected error occurred during download preparation or completion: {e}")
            self.update_status(f"Status: Error during download - {e}")
        finally:
            if hasattr(self, 'download_button'): self.download_button.config(state=tk.NORMAL)
            if hasattr(self, 'fetch_button'): self.fetch_button.config(state=tk.NORMAL)
            # Do not reset progress here, user might want to see the final count/errors

    def _count_files_recursive(self, folder_id): # Mostly unchanged, added some error logging
        count = 0
        query = f"'{folder_id}' in parents and trashed=false"
        try:
            file_list = self.drive_service.ListFile({'q': query, 'maxResults': 1000}).GetList()
            for item_meta in file_list:
                if item_meta['mimeType'] == 'application/vnd.google-apps.folder':
                    # Potentially add to a list of folders to process to avoid too deep recursion for counting
                    count += self._count_files_recursive(item_meta['id'])
                else: # Count as a file if it's not a folder and seems exportable/downloadable
                    perms = check_permissions(item_meta)
                    if perms and perms['can_download']:
                         count += 1
        except ApiRequestError as e: # Catch API errors during count
            print(f"API Error counting files in folder {folder_id}: {e}")
            self.update_status(f"Warning: Could not fully count files in {folder_id} due to API error.")
        except Exception as e:
            print(f"Generic error counting files in {folder_id}: {e}")
        return count

    def _get_export_mimetype_and_extension(self, original_mimetype): # Unchanged
        if 'google-apps.document' in original_mimetype:
            return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.docx'
        elif 'google-apps.spreadsheet' in original_mimetype:
            return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', '.xlsx'
        elif 'google-apps.presentation' in original_mimetype:
            return 'application/vnd.openxmlformats-officedocument.presentationml.presentation', '.pptx'
        return None, None

    def _perform_download_item(self, item_id, item_title, item_mime_type, current_local_path): # MODIFIED for error aggregation
        self.update_status(f"Status: Downloading '{item_title}'...")
        file_path_local = os.path.join(current_local_path, item_title)
        try:
            drive_file = self.drive_service.CreateFile({'id': item_id})
            os.makedirs(current_local_path, exist_ok=True) # Ensure directory exists

            if "google-apps" in item_mime_type:
                export_mime, export_ext = self._get_export_mimetype_and_extension(item_mime_type)
                if export_mime and export_ext:
                    base, _ = os.path.splitext(item_title)
                    file_path_local = os.path.join(current_local_path, base + export_ext)
                    drive_file.GetContentFile(file_path_local, mimetype=export_mime)
                    self.update_status(f"Status: Exported '{item_title}' as {export_ext}")
                else:
                    msg = f"Skipping '{item_title}', no export format defined."
                    self.update_status(f"Status: {msg}")
                    self.failed_downloads.append((item_title, "No export format"))
                    return # Don't increment downloaded count for this
            else:
                drive_file.GetContentFile(file_path_local)
                self.update_status(f"Status: Downloaded '{item_title}'")

            self.files_downloaded_count += 1
        except Exception as e:
            err_msg = str(e).split('\n')[0] # Get a cleaner error message
            self.update_status(f"Status: FAILED to download '{item_title}': {err_msg}")
            self.failed_downloads.append((item_title, err_msg))
            print(f"Error downloading {item_title} ({item_id}): {e}")
        finally:
            self.update_progress_display() # Update progress even on failure (to reflect attempt)


    def _recursive_download_folder(self, folder_id, folder_title, parent_local_path): # MODIFIED for error pass-through
        current_folder_path = os.path.join(parent_local_path, folder_title)
        if not os.path.exists(current_folder_path):
            try:
                os.makedirs(current_folder_path)
            except Exception as e:
                err_msg = f"Cannot create directory {current_folder_path}: {e}"
                self.update_status(f"Status: {err_msg}")
                self.failed_downloads.append((folder_title, f"Failed to create local folder: {e}"))
                # If we can't create the folder, we can't download its contents to the right place.
                # We might want to skip trying to list/download its children.
                return

        self.update_status(f"Status: Processing folder '{folder_title}'...")
        query = f"'{folder_id}' in parents and trashed=false"
        try:
            file_list = self.drive_service.ListFile({'q': query, 'maxResults': 1000}).GetList()
            for item_meta in file_list:
                item_id, item_title, item_mime = item_meta['id'], item_meta['title'], item_meta['mimeType']
                if item_mime == 'application/vnd.google-apps.folder':
                    self._recursive_download_folder(item_id, item_title, current_folder_path)
                else:
                    # Check if item is downloadable before attempting (using already fetched metadata if possible)
                    # This check is implicitly done by _perform_download_item's try-except
                    self._perform_download_item(item_id, item_title, item_mime, current_folder_path)
        except ApiRequestError as e: # Catch API errors during listing
            err_msg = f"API error listing folder '{folder_title}': {e}"
            self.update_status(f"Status: {err_msg}")
            self.failed_downloads.append((folder_title, f"API error listing contents: {e}"))
        except Exception as e:
            err_msg = f"Error processing folder '{folder_title}': {e}"
            self.update_status(f"Status: {err_msg}")
            self.failed_downloads.append((folder_title, f"Generic error processing: {e}"))


if __name__ == '__main__':
    root = tk.Tk()
    app = DriveDownloaderApp(root)
    root.mainloop()
