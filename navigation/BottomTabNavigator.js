import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import RadioScreen from '../screens/RadioScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar, 
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Radio') iconName = 'radio';
          else if (route.name === 'Programs') iconName = 'list';
          else if (route.name === 'Notifications') iconName = 'notifications';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFD700', 
        tabBarInactiveTintColor: '#B0B0B0', 
        tabBarLabelStyle: styles.tabBarLabel, 
        tabBarLabelPosition: 'below-icon', 
        tabBarHideOnKeyboard: true, 
      })}
    >
      <Tab.Screen name="Radio" component={RadioScreen} />
      <Tab.Screen name="Programs" component={ProgramsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'black', 
    borderTopWidth: 0, 
    height: 80, 
    paddingBottom: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, 
  },
  tabBarLabel: {
    fontSize: 12, 
    fontWeight: '600', 
    textTransform: 'uppercase', 
    marginBottom: 5, 
  },
});
