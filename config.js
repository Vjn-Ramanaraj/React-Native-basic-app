import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig={
    apiKey: "AIzaSyD88SgKvEM2SGUaNO3WgEQ3_L_ktQR-LhA",
  authDomain: "react-native-dd7c6.firebaseapp.com",
  projectId: "react-native-dd7c6",
  storageBucket: "react-native-dd7c6.appspot.com",
  messagingSenderId: "29301294814",
  appId: "1:29301294814:web:e4a42127578cf646f7a44f",
  measurementId: "G-SPDLHK4D0J"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};