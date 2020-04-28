import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, SnapshotViewIOS, Button } from 'react-native';
import {NavigationActions} from 'react-navigation';
import firebase from 'firebase';
import Chat  from  './Chat';
import { createStackNavigator } from '@react-navigation/stack';


class  Inbox extends Component {
    
    render(){
        return (<GoToChat/> ); }
    }
  
const Stack = createStackNavigator();

function ChatScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}
export default Inbox;

function GoToChat({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Chat Screen</Text>
        <Button
          title="Go to chat screen"
          onPress={() => navigation.navigate('Chat')}
        />
      </View>
    );
  }









  
 /* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
  <Button title="Go back" onPress={() => navigation.goBack()} />
  <Button
    title="Go back to first screen in stack"
    onPress={() => navigation.popToTop()}
  />
  */