import { firebaseConfig } from './config';
import firebase from 'firebase'

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }
    init = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        })
    }

    send = messages => {
        messages.forEach(item => {
            // console.log("99999999999999999999999999999:", item.user.route)

            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user.route
            }
            this.db.push(message);
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp);

        return {
            _id,
            createdAt,
            text,
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
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

    get currentUser() {
        return (firebase.auth().currentUser || {})
    }
}

export default new Fire();