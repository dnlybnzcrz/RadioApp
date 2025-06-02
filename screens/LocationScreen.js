import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function AutoLocation({ onLocationSelected }) {
  const { colors, isDarkMode } = useTheme();
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const scaleAnim = useRef(new Animated.Value(0)).current;  // <- useRef to persist animation value

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        let reverseGeocode = await Location.reverseGeocodeAsync(location.coords);

        if (reverseGeocode.length > 0) {
          const place = reverseGeocode[0];
          setCity(place.city || place.region || 'Unknown');
        } else {
          setCity('City not found');
        }
      } catch (error) {
        setErrorMsg('Error fetching location');
      } finally {
        setLoading(false);
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }).start();
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={[styles.loaderContainer, { backgroundColor: colors.background[0] }]}>
        <ActivityIndicator size="large" color={colors.button} />
        <Text style={[styles.loaderText, { color: colors.textSecondary }]}>Detecting your location...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colors.background[0] }]}>
        <MaterialIcons name="error-outline" size={60} color={colors.secondary} />
        <Text style={[styles.errorText, { color: colors.secondary }]}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background[0] }]}>
      <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }], backgroundColor: colors.primary, shadowColor: colors.button }]}>
        <View style={[styles.iconWrapper, { backgroundColor: colors.button }]}>
          <MaterialIcons name="location-on" size={40} color={colors.buttonText} />
        </View>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Detected City</Text>
        <Text style={[styles.city, { color: colors.button }]}>{city}</Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.button }]} onPress={onLocationSelected}>
          <Text style={[styles.buttonText, { color: colors.buttonText }]}>Confirm Location</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '90%',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  iconWrapper: {
    borderRadius: 50,
    padding: 12,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  city: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});
