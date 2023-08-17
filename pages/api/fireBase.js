import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import 'firebase/compat/analytics'
import { getDatabase } from 'firebase/database';
import {getAuth,GoogleAuthProvider } from "firebase/auth"
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyDv39qqna8hNYPB2XgJzTKe-fY5WoVPLuM",
  authDomain: "math-35265.firebaseapp.com",
  projectId: "math-35265",
  storageBucket: "math-35265.appspot.com",
  messagingSenderId: "1016581140508",
  appId: "1:1016581140508:web:9037efb9ef647e7e71afd9",
  measurementId: "G-BD0XRS6CHH"
};

firebase.initializeApp(firebaseConfig)

export const database = firebase.database();
export const app = firebase.initializeApp(firebaseConfig)
export const data = getDatabase(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider()
export default firebase
