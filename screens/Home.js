import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ImageBackground, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase';
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
        const { uni_name, _id, departments, imgUrl } = university.val()
        console.log(university.val())
        universityList.push({ uni_name, _id, departments, imgUrl })
      })
      universities = (universityList);
      this.setState({ universityList })
    })
  }


  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={universities}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => navigation.navigate('Departments', item)}>
              <View style={{ padding: 5, width: width }}>
                <Text style={styles.uniName}> {item.uni_name} </Text>
                <ImageBackground
                  style={styles.brImage}
                  source={{ uri: item.imgUrl }}>
                  <View style={styles.uniCard} >
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          } />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  uniName: {
    fontSize: 14,
    textAlign: "center",
    color: 'black',
    fontWeight: 'bold',
    padding: 13
  },
  uniCard: {
    height: 130,
  },
  brImage: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 50,
    margin: 15
  }
});