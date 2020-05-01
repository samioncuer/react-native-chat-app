import { firebaseConfig } from './config';
import firebase from 'firebase'
import React from 'react';

class Fire extends React.Component {
    state = {
        loggedUser: '',
        selectedUserId: ""

    }

    constructor(props) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        })

        super(props)
    };

    signInWithAnonymously() {
        firebase.auth().signInAnonymously().then(q => {
            this.setState(q)
        });
    }

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }
            this.db.push(message);
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message
        const createdAt = new Date(timestamp);

        return {
            _id,
            text,
            createdAt,
            user
        };
    };

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
    }

    off() {
        this.db.off();
    }

    get db() {
        // console.log("**********************FIRE.JS_DB_FONKSIYONU**********************:", this.props)
        return firebase.database().ref("messages/" + this.currentUser.uid + "/" + this.state.selectedUser);
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

    get currentUser() {
        return (firebase.auth().currentUser || {})
    }

    logout = async () => {
        try {
            await firebase.auth().signOut();
            // signed out
        } catch (e) {
            // an error
        }
    }
}

export default new Fire();