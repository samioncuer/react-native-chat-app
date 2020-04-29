import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation, useRoute } from '@react-navigation/native';

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = { messages: [] };
        this.onSend = this.onSend.bind(this);
    }
    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello 🦄',
                    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
            ],
        });
    }

    onSend(messages = []) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }

    render() {
        const { route, navigation } = this.props;
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={{
                    _id: 1,
                }}
            />
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
