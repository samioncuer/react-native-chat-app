import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Dimensions, Button } from 'react-native';
const { width } = Dimensions.get('window')
import { NavigationContainer } from "@react-navigation/native";
import Bildirimler from './Notifications';
import Home from './Home';
import Profil from './Profil';
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Chat from './Chat';
import Inbox from './Inbox';
import Rooms from './Rooms';
import Lessons from './Lessons';
import Departments from './Departments';
import Login from './Login';
import LessonChat from "./LessonChat";

export default class DashboardScreen extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={TabsNavBar} options={{
            title: " 🦄",
            headerRight: () => (
              <View style={{ marginRight: 18 }}>
                <Button title="+" onPress={() => alert("test")} />
              </View>
            )
          }} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="LessonChat" component={LessonChat} />
          <Stack.Screen name="Departments" component={Departments} />
          <Stack.Screen name="Lessons" component={Lessons} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabsNavBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "ios-home";
          } else if (route.name === "Notifications") {
            iconName = "ios-notifications";
          } else if (route.name === "Inbox") {
            iconName = "ios-chatbubbles";
          } else if (route.name === "Profile") {
            iconName = "ios-contact";
          } else if (route.name === "Rooms") {
            iconName = "md-apps";
          }
          // https://expo.github.io/vector-icons/
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notifications" component={Bildirimler} />
      <Tab.Screen name="Inbox" component={Inbox} />
      <Tab.Screen name="Rooms" component={Rooms} />
      <Tab.Screen name="Profile" component={Profil} />
    </Tab.Navigator>
  );
}