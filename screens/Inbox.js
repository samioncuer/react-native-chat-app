import React, { Component } from 'react';
import { View, Button, Text, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'firebase';
const { width } = Dimensions.get('window')

var users;
export default class Inbox extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    firebase.database().ref().child('users').once('value', (snap) => {
      let userList = []
      snap.forEach((user) => {
        const { first_name, profile_picture, uid } = user.val()
        userList.push({ first_name, profile_picture, uid })
      })
      users = (userList);
      this.setState({ userList })
    })
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: width - 40, paddingBottom: 10 }}>
          <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 18 }}>Inbox</Text>
        </View>
        <FlatList
          data={users}
          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => navigation.navigate('Chat', item)}>
              <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', padding: 5, width: width }}>
                <Image style={{ height: 40, width: 40, borderRadius: 20 }}
                  source={{ uri: item.profile_picture }} />
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: 'grey', fontWeight: 'bold', padding: 15 }}>{item.first_name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          } />
      </View>
    );
  }
}
