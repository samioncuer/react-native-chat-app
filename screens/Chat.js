import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation, useRoute } from '@react-navigation/native';

export default class Chat extends Component {
    render() {
        const { route, navigation } = this.props;
        return (
            <View style={styles.container}>
                <Text>{route.params?.first_name}</Text>

                <Button title="Geri" onPress={() => navigation.navigate('Inbox')} />
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
