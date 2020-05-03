import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import firebase from 'firebase';
import Fire from '../Fire';
import Departments from './Departments';
const { width } = Dimensions.get('window');

var universities;
export default class Home extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    firebase.database().ref().child('universities').once('value', (snap) => {
      let universityList = []
      snap.forEach((university) => {
        const { uni_name, _id } = university.val()
        universityList.push({ uni_name, _id })
      })
      universities = (universityList);
      this.setState({ universityList })
    })
  }


  render() {

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
          data={universities}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => navigation.navigate('Departments', item)}>
              <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', padding: 5, width: width }}>
                <Image
                  style={{
                    margin: 5,
                    height: 40,
                    width: 40,
                    borderRadius: 20
                  }}
                  source={{ uri: 'https://placeimg.com/140/140/any' }}
                  resizeMode="stretch" />
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'grey', fontWeight: 'bold', padding: 15 }}> {item.uni_name} </Text>
                </View>
              </View>
              <View style={{ width: width, height: 1, backgroundColor: 'darkgrey' }} />
            </TouchableOpacity>
          } />
      </SafeAreaView>
    );
  }
}
