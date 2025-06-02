import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

export default function NotificationsScreen() {
  const { colors, isDarkMode } = useTheme();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Request permission and get device push token
  useEffect(() => {
    registerForPushNotificationsAsync();
    // Listener for receiving notifications
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      setNotificationMessage(notification.request.content.body);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    // Clean up listeners
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  // Request push notification permission
  const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: colors.secondary,
      });
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission for push notifications denied');
      return;
    }

    // Get the push token
    const token = await Notifications.getExpoPushTokenAsync();
    setExpoPushToken(token);
    console.log(token); // Send this token to your backend to send notifications
  };

  // Handle sending a test push notification
  const sendTestNotification = async () => {
    if (!expoPushToken) {
      Alert.alert('No push token available. Please try again later.');
      return;
    }

    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Test Notification',
      body: 'This is a test push notification!',
      data: { someData: 'Some additional data' },
    };

    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Notification sent successfully!');
      } else {
        Alert.alert('Failed to send notification', data.error || 'Unknown error');
      }
    } catch (error) {
      Alert.alert('Error sending notification', error.message);
    }
  };

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={[styles.text, { color: colors.text } ]}>Notifications</Text>
        {expoPushToken ? (
          <>
            <Text style={[styles.tokenText, { color: colors.text } ]}>Expo Push Token: {expoPushToken}</Text>
            <Button title="Send Test Notification" onPress={sendTestNotification} color={colors.button} />
          </>
        ) : (
          <Text style={[styles.tokenText, { color: colors.text } ]}>Getting token...</Text>
        )}
        {notification && (
          <View style={[styles.notificationContainer, { backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' }]}>
            <Text style={[styles.notificationText, { color: colors.text } ]}>New notification received!</Text>
            <Text style={[styles.notificationMessage, { color: colors.text } ]}>{notificationMessage}</Text>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tokenText: {
    fontSize: 14,
    marginBottom: 20,
  },
  notificationContainer: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  notificationText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationMessage: {
    fontSize: 14,
  },
});
