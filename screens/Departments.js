import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase';
const { width } = Dimensions.get('window');

var departments;
export default class Departments extends Component {

    componentDidMount() {
        firebase.database().ref('universities').child(this.props.route.params._id).child('departments').once('value', (snap) => {
            let departmentList = []
            snap.forEach((department) => {
                const { department_name, _id } = department.val()
                departmentList.push({ department_name, _id })
            })
            departments = (departmentList);
        })
    }
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={departments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => navigation.navigate('Lessons')}>
                            <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', padding: 5, width: width }}>
                                <Image
                                    style={{
                                        margin: 5,
                                        height: 40,
                                        width: 40,
                                        borderRadius: 20
                                    }}
                                    source={{ uri: 'https://placeimg.com/140/140/any' }}
                                    resizeMode="stretch"
                                />
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
