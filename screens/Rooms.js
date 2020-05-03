import React, { Component } from 'react';
import { View, Alert, AppRegistry, Text, TextInput, FlatList, Image, TouchableOpacity, Dimensions, Button } from 'react-native';
import firebase from 'firebase';

const { width } = Dimensions.get('window')

var room;

class Rooms extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        firebase.database().ref().child('rooms').once('value', (snap) => {
            let roomList = []
            snap.forEach((room) => {
                const { created_date, name } = room.val()
                roomList.push({ created_date, name })
            })
            room = (roomList);
            this.setState({ roomList })
        })
    }

    onButtonPress = () => {
        Alert.prompt(
            "Add Room",
            "Room Name",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Add",
                    onPress: roomName => this.saveRoomToFirebase(roomName)
                }
            ],
            "plain-text"
        );
    };

    saveRoomToFirebase(roomName) {
        firebase.database().ref('rooms/' + roomName).set({
            name: roomName,
            created_date: Date.now()
        })
    }


    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button style={{ justifyContent: 'right', left: 200 }} title="+" onPress={() => this.onButtonPress()} />
                <View style={{ alignItems: 'center', justifyContent: 'center', width: width - 40, paddingBottom: 10 }}>
                    <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 18, margin: 40 }}>Rooms</Text>
                </View>
                <FlatList
                    data={room}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => navigation.navigate('Chat', item)}>
                            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', padding: 5, width: width }}>
                                {/* <Image style={{ height: 40, width: 40, borderRadius: 20 }}
                                    source={{ uri: item.room_avatar }} /> */}
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'grey', fontWeight: 'bold', padding: 15 }}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    } />

            </View>
        );
    }
}

export default Rooms;