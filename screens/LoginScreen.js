import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import { Updates } from 'expo';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'
import Fire from '../Fire';

export default class LoginScreen extends Component {

  state = {
    name: ""
  }

  continue = () => {
    this.props.navigation.navigate('DashboardScreen', { name: this.state.name })
  }

  test = () => {
    console.log(Fire.currentUser.isAnonymous);
  }

  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase
      .auth()
      .onAuthStateChanged(function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInWithCredential(credential)
            .then(function (result) {
              console.log('user signed in');
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    locale: result.additionalUserInfo.profile.locale,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now(),
                    uid: result.user.uid
                  })
                  .then(function (snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid).update({
                    last_logged_in: Date.now()
                  })
              }
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
      );
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '777328094729-el2rqn02boubvthi3is6vo3unpga15r8.apps.googleusercontent.com',
        iosClientId: '777328094729-f97v79hiql2h1tvtleaio6v6hu3rbbj6.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        this.props.navigation.navigate('DashboardScreen', { name: this.state.name })
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.circle} />
        <View style={{ marginHorizontal: 32 }}>
          <Text style={styles.header}>Login</Text>
          <View style={styles.header}>
            <Button title="Sign in with Google" onPress={() => this.signInWithGoogleAsync()} />
          </View>
          <Text style={styles.header}>or</Text>
          <TextInput
            style={styles.input}
            placeholder="Anonymously name"
            onChangeText={name => {
              this.setState({ name });
            }}
            value={this.state.name}
          />
          <View style={{ alignItems: "flex-end", marginTop: 64 }}>
            <TouchableOpacity style={styles.continue} onPress={this.test}>
              <Ionicons name="md-arrow-round-forward" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f1f1'
  },
  circle: {
    width: 500,
    height: 500,
    borderRadius: 500 / 2,
    backgroundColor: '#FFF',
    position: "absolute",
    left: -120,
    top: -20
  },
  header: {
    fontWeight: '800',
    fontSize: 30,
    color: '#666',
    marginTop: 32
  },
  input: {
    marginTop: 32,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    paddingHorizontal: 16,
    color: "#514E5A",
    fontWeight: "600"
  },
  continue: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    backgroundColor: "#9075E3",
    alignItems: "center",
    justifyContent: "center"
  }
});