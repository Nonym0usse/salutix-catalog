const firebase = require("firebase");

firebase.initializeApp({
    apiKey: "AIzaSyCLI_jqOiAbpL05lIWPAWJPlYk9eTAj6AU",
    authDomain: "saluti-a8723.firebaseapp.com",
    projectId: "saluti-a8723",
    storageBucket: "saluti-a8723.appspot.com",
    messagingSenderId: "207612923556",
    appId: "1:207612923556:web:721c0a1680749c57a12031",
    measurementId: "G-PW34B8B3T1"
});

var db = firebase.firestore();
module.exports = db;
