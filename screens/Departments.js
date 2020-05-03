import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import firebase from 'firebase';
import Fire from '../Fire';
const { width } = Dimensions.get('window');

var departments;
export default class Departments extends Component {
    state = {

    }

    get university() {
        return {
            university: this.props.route.params
        }
    }

    constructor() {
        super();
    }
    componentDidMount() {
        console.log(this.props.route.params);
        firebase.database().ref('universities').child('departments').once('value', (snap) => {
            let departmentList = []
            snap.forEach((department) => {
                const { department_name, _id } = department.val()
                departmentList.push({ department_name, _id, parent_id })
            })
            departments = (departmentList);
            this.setState({ departmentList })
        })
    }
    render() {
        this.setState({
            department: this.props
        })

        const styles = StyleSheet.create({
            container: {
                flex: 1,
                marginTop: Constants.statusBarHeight,
            },
            item: {
                backgroundColor: '#f9c2ff',
                padding: 20,
                marginVertical: 8,
                marginHorizontal: 16,
            },
            title: {
                fontSize: 32,
            },
        });
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>

                <FlatList
                    data={departments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => navigation.navigate('Lessons')}>
                            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', padding: 5, width: width }}>
                                <Image style={{ height: 40, width: 40, borderRadius: 20 }}
                                    source={{ uri: `https://www.facebook.com/kbu2017girisliler/photos/a.447764452263039/447764668929684/?type=1&theater` }} />
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ color: 'grey', fontWeight: 'bold', padding: 15 }}> {item.department_name} </Text>
                                </View>
                            </View>
                            <View style={{ width: width, height: 1, backgroundColor: 'darkgrey' }} />
                        </TouchableOpacity>
                    } />
            </SafeAreaView>
        );
    }
}
