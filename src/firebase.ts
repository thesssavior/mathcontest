// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG4uSCu2PdrJaFAxRQnk9fo5jCZJ62Kvg",
  authDomain: "mathcontest-815c0.firebaseapp.com",
  projectId: "mathcontest-815c0",
  storageBucket: "mathcontest-815c0.appspot.com",
  messagingSenderId: "345987288256",
  appId: "1:345987288256:web:5f09a9ed2bbdb67416f125",
  measurementId: "G-JDS8GKFWQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app)