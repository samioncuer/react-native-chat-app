import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import {NavigationActions} from 'react-navigation';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';


    class  Chat extends Component { 
        render() {
            return (
                <View style={styles.container}>
                    <Text>Chat addddaaa aa  aa a Screen</Text>
                </View>
            )
        }    
    }
    
    export default Chat;
    
    const  styles  = StyleSheet.create({
        container: {
            flex: 1,
            alignItems:  'center',
            justifyContent: 'center'
        }
    });


