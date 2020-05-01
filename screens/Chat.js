import React from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../Fire';

export default class Chat extends React.Component {
    state = {
        messages: [],
        selectedUserId: ""
    }

    getNavigationParams() {
        return this.props || {};
    }

    get user() {
        return {
            _id: Fire.uid,
            name: this.getNavigationParams().route.params
        }
    }

    componentDidMount() {
        this.setState({
            selectedUserId: this.user._id
        });

        Fire.get(message => this.setState(previous => ({
            messages: GiftedChat.append(previous.messages, message)
        }))
        );
    }

    componentWillUnmount() {
        Fire.off();
    }

    render() {
        const chat = <GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user} />;
        if (Platform.OS === 'android') {
            return (
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>{chat}</KeyboardAvoidingView>
            );
        }

        return (
            <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>
        )
    }
}
