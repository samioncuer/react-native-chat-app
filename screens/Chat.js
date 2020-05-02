import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../Fire';

export default class Chat extends React.Component {
    state = {
        messages: [],
    }

    get user() {
        return {
            _id: Fire.uid,
            name: this.props.route.params
        }
    }

    componentDidMount() {
        Fire.get(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            })), this.props.route.params.uid
        );
    }
    componentWillUnmount() {
        Fire.off();
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={Fire.send}
                user={this.user}
            />
        );
    }
}
