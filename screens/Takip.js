import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';


class  Takip extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Takip Screen</Text>
            </View>
        )
    }
}

export default Takip;

const  styles  = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:  'center',
        justifyContent: 'center'
    }
});