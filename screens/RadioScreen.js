import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Image, Dimensions, Easing, Share } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');

export default function RadioScreen() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

  const radioUrl = 'http://58.97.187.52:5001/rp1';

  const barAnimations = useRef(
    Array.from({ length: 18 }, () => new Animated.Value(30))
  ).current;

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    if (isPlaying) {
      startContinuousFrequencyAnimation();
    } else {
      resetFrequencyBars();
    }
  }, [isPlaying]);

  const startContinuousFrequencyAnimation = () => {
    barAnimations.forEach((anim) => {
      Animated.loop(
        Animated.timing(anim, {
          toValue: Math.random() * 50 + 20,
          duration: Math.random() * 600 + 400,
          easing: Easing.inOut(Easing.linear),
          useNativeDriver: false,
        })
      ).start();
    });
  };

  const resetFrequencyBars = () => {
    barAnimations.forEach((anim) => {
      Animated.timing(anim, {
        toValue: 30,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    });
  };

  const handlePlayPause = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      if (sound) {
        const status = await sound.getStatusAsync();
        if (status.isLoaded && status.isPlaying) {
          await sound.unloadAsync();
          setSound(null);
          setIsPlaying(false);
        } else {
          await playStream();
        }
        return;
      }

      await playStream();
    } catch (error) {
      console.error('Error playing stream:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playStream = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        playsThroughEarpieceAndroid: false,
        shouldDuckAndroid: false,
      });

      const newSound = new Audio.Sound();
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded || status.didJustFinish) {
          setIsPlaying(false);
        }
      });

      await newSound.loadAsync({ uri: radioUrl }, { shouldPlay: true });
      await newSound.playAsync();

      setSound(newSound);
      setIsPlaying(true);
    } catch (error) {
      console.error('Error starting stream:', error);
    }
  };

  const shareApp = async () => {
    try {
      await Share.share({
        message: 'Listen to Radyo Pilipinas! 📻🎶 Download the app now: [APP_LINK]',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleRecord = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await newRecording.startAsync();

      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording saved to:', uri);

      const newPath = `${FileSystem.documentDirectory}radyo_pilipinas.mp3`;
      await FileSystem.moveAsync({ from: uri, to: newPath });

      setIsRecording(false);
      setRecording(null);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  return (
    <LinearGradient colors={colors.background} style={styles.container}>
      <TouchableOpacity 
        style={[styles.themeToggle, { borderColor: colors.text, borderWidth: 2, borderRadius: 50, backgroundColor: isDarkMode ? 'black' : '#f0f0f0' }]}
        onPress={toggleTheme}
      >
        <Ionicons 
          name={isDarkMode ? 'sunny' : 'moon'} 
          size={30} 
          color={colors.text}
        />
      </TouchableOpacity>

      <View style={styles.centerContent}>
        <Image source={require('../assets/rp1.jpg')} style={[styles.albumCover, { borderColor: colors.textSecondary }]} />

        <Text style={[styles.nowPlaying, { color: colors.text }]}>Now Streaming</Text>
        <Text style={[styles.songTitle, { color: colors.text }]}>RADYO PILIPINAS</Text>
        <Text style={[styles.artist, { color: colors.textSecondary }]}>738 KHz</Text>

        <View style={[styles.frequencyContainer, { backgroundColor: isDarkMode ? '#000' : '#F0F0F0' }]}>
          {barAnimations.map((anim, index) => (
            <Animated.View 
              key={index} 
              style={[
                styles.frequencyBar, 
                { 
                  height: anim,
                  backgroundColor: colors.textSecondary 
                }
              ]} 
            />
          ))}
        </View>

        <View style={styles.controls}>
          <TouchableOpacity onPress={shareApp}>
            <Ionicons name="share-social" size={30} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handlePlayPause} 
            style={[styles.playButton, { backgroundColor: colors.button }]}
          >
            <Ionicons 
              name={isPlaying ? 'pause' : 'play'} 
              size={40} 
              color={colors.buttonText} 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRecord}>
            <Ionicons 
              name={isRecording ? 'stop-circle' : 'radio'} 
              size={30} 
              color={colors.text} 
            />
          </TouchableOpacity>
        </View>
      </View>
      <Image source={require('../assets/wobg.png')} style={styles.logoHandle} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  themeToggle: {
    position: 'absolute',
    top: 60,
    right: 20,
    padding: 10,
    zIndex: 1,
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.9,
    height: height * 0.9,
    position: 'relative',
  },
  albumCover: {
    width: 275,
    height: 275,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 3,
  },
  nowPlaying: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  songTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  artist: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  frequencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.8,
    height: 60,
    marginBottom: 20,
    borderRadius: 10,
    padding: 10,
  },
  frequencyBar: {
    width: 5,
    marginHorizontal: 5,
    borderRadius: 5,
    shadowOpacity: 0.9,
    elevation: 10,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '70%',
  },
  playButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 3,
    borderColor: 'black',
  },
  logoHandle: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    bottom: 0,
    left: '61%',
    transform: [{ translateX: -100 }],
  },
});
