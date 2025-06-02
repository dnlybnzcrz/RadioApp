# Radyo Pilipinas

A React Native mobile application for streaming radio stations in the Philippines. This app provides a user-friendly interface for accessing various radio stations, with features like location-based station discovery and customizable playback controls.

## Features

- 📍 Location-based radio station discovery
- 📻 Stream live radio stations
- 📱 Modern and intuitive user interface
- 🎵 Audio playback controls
- 📋 Station listings and favorites
- 🌈 Beautiful gradient UI elements
- 📱 Cross-platform (iOS and Android) support

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Android Studio](https://developer.android.com/studio) (for Android development)
- [Xcode](https://developer.apple.com/xcode/) (for iOS development, macOS only)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd radyopilipinas
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Running the App

- For Android:
```bash
npm run android
```

- For iOS:
```bash
npm run ios
```

## Tech Stack

- **React Native** (v0.76.9) - Core framework
- **Expo** (v53.0.9) - Development platform
- **React Navigation** (v7) - Navigation system
- **Expo AV** - Audio playback
- **Expo Location** - Location services
- **React Native Vector Icons** - UI icons
- **React Native Linear Gradient** - UI styling
- **AsyncStorage** - Local data persistence

## Project Structure

```
radyopilipinas/
├── assets/           # Images, fonts, and other static assets
├── navigation/       # Navigation configuration
├── screens/         # Application screens
├── ios/             # iOS-specific files
├── android/         # Android-specific files
├── cities.json      # City data
├── groupedCities.json # Organized city data
└── App.js           # Application entry point
```

## Features in Detail

### Location Screen
- Initial screen for selecting user location
- Helps in providing localized radio station recommendations

### Bottom Tab Navigation
- Easy navigation between different sections of the app
- Intuitive user interface for accessing various features

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Acknowledgments

- Radio station data providers
- Contributors and maintainers
- The React Native and Expo communities 