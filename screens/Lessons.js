import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import firebase from 'firebase';
import Fire from '../Fire';
import Departments from './Departments';
const { width } = Dimensions.get('window');


export default class Lessons extends Component {
  

    render() {
      const DATA = [
          {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
          },
          {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
          },
          {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
          },
        ];
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
              data={DATA}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) =>
                <TouchableOpacity>
                  <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', padding: 5, width: width }}>
                    <Image style={{ height: 40, width: 40, borderRadius: 20 }}
                      source={{ uri: `https://www.facebook.com/kbu2017girisliler/photos/a.447764452263039/447764668929684/?type=1&theater` }} />
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: 'grey', fontWeight: 'bold', padding: 15 }}> Dil Anlatımı </Text>
                    </View>
                  </View>
                  <View style={{width:width, height:1,backgroundColor:'darkgrey'}} />
                </TouchableOpacity>
              } />
        </SafeAreaView>
      );
    }
  }
  