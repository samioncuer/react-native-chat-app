import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import firebase from 'firebase';
import Fire from '../Fire';



class Profil extends Component {

    render() {
        return (
            <ScrollView>
                <ImageBackground
                    source={require("../assets/images/background.jpg")}
                    style={{ width: undefined, height: 240, padding: 88, paddingTop: 24 }} >
                    <Image source={require("../assets/images/clement.jpg")} style={styles.profile} />
                    <Text style={styles.name}>Clement Mathieu</Text>
                </ImageBackground>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 1
                    }}>
                    <View style={{
                        height: 45, width: 300, backgroundColor: '#FFCCBC', borderRadius: 10,
                        marginTop: 3, paddingTop: 9
                    }}>
                        <Text style={styles.baseText}> Arkadaşlar(232)</Text>
                    </View>
                    <View style={{
                        height: 45, width: 300, backgroundColor: '#FFAB91', borderRadius: 10,
                        marginTop: 3, paddingTop: 9
                    }}>
                        <Text style={styles.baseText} > Yaşadığı yer:
        <Text style={styles.infoText} >Yaşadığı yer </Text>
                        </Text>
                    </View>
                    <View style={{
                        height: 45, width: 300, backgroundColor: '#FF8A65', borderRadius: 10,
                        marginTop: 3, paddingTop: 9
                    }}>
                        <Text style={styles.baseText} >Doğum tarihii:
        <Text style={styles.infoText} >Doğum tarihi </Text>
                        </Text>
                    </View>
                    <View style={{
                        height: 45, width: 300, backgroundColor: '#FF7043', borderRadius: 10,
                        marginTop: 3, paddingTop: 9
                    }}>
                        <Text style={styles.baseText} >Diller:
        <Text style={styles.infoText} >Diller </Text>
                        </Text>
                    </View>
                    <View style={{
                        height: 45, width: 300, backgroundColor: '#FF5722', borderRadius: 10,
                        marginTop: 3, paddingTop: 9
                    }}>
                        <Text style={styles.baseText} >Hobiler:
        <Text style={styles.infoText} >Hobiler </Text>
                        </Text>
                    </View>
                    <View style={{
                        height: 45, width: 300, backgroundColor: '#DD2C00', borderRadius: 10,
                        marginTop: 3, paddingTop: 9
                    }}>
                        <Button title="Çıkış Yap" onPress={() => alert("test")} />

                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default Profil;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profile: {
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 3,
        borderColor: "#FFF"
    },
    name: {
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
    infoText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "800",
        marginVertical: 8,
        textAlign: "center"
    }
});