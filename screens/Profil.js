import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import firebase from 'firebase';
import Fire from '../Fire';

export default class Profil extends Component {
   
    render() {
        console.log(Fire.currentUser);
        const dfUri = 'https://i.picsum.photos/id/992/200/300.jpg';
        const anonim = "anonim";
        const {navigation} = this.props;
        return (
            <ImageBackground
                style={styles.brImage}
                source={{ uri: 'https://i.picsum.photos/id/992/200/300.jpg' }} >

                <Image style={styles.ppImage}
                    source={{ uri: Fire.currentUser.photoURL != null ? Fire.currentUser.photoURL : dfUri }} />
                <Text style={styles.nameText}> { Fire.currentUser.displayName != null ? Fire.currentUser.displayName : anonim }   </Text>
                <TouchableOpacity style={styles.continue} onPress={() => logOut(navigation) } >
                    <Ionicons name="md-log-out" size={48} color="#fff" />
                </TouchableOpacity>

            </ImageBackground>
        );
    }
}

function logOut( navigation ){
    
    Fire.logout();
    navigation.navigate('LoginScreen');
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nameText: {
        color: "#FFF",
        fontSize: 20,
        fontWeight: "800",
        marginVertical: 8,
        textAlign: "center",
        color: "#FFFFFF"
    },
    baseText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: "center",
        color: "#3E2723"
    },
    brImage: {
        flex: 1,
        alignItems: 'center',
    },
    ppImage: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 1,
        marginTop: 80,
        borderColor: "#FFF"
    },
    btnLogout: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        marginBottom: 20,
        borderColor: "#FFF"
    },
    continue: {
        marginTop: 120,

    },
});