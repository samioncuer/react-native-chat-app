import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';


class  Bildirimler extends Component { 
    render() {
        return (
            <View style={styles.container}>
                <Text>Bildirimler Screen</Text>
            </View>
        )
    }    
}

export default Bildirimler;

const  styles  = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:  'center',
        justifyContent: 'center'
    }
});