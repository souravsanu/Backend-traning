// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBzyilhUZ94MTJu6L7WSFkatBxL0x7TnEM",
  authDomain: "fd-clone-a3f14.firebaseapp.com",
  projectId: "fd-clone-a3f14",
  storageBucket: "fd-clone-a3f14.appspot.com",
  messagingSenderId: "80459072055",
  appId: "1:80459072055:web:c6be0cb5cb01291d2d75b2",
  measurementId: "G-P5BQH4KMQ6",
};
firebase.initializeApp(firebaseConfig);
// const db = getFirestore();

const db = firebase.firestore();
const firebaseAuth = getAuth();
const provider = new GoogleAuthProvider();

export { firebaseAuth as auth, provider };
export default db;
