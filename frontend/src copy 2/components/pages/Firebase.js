import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDOs3fgIo4LtkMtltdL1GYGslfnsWImH0g",
  authDomain: "safal-hrm.firebaseapp.com",
  projectId: "safal-hrm",
  storageBucket: "safal-hrm.appspot.com",
  messagingSenderId: "813792909318",
  appId: "1:813792909318:web:20a949ab9b01af02528b87",
  measurementId: "G-ZSHD83WGG1"
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
export default storage;

