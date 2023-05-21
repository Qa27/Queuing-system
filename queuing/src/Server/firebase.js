// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "queuing-system-f375d.firebaseapp.com",
  projectId: "queuing-system-f375d",
  storageBucket: "queuing-system-f375d.appspot.com",
  messagingSenderId: "915431383574",
  appId: "1:915431383574:web:2c494db8f4cd6ad6040b37",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);
