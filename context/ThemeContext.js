import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode ? {
      primary: '#0D47A1',
      secondary: '#B71C1C',
      background: ['#434343', '#161616'],
      text: '#FFFFFF',
      textSecondary: '#FFD700',
      button: '#FFD700',
      buttonText: '#000000',
    } : {
      primary: '#FFFFFF',
      secondary: '#F5F5F5',
      background: ['orange', '#B71C1C'],
      text: '#000000',
      textSecondary: '#0D47A1',
      button: '#353f9d',
      buttonText: '#FFFFFF',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 