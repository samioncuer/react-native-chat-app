import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Bildirimler from './Bildirimler';
import Home from './Home';
import Profil from './Profil';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Chat from './Chat';
import Inbox from './Inbox';

class DashboardScreen extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: true,
            gestureDirection: "horizontal",

            // transitionSpec: {
            // open: config,
            // close: closeConfig
            // }
          }}
          headerMode="float"
          animmation="fade" >
          <Stack.Screen options={{
            headerRight: () => (

              <Ionicons name="ios-search" size={38}
                style={{ margin: 5, padding: 5 }}
                onPress={() => alert('This is a button!')}
              />

            ),
            headerLeft: () => (
              <Ionicons name="ios-add" size={48}
                style={{ margin: 5, padding: 5 }}
                onPress={() => alert('This is a button!')}
              />
            ),
          }} name="                 "
            component={MyTabs} />
          <Stack.Screen name="Header" component={MyTabsTop} />
          <Stack.Screen name="Chat" component={ChatNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default DashboardScreen;

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'ios-home'
          }
          else if (route.name === 'Bildirimler') {
            iconName = 'ios-notifications'
          }
          else if (route.name === 'Inbox') {
            iconName = 'ios-chatboxes'
          }
          else if (route.name === 'Profil') {
            iconName = 'ios-contact'
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        }
      })} >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Bildirimler" component={Bildirimler} />
      <Tab.Screen name="Inbox" component={Inbox} />
      <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function MyTabsTop() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Profil}
        options={{ title: 'My home' }}
      />
    </Tab.Navigator>
  );
}

function ChatNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});