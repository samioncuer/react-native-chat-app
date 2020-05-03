import React, { Component } from 'react';
import { Modal, StyleSheet, TouchableHighlight, View, Alert, AppRegistry, Text, TextInput, FlatList, Image, TouchableOpacity, Dimensions, Button } from 'react-native';
import firebase from 'firebase';

const { width } = Dimensions.get('window')

var room;

class Rooms extends React.Component {
    constructor() {
        super();
    }
    state = {
        modalVisible: false,
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
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

    saveRoomToFirebase(roomName) {
        firebase.database().ref('rooms/' + roomName).set({
            name: roomName,
            created_date: Date.now()
        })
    }

    getValue() {
        console.log("uni:", this.state.uniName)
        console.log("departman:", this.state.departmanName)
        console.log("class:", this.state.className)
    }

    saveDatastoFirebase() {
        firebase.database().ref('universities/' + this.state.uniName + "/" + this.state.departmanName + "/" + this.state.className).set({
            id: 123,
            name: this.state.className,
            created_date: Date.now()
        })
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.closeButton}>
                                    <Button title="x" onPress={() => this.setModalVisible(!this.state.modalVisible)} />
                                </View>
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, margin: 5 }}
                                    placeholder="University Name"
                                    onChangeText={(uniName) => this.setState({ uniName: uniName })}
                                    onContentSizeChange='false'
                                />
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, margin: 5, padding: 5 }}
                                    placeholder="Departman Name"
                                    onChangeText={(departmanName) => this.setState({ departmanName: departmanName })}

                                />
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, margin: 5 }}
                                    placeholder="Class Name"
                                    onChangeText={(className) => this.setState({ className: className })}
                                />
                                <TouchableHighlight
                                    style={{ ...styles.openButton, marginTop: 25 }}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible); this.saveDatastoFirebase()
                                    }}>
                                    <Text style={{ ...styles.textStyle }}>Add</Text>

                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>

                    <TouchableHighlight
                        style={styles.openButton}
                        onPress={() => {
                            this.setModalVisible(true);
                        }}
                    >
                        <Text style={styles.textStyle}>Add University</Text>
                    </TouchableHighlight>
                </View>
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
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 55,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#ffc29e",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    closeButton: {
        left: width / 6,
        top: -20,
        position: 'relative',
    }
});

export default Rooms;