import React, { Component } from 'react';
import { View, Alert, AppRegistry, Text, TextInput, FlatList, Image, TouchableOpacity, Dimensions, Button } from 'react-native';
import firebase from 'firebase';


const { width } = Dimensions.get('window')

var university;

class University extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        firebase.database().ref().child('Universities').once('value', (snap) => {
            let universityList = []
            snap.forEach((room) => {
                const { created_date, name } = university.val()
                universityList.push({ created_date, name })
            })
            university = (universityList);
            this.setState({ universityList })
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
                    onPress: universityName => this.saveUniversityToFirebase(universityName)
                },
                {
                    text: "Add",
                    onPress: departmentName => this.saveDepartmentToFirebase(departmentName)
                },
                {
                    text: "Add",
                    onPress: lessonName => this.saveLessonToFirebase(lessonName)
                },
            ],
            "plain-text"
        );
    };

    saveLessonToDepartment(lessonName) {
        firebase.database().ref('Universities/' + 'University/' + 'Departments/' + lessonName).set({
            name: lessonName,
            departmentName: University.departmentName,
            created_date: Date.now()
        })
    }

    saveDepartmentToUniversity(departmentName) {
        firebase.database().ref('Universities/' + 'University/' + departmentName).set({
            name: departmentName,
            universityName: University.universityName,
            created_date: Date.now()
        })
    }
    saveUniversityToFirebase(universityName) {
        firebase.database().ref('Universities/' + universityName).set({
            name: universityName,
            created_date: Date.now()
        })
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button style={{ justifyContent: 'right', left: 200 }} title="+" onPress={() => this.onButtonPress()} />
                <View style={{ alignItems: 'center', justifyContent: 'center', width: width - 40, paddingBottom: 10 }}>
                    <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 18, margin: 40 }}>üniversiteler</Text>
                </View>
                <FlatList
                    data={university}
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

export default University;