// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmGV8tM6pWAnI9C4H2A2M4p6cQiCQ8rKQ",
  authDomain: "login-auth-66f4c.firebaseapp.com",
  projectId: "login-auth-66f4c",
  storageBucket: "login-auth-66f4c.appspot.com",
  messagingSenderId: "841672375137",
  appId: "1:841672375137:web:62c1cee5682af21278e320",
  measurementId: "G-0GNY2PK4QE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db=getFirestore(app)
export default app;
