import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import {NavigationActions} from 'react-navigation';
import firebase from 'firebase';
import { GiftedChat } from 'react-native-gifted-chat';


export default class Chat extends Component{
    state={
        messages:[],
        user:Object,
        profile:Object
    }

    componentWillMount(){
        const {user,profile}=this.state
        this.chatID= user.uid > profile.uid? user.uid+'-'+profile.uid:profile.uid+'-'+user.uid
        this.watchChat()
    }

    watchChat=()=>{
        firebase.database().ref('messages').child(this.chatID).on('value',snap=>{
            let messages=[]
            snap.forEach(messages=>{
                messages.push(messages.val())
            })
            messages.reverse()
            this.setState({messages})
        })
    }

    onSend=(messages)=>{
        const {user,profile}=this.state
        relationMessage={}
        firebase.database().ref('messages').child(this.chatID).push({...message[0],createdAt:new Date().getTime(),
        })
    }
    
    render(){
        const {user,profile}=this.state
        const avatar = user.profile_picture
        return(
            <View style={{flex:1}}>
              <GiftedChat
                messages={this.state.messages}
                user={{_id:user.uid,avatar}}
                onSend={this.onSend()}
                />
                </View>
        )
    }
}



