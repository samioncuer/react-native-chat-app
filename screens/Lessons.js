import React, { Component } from 'react';
import { View, Text,
      StyleSheet, Image,
      SafeAreaView, FlatList,
      TouchableOpacity, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import firebase from 'firebase';
const { width } = Dimensions.get('window');
var classes;
export default class Lessons extends Component {
    componentDidMount() {
        firebase.database()
        .ref('universities')
        .child(this.props.route.params.uni_id)
        .child('departments')
        .child(this.props.route.params._id)
        .child('classes')
        .once('value', (snap) => {
            let classList = []
            snap.forEach((item) => {
                const { class_name, _id } = item.val()
                classList.push({ class_name, _id })
            })
            classes = (classList);
        })
    }
    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={classes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity >
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
                                    <Text style={{ color: 'grey', fontWeight: 'bold', padding: 15 }}> {item.class_name} </Text>
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
