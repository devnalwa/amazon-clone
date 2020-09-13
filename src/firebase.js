import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDRV1c1T9pw8Ec0_VJ9cpNLBZFx5DfjqAA",
    authDomain: "clone-f2299.firebaseapp.com",
    databaseURL: "https://clone-f2299.firebaseio.com",
    projectId: "clone-f2299",
    storageBucket: "clone-f2299.appspot.com",
    messagingSenderId: "667830220789",
    appId: "1:667830220789:web:42462ac89538094394d2bc",
    measurementId: "G-RFV7TL49PG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore(); // Initialzing Database using Firebase
const auth = firebase.auth(); // Initializing Authorization

export { db, auth }; // Will Allow the use of these two features outside this file and throughout program. 