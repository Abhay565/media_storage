import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from '../screens/Welcome';
import MainPage from '../screens/MainPage';
import DrawerNavigation from './DrawerNavigation';

const AuthStack = () => {
    const Stack = createNativeStackNavigator();
  return (
   <Stack.Navigator screenOptions={{ headerShown: false}}>
    <Stack.Screen name='welcome' component={Welcome} />
    <Stack.Screen name='mainpage' component={MainPage} />
    <Stack.Screen name='DrawerNavigation' component={DrawerNavigation} />
   </Stack.Navigator>
  )
}

export default AuthStack;

const styles = StyleSheet.create({})