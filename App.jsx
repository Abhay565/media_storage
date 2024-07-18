import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorScheme } from 'react-native';
import AuthStack from './src/navigation/AuthStack'; // Adjust path as per your project structure
import MainStack from './src/navigation/MainStack'; // Adjust path as per your project structure
import LoginProvider, { useLogin } from './src/contextAPI/AuthContext'; // Adjust path as per your project structure
import { Colors } from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <LoginProvider>
      <AppContent />
    </LoginProvider>
  );
};

const AppContent = () => {
  const { isLoggedIn } = useLogin();
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {isLoggedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default App;
