import { firebaseConfig } from './config';
import firebase from 'firebase'

class Fire {
    state = {
        loggedUser: '',
    }
    selectedUserId;
    lessonsChatRoom = {
        uniId: "",
        departmentId: "",
        classId: ""
    }

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
            this.sendMessageToSpesificDb.push(message);
        });

        const details = {
            sender: this.uid,
            receiver: this.selectedUser
        }
        this.sendMessageDetailsToSpesificDb.set(details);
    };

    get sendMessageToSpesificDb() {
        return firebase.database().ref('threads').child(this.setOneToOneChat(this.uid, this.selectedUser.uid)).child('messages');
    }
    get sendMessageDetailsToSpesificDb() {
        return firebase.database().ref('threads').child(this.setOneToOneChat(this.uid, this.selectedUser.uid)).child('details');
    }

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

    get(callback, selectedUser, selectedUserUid) {
        this.selectedUser = selectedUser;
        this.selectedUserId = selectedUserUid;
        this.db
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    }

    getLessonChatDbSnap(callback, val) {
        this.lessonsChatRoom.uniId = val.university.id;
        this.lessonsChatRoom.departmentId = val.department.id;
        this.lessonsChatRoom.classId = val._id;

        this.LessonDb
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    }

    get LessonDb() {
        return firebase.database().ref('lessons-chat-rooms')
            .child(this.lessonsChatRoom.uniId)
            .child(this.lessonsChatRoom.departmentId)
            .child(this.lessonsChatRoom.classId)
    }

    sendRoom = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }
            this.LessonDb.push(message);
        });
    };


    off() {
        this.db.off();
    }

    setOneToOneChat(uid1, uid2) {
        if (uid1 < uid2) {
            return uid1 + uid2;
        }
        else {
            return uid2 + uid1;
        }
    }

    get db() {
        return firebase.database().ref('threads')
            .child(this.setOneToOneChat(this.uid, this.selectedUser.uid))
            .child("messages");
    }

    get defaultPureDb() {
        return firebase.database();
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