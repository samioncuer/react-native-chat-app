import React, { Component } from 'react';
import { Modal, StyleSheet, TouchableHighlight, View, Alert, Text, TextInput, Dimensions, Button } from 'react-native';
import firebase from 'firebase';
import { nanoid } from 'nanoid/non-secure'

const { width } = Dimensions.get('window')

export default class CreateLesson extends React.Component {
    state = {
        modalVisible: true,
    };

    setModalVisible = (visible, navigation) => {
        this.setState({ modalVisible: visible });
        navigation.goBack();
    }

    saveDatastoFirebase(val) {
        console.log("VALLLLLLLLLLLLLLLLLL:", val.route)
        firebase.database().ref('universities').child(val.route.params.university.id).child('departments').child(val.route.params._id).child('classes').child(this.state.class._id).set({
            _id: this.state.class._id,
            class_name: this.state.class._name,
            created_date: this.state.class._created_date,
            university: {
                id: val.route.params.university.id,
                name: val.route.params.university.name
            },
            department: {
                id: val.route.params._id,
                name: val.route.params.department_name,
            }
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
                                    <Button title="x" onPress={() => this.setModalVisible(!this.state.modalVisible, navigation)} />
                                </View>
                                <Text style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, margin: 5 }} >
                                    {this.props.route.params.university.name}
                                </Text>
                                <Text style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, margin: 5 }} >
                                    {this.props.route.params.department_name}
                                </Text>
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, margin: 5 }}
                                    placeholder="Class Name"
                                    onChangeText={(className) => this.setState({
                                        class: { _name: className, _id: nanoid(), _created_date: Date.now() }
                                    })}
                                />
                                <TouchableHighlight
                                    style={{ ...styles.openButton, marginTop: 25 }}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible, navigation); this.saveDatastoFirebase(this.props)
                                    }}>
                                    <Text style={{ ...styles.textStyle }}>Ekle</Text>

                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                </View>
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

