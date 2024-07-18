import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Gallery from '../screens/Gallery';
import Profile from '../screens/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Colors from '../constant/colors';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName, focused, color, size) => {
  if (routeName === 'Home') {
    const iconName = focused ? 'home' : 'home-outline';
    return <Ionicons name={iconName} size={size} color={color} />;
  } 
  if (routeName === 'Gallery') {
    const iconName = focused ? 'image' : 'image-outline';
    return <Ionicons name={iconName} size={size} color={color} />;
  } 
  if (routeName === 'Profile') {
    const iconName = focused ? 'user' : 'user-o';
    return <FontAwesome name={iconName} size={size} color={color} />;
  } 
  return null;
};

const DrawerNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return getTabBarIcon(route.name, focused, color, size);
        },
        headerShown:  false,
        tabBarActiveTintColor: Colors.button,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { display: 'flex' },
      })}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Gallery' component={Gallery} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({});
