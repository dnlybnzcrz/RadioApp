# React Native Firebase Messaging Setup Instructions

## 1. Install React Native Firebase Messaging

Run the following commands in your React Native project directory:

```bash
npm install --save @react-native-firebase/app
npm install --save @react-native-firebase/messaging
```

or if you use yarn:

```bash
yarn add @react-native-firebase/app
yarn add @react-native-firebase/messaging
```

## 2. Configure Firebase for Android

- Place your `google-services.json` file in `android/app/`.
- Add the following to your `android/build.gradle`:

```gradle
buildscript {
    dependencies {
        // Add this line
        classpath 'com.google.gms:google-services:4.4.2'
    }
}
```

- Add the following to your `android/app/build.gradle`:

```gradle
apply plugin: 'com.google.gms.google-services'
```

## 3. Configure Firebase for iOS

- Place your `GoogleService-Info.plist` in the `ios/` directory.
- Run `pod install` in the `ios/` directory.

## 4. Request Permission and Handle Notifications in React Native

Example code snippet:

```javascript
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert } from 'react-native';

function App() {
  useEffect(() => {
    // Request permission
    messaging().requestPermission()
      .then(authStatus => {
        if (authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
          console.log('Authorization status:', authStatus);
        }
      });

    // Get the device token
    messaging().getToken().then(token => {
      console.log('Device FCM Token:', token);
      // TODO: Send this token to your backend to register the device
    });

    // Listen to messages when app is in foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    // Your app component
  );
}

export default App;
```

## 5. Register Device Token with Backend

Send the FCM token to your backend API `/register_token` endpoint to register the device for notifications.

## 6. Test Push Notifications

Use your admin panel to send notifications via the backend, which will forward them to registered devices.

---

If you want, I can help you integrate this code into your React Native app or assist with any of these steps.
