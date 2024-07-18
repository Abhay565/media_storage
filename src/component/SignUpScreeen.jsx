import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Colors from '../constant/colors';
import { textSize } from '../constant/font';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handleSignUp = async () => {
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
   

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match");
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (!valid) {
      return;
    }

    try {
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
      Alert.alert('Success', 'Signed Up successfully, Go to Login Again', [
        { text: 'OK',  },
      ]);
    } catch (error) {
      console.error('Failed to save user data', error);
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
      <View style={styles.inputContainer}>
        <MaterialIcons name="password" size={24} color={Colors.black} style={styles.icon} />
        <TextInput
          placeholder="Confirm password"
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setConfirmPasswordError('');
          }}
        />
      </View>
      {confirmPasswordError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        </View>
      ) : null}
      <TouchableOpacity style={styles.touch} onPress={handleSignUp}>
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

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
    fontSize: textSize.FONT_SIZE_13,
  },
});
