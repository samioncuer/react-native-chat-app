import React, { Component } from 'react';
import { Modal, StyleSheet, TouchableHighlight, View, Alert, Text, TextInput, FlatList, TouchableOpacity, Dimensions, Button } from 'react-native';
import firebase from 'firebase';
import { nanoid } from 'nanoid/non-secure'

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

    }

    saveDatastoFirebase() {
        firebase.database().ref('universities').child(this.state.uni._id).set({
            _id: this.state.uni._id,
            uni_name: this.state.uni._name,
            created_date: this.state.uni._created_date
        }).then(
            firebase.database().ref('universities').child(this.state.uni._id).child('departments').child(this.state.department._id).set({
                _id: this.state.department._id,
                department_name: this.state.department._name,
                created_date: this.state.department._created_date
            }).then(
                firebase.database().ref('universities').child(this.state.uni._id).child('departments').child(this.state.department._id).child('classes').child(this.state.class._id).set({
                    _id: this.state.class._id,
                    class_name: this.state.class._name,
                    created_date: this.state.class._created_date
                })
            )
        );
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
                                    onChangeText={(uniName) => this.setState({ uni: { _name: uniName, _id: nanoid(), _created_date: Date.now() } })}
                                />
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, margin: 5, padding: 5 }}
                                    placeholder="Departman Name"
                                    onChangeText={(departmentName) => this.setState({ department: { _name: departmentName, _id: nanoid(), _created_date: Date.now() } })}
                                />
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, margin: 5 }}
                                    placeholder="Class Name"
                                    onChangeText={(className) => this.setState({ class: { _name: className, _id: nanoid(), _created_date: Date.now() } })}
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