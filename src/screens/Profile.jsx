import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../constant/colors';
import { textSize } from '../constant/font';
import { useLogin } from '../contextAPI/AuthContext'; // Ensure this path is correct
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const { setIsLoggedIn } = useLogin(); // Get the setIsLoggedIn function from the context

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Failed to fetch the username:', error);
      }
    };

    fetchUsername();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              console.log('Logging out...');
              await AsyncStorage.removeItem('username');
              await AsyncStorage.removeItem('password');
              setIsLoggedIn(false);
              console.log('Logged out successfully');
              navigation.navigate('mainpage');
            } catch (error) {
              console.error('Failed to logout:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <FontAwesome
          name="user-circle"
          size={100}
          color={Colors.black}
          style={styles.icon}
        />
        <View style={styles.lowerContainer}>
          <Text style={styles.hello}>Hello,</Text>
          <Text style={styles.usernameText}>{username}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.touch} onPress={handleLogout}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  profileContainer: {
    marginTop: '30%',
    alignSelf: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  hello: {
    color: Colors.grey_text,
    fontSize: textSize.FONT_SIZE_16,
    fontWeight: '500',
  },
  usernameText: {
    fontSize: textSize.FONT_SIZE_20,
    fontWeight: 'bold',
    color: Colors.black,
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
});
