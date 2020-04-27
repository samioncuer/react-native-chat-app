import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';


class  Home extends Component { 
    render() {
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
            </View>
        )
    }    
}

export default Home;

const  styles  = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:  'center',
        justifyContent: 'center'
    }
});