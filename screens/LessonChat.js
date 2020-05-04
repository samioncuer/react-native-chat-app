import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from '../Fire';

export default class LessonChat extends React.Component {

    state = {
        messages: [],
    }

    get user() {
        const currentUserModel = {
            displayName: Fire.currentUser.displayName != null ? Fire.currentUser.displayName : 'Anonim',
            eMail: Fire.currentUser.email != null ? Fire.currentUser.email : 'anonim@anonim.com',
            photoUrl: Fire.currentUser.photoURL != null ? Fire.currentUser.photoURL : 'dummyphotourl.com',
        }
        return {
            _id: Fire.uid,
            room_name: this.props.route.params.class_name,
            user: currentUserModel
        }
    }

    componentDidMount() {
        Fire.getLessonChatDbSnap(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            })), this.props.route.params
        );
    }
    componentWillUnmount() {
        Fire.off();
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={Fire.sendRoom}
                user={this.user}
            />
        );
    }
}
