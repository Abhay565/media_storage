import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constant/colors';
import { textSize } from '../constant/font';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useLogin } from '../contextAPI/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { setIsLoggedIn } = useLogin();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Add isSubmitting state

  const handleLogin = async () => {
    if (isSubmitting) return; // Prevent multiple presses

    setIsSubmitting(true); // Disable button

    let valid = true;

    if (!username) {
      setUsernameError('Username cannot be empty');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!password) {
      setPasswordError('Password cannot be empty');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) {
      setIsSubmitting(false); // Enable button again
      return;
    }

    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedPassword = await AsyncStorage.getItem('password');

      if (username === storedUsername && password === storedPassword) {
        setIsLoggedIn(true);
        navigation.navigate('DrawerNavigation');
      } else {
        Alert.alert('Error', 'Invalid username or password or first you need to signup');
      }
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false); // Enable button again
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.inputContainer}>
        <FontAwesome name="user-circle" size={24} color={Colors.black} style={styles.icon} />
        <TextInput
          placeholder="UserName & Email"
          style={styles.input}
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setUsernameError('');
          }}
        />
      </View>
      {usernameError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{usernameError}</Text>
        </View>
      ) : null}
      <View style={styles.inputContainer}>
        <MaterialIcons name="password" size={24} color={Colors.black} style={styles.icon} />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError('');
          }}
        />
      </View>
      {passwordError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{passwordError}</Text>
        </View>
      ) : null}
      <TouchableOpacity
        style={[styles.touch, isSubmitting && styles.touchDisabled]}
        onPress={handleLogin}
        disabled={isSubmitting}
      >
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  touch: {
    marginTop: '10%',
    marginHorizontal: '6%',
    paddingVertical: '4%',
    backgroundColor: Colors.button,
    borderRadius: 10,
  },
  touchDisabled: {
    opacity: 0.6, // Change opacity when button is disabled
  },
  text: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: textSize.FONT_SIZE_16,
    fontWeight: '500',
  },
  inputContainer: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '6%',
    marginTop: '5%',
    paddingHorizontal: '4%',
    borderRadius: textSize.FONT_SIZE_16,
  },
  input: {
    color: Colors.black,
    width: '80%',
  },
  icon: {
    width: '12%',
  },
  errorContainer: {
    marginHorizontal: '8%',
  },
  errorText: {
    color: 'red',
    fontSize: textSize.FONT_SIZE_14,
  },
});
