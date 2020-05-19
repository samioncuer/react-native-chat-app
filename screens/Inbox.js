import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'firebase';
const { width } = Dimensions.get('window')
import Fire from '../Fire';

var threads;
export default class Inbox extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    firebase.database().ref().child('threads').once('value', (snap) => {
      let threadList = []
      console.log(snap)
      snap.forEach((user) => {
        const { details, messages } = user.val()
        threadList.push({ details, messages })
      })
      threads = (threadList);
      this.setState({ threadList })
    })
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: width - 40, paddingBottom: 10 }}>
          <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 18, margin: 40 }}>Inbox</Text>
        </View>
        <FlatList
          data={threads}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
            <TouchableOpacity onPress={() => navigation.navigate('Chat', item.details.receiver)}>
              <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', padding: 5, width: width }}>
                <Image style={{ height: 40, width: 40, borderRadius: 20 }}
                  source={{ uri: item.details.receiver.profile_picture }} />
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'grey', fontWeight: 'bold', padding: 15 }}>{item.details.receiver.first_name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          } />
      </View>
    );
  }
}
