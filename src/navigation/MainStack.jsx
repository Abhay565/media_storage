import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DrawerNavigation from './DrawerNavigation';
import MainPage from '../screens/MainPage';

const MainStack = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='DrawerNavigation' component={DrawerNavigation} />
        <Stack.Screen name='mainpage' component={MainPage} />
    </Stack.Navigator>
  )
}

export default MainStack;

const styles = StyleSheet.create({})