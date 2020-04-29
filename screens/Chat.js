import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation, useRoute } from '@react-navigation/native';

export default class Chat extends Component {
    render() {
        const { route } = this.props;
        const { params } = this.props.navigation.state;
        const user = params ? params.user.first_name : null;

        console.log(user)

        return (

            <View style={styles.container}>
                <Text>{route.name}</Text>
            </View>
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