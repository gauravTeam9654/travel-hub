// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1BRiR-_-io_f0NbbjTJxJMGubV3HRf0Y",
  authDomain: "travelhub-28eaa.firebaseapp.com",
  projectId: "travelhub-28eaa",
  storageBucket: "travelhub-28eaa.appspot.com",
  messagingSenderId: "1003806320239",
  appId: "1:1003806320239:web:c20376eb9c5e56305e0f9a",
  measurementId: "G-L41VGM5NXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { collection, query, where, getDocs };
