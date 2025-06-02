import tkinter as tk
from tkinter import messagebox

class AdminPanel(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Admin Panel - Notification Sender")
        self.geometry("400x300")

        # Notification title label and entry
        self.label_title = tk.Label(self, text="Notification Title:")
        self.label_title.pack(pady=(20, 5))
        self.entry_title = tk.Entry(self, width=50)
        self.entry_title.pack(pady=(0, 10))

        # Notification message label and text box
        self.label_message = tk.Label(self, text="Notification Message:")
        self.label_message.pack(pady=(10, 5))
        self.text_message = tk.Text(self, height=8, width=50)
        self.text_message.pack(pady=(0, 10))

        # Send button
        self.button_send = tk.Button(self, text="Send Notification", command=self.send_notification)
        self.button_send.pack(pady=(10, 20))

    def send_notification(self):
        title = self.entry_title.get().strip()
        message = self.text_message.get("1.0", tk.END).strip()

        if not title or not message:
            messagebox.showwarning("Input Error", "Please enter both title and message.")
            return

        # Send notification to backend API
        import requests
        try:
            response = requests.post(
                "http://localhost:5000/send_notification",
                json={"title": title, "message": message},
                timeout=5
            )
            if response.status_code == 200:
                messagebox.showinfo("Notification Sent", "Notification has been sent successfully.")
            else:
                messagebox.showerror("Error", f"Failed to send notification: {response.text}")
        except Exception as e:
            messagebox.showerror("Error", f"Error sending notification: {e}")

        # Clear inputs after sending
        self.entry_title.delete(0, tk.END)
        self.text_message.delete("1.0", tk.END)

if __name__ == "__main__":
    app = AdminPanel()
    app.mainloop()
