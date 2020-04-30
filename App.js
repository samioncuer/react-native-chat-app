import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import 'react-native-gesture-handler';
import * as firebase from 'firebase';
import Chat from './screens/Chat';
import { createStackNavigator } from '@react-navigation/stack';



const AppNavigator = createSwitchNavigator(
  {
    Login: LoginScreen,
    Chat: Chat,
    DashboardScreen: DashboardScreen
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator)