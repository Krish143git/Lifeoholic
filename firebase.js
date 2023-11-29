import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDoOL6IJ1EWPIsi8WVV5xS-GzToMQ0sc3Q",
    authDomain: "lifeaholic-c195f.firebaseapp.com",
    projectId: "lifeaholic-c195f",
    storageBucket: "lifeaholic-c195f.appspot.com",
    messagingSenderId: "884180554987",
    appId: "1:884180554987:web:e0bbc937bf94d55f785aae",
    measurementId: "G-JMZQW79E9C"
};

firebase.initializeApp(firebaseConfig);
export default firebase;