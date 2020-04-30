import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation, useRoute } from '@react-navigation/native';
import Fire from '../Fire';

export default class Chat extends React.Component {
    firstName = "";
    state = {
        messages: []
    }
    getNavigationParams() {
        return this.props.navigation.params || {}
    }

    get user() {
        return {
            _id: Fire.uid,
            name: this.getNavigationParams()
        }
    }

    componentDidMount() {
        Fire.get(message => this.setState(previous => ({
            messages: GiftedChat.append(previous.messages, message)
        }))
        );
    }

    componentWillUnmount() {
        Fire.off();
    }

    render() {
        console.log(this.user)
        const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user} />;
        if (Platform.OS === 'android') {
            return (
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={30} enabled>{chat}</KeyboardAvoidingView>
            );
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>
        )
    }
}
