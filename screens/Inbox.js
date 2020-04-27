import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, SnapshotViewIOS } from 'react-native';
import {NavigationActions} from 'react-navigation';
import firebase from 'firebase';
import Chat  from  './Chat';
const {width, height}=Dimensions.get('window')




export default class  Inbox extends React.Component {

    state={
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
 
    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems:'center',justifyContent:'center',width:width-40,paddingBottom:10}}>
                    <Text style={{color:'grey',fontWeight:'bold',fontSize:18}}>Inbox</Text>
                </View>
                <FlatList
                data={this.state.userList}
                keyExtractor={(item,index)=>item.first_name}
                renderItem={({item})=>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Chat', {user:item, profile:item})} >
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
} 



const  styles  = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:  'center',
        justifyContent: 'center'
    }
}); 