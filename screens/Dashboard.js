import React, { Component } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Bildirimler from "./Notifications";
import Home from "./Home";
import Profil from "./Profil";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import Chat from "./Chat";
import Inbox from "./Inbox";
import Fire from '../Fire';

export default class DashboardScreen extends Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="🦄" component={TabsNavBar} />
          <Stack.Screen name="Chat" component={Chat} />
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
          } else if (route.name === "Bildirimler") {
            iconName = "ios-notifications";
          } else if (route.name === "Inbox") {
            iconName = "ios-chatboxes";
          } else if (route.name === "Profil") {
            iconName = "ios-contact";
          }
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
      <Tab.Screen name="Bildirimler" component={Bildirimler} />
      <Tab.Screen name="Inbox" component={Inbox} />
      <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
  );
}