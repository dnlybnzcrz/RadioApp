from flask import Flask, request, jsonify
from pyfcm import FCMNotification

app = Flask(__name__)

# TODO: Replace with your Firebase Cloud Messaging server key
FCM_API_KEY = "YOUR_FCM_SERVER_KEY"
push_service = FCMNotification(FCM_API_KEY)

# In-memory list of device tokens for demo purposes
# In production, store device tokens in a database
device_tokens = []

@app.route('/register_token', methods=['POST'])
def register_token():
    data = request.json
    token = data.get('token')
    if token and token not in device_tokens:
        device_tokens.append(token)
        return jsonify({"message": "Token registered successfully"}), 200
    return jsonify({"message": "Invalid or duplicate token"}), 400

@app.route('/send_notification', methods=['POST'])
def send_notification():
    data = request.json
    title = data.get('title')
    message = data.get('message')

    if not title or not message:
        return jsonify({"error": "Title and message are required"}), 400

    if not device_tokens:
        return jsonify({"error": "No device tokens registered"}), 400

    result = push_service.notify_multiple_devices(registration_ids=device_tokens, message_title=title, message_body=message)
    return jsonify({"result": result}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
