import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function LocationScreen({ onLocationSelected }) {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Request location permissions on initial render
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'We need access to your location to proceed');
        return;
      }
    })();
  }, []);

  const getCityFromLocation = async () => {
    setLoading(true);

    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      console.log("Location Coordinates:", latitude, longitude);

      // Reverse Geocoding API to fetch the city name
      const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`);
      const data = await response.json();
      console.log("Reverse Geocoding Response:", data);

      if (data.results && data.results.length > 0) {
        const city = data.results[0].components.city || data.results[0].components.town || data.results[0].components.village;
        if (city) {
          setCity(city);
          onLocationSelected(city);
        } else {
          Alert.alert('Error', 'City information is unavailable');
        }
      } else {
        Alert.alert('Error', 'Could not fetch city from location');
      }
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to retrieve location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Get Your Location</Text>
      <Text style={styles.subtitle}>We'll automatically fetch your city</Text>

      {loading ? (
        <Text style={styles.loadingText}>Fetching your location...</Text>
      ) : (
        <>
          {city ? (
            <Text style={styles.cityText}>You are in: {city}</Text>
          ) : (
            <TouchableOpacity style={styles.button} onPress={getCityFromLocation}>
              <Text style={styles.buttonText}>Get Location</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 30,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  cityText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e91e63',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
