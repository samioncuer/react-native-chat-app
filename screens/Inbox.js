import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, SnapshotViewIOS, Button } from 'react-native';
import {NavigationActions} from 'react-navigation';
import firebase from 'firebase';
import Chat  from  './Chat';
import { createStackNavigator } from '@react-navigation/stack';
const {width, height}=Dimensions.get('window')


class  Inbox extends Component {  

    state={             // hata burda 
        userList:[]
    }
    
    componentWillMount(){
    
        firebase.database().ref().child('users').once('value',(snap)=>{
            let userList=[]
            snap.forEach((user)=>{
                const {first_name,profile_picture,uid}=user.val()
                userList.push({first_name,profile_picture,uid})
        })
        this.setState({userList})
    })
    }


    render(){
        return (<GoToChat/> ); }
    }
    
export default Inbox;

function GoToChat({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <View style={{alignItems:'center',justifyContent:'center',width:width-40,paddingBottom:10}}>
                    <Text style={{color:'grey',fontWeight:'bold',fontSize:18}}>Inbox</Text>
         </View>
         <FlatList
          data={state.userList}
          keyExtractor={(item, index)=>item.first_name}
          renderItem={({ item }) => 
             <TouchableOpacity  onPress={() => navigation.navigate('Chat', )} >
                 <View style={{flex:1,backgroundColor:'transparent', flexDirection: 'row', padding:5, width:width}}>
                         <Image style={{height:40, width:40,borderRadius:20}}
                                source={{ uri: item.profile_picture  }} />
                         <View style={{alignItems:'center',justifyContent:'center'}}>
                               <Text style={{color:'grey', fontWeight:'bold'}}>{item.first_name}</Text>
                         </View>
                 </View>
               <View style={{width:width, height:1,backgroundColor:'darkgrey'}} />
             </TouchableOpacity>
          } />
       </View>     
    );
  }

  const Stack = createStackNavigator();

  function ChatScreen() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    );
  }
