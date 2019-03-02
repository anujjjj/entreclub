import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";
import "firebase/messaging";
import firestore from 'firebase/firestore'

var config = {
  apiKey: "AIzaSyB748hI_RRweTqiTves8JAQU-p7K60fwOY",
  authDomain: "entreclub-cb5d1.firebaseapp.com",
  databaseURL: "https://entreclub-cb5d1.firebaseio.com",
  projectId: "entreclub-cb5d1",
  storageBucket: "entreclub-cb5d1.appspot.com",
  messagingSenderId: "161879976337"
}
const fire = firebase.initializeApp(config);

export const fireAuth = firebase.auth();

export default firebase;


