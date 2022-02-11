import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCLwgNAXTwbWNeKWP9GCo3vcb2YZg_XmRs",
    authDomain: "react-journal-app-4a820.firebaseapp.com",
    projectId: "react-journal-app-4a820",
    storageBucket: "react-journal-app-4a820.appspot.com",
    messagingSenderId: "519623638299",
    appId: "1:519623638299:web:3805560bd6b2b9befa27be"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}