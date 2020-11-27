import firebase from 'firebase'
import  'firebase/firestore' 


var firebaseConfig = {
    apiKey: "AIzaSyCw4XnqEEIXbg75D1YfVmmMZ3YgjjJn3_Q",
    authDomain: "tercerparcial-474c0.firebaseapp.com",
    databaseURL: "https://tercerparcial-474c0.firebaseio.com",
    projectId: "tercerparcial-474c0",
    storageBucket: "tercerparcial-474c0.appspot.com",
    messagingSenderId: "64863151222",
    appId: "1:64863151222:web:b335ec43b400eba5bf2b57"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export const bdd=firebase.firestore();