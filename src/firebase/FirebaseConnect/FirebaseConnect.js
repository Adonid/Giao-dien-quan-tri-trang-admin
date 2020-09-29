import * as firebase from 'firebase/app';

var firebaseConfig = {
    apiKey: "AIzaSyAK58wcil5ObBO7FwkPCbIG8hIYRct10Lo",
    authDomain: "react-blog-admin.firebaseapp.com",
    databaseURL: "https://react-blog-admin.firebaseio.com",
    projectId: "react-blog-admin",
    storageBucket: "react-blog-admin.appspot.com",
    messagingSenderId: "1092013769006",
    appId: "1:1092013769006:web:eaac28db8f277393b1babf",
    measurementId: "G-SVSNJ1RE3N"
  };
  // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
const FirebaseConnect = firebase.initializeApp(firebaseConfig);

export default FirebaseConnect;