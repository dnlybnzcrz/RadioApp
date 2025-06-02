import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LocationScreen from './screens/LocationScreen';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import { ThemeProvider } from './context/ThemeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [locationSelected, setLocationSelected] = useState(false);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!locationSelected ? (
            <Stack.Screen name="Location">
              {() => <LocationScreen onLocationSelected={() => setLocationSelected(true)} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Main" component={BottomTabNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
