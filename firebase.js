// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlQGgPxjaaid1uM3LHY_raTf63AqoUs74",
  authDomain: "bingo-58f0d.firebaseapp.com",
  projectId: "bingo-58f0d",
  storageBucket: "bingo-58f0d.appspot.com",
  messagingSenderId: "267109392898",
  appId: "1:267109392898:web:d37cc36fe6a5cfda397d1b",
  measurementId: "G-W4SYV69P08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use AsyncStorage for Firebase Auth persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
