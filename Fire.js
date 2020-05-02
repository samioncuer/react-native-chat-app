import { firebaseConfig } from './config';
import firebase from 'firebase'
import React from 'react';

class Fire {
    state = {
        loggedUser: '',
    }
    selectedUserId;


    constructor() {
        this.init();
        this.observeAuth();
    };

    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    };

    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    onAuthStateChanged = user => {
        if (!user) {
            try {
                firebase.auth().signInAnonymously();
            } catch ({ message }) {
                alert(message);
            }
        }
    };

    loginWithAnonymously() {
        firebase.auth().signInAnonymously();
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
        const { text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);
        const user = message.val().user

        return {
            _id,
            text,
            createdAt,
            user
        };
    };

    get(callback, selectedUserUid) {
        this.selectedUserId = selectedUserUid;
        this.db
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    }


    off() {
        this.db.off();
    }

    get db() {
        return firebase.database().ref('messages/' + this.uid + "/" + this.selectedUserId);
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