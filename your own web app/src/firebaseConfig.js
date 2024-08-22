// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAT-0hjvN9B_iS_p6pC69GeHi7U6SoI3Qo",
    authDomain: "my-own-web-app.firebaseapp.com",
    projectId: "my-own-web-app",
    storageBucket: "my-own-web-app.appspot.com",
    messagingSenderId: "297050773633",
    appId: "1:297050773633:web:e561be3be7b86345d71580",
    measurementId: "G-137M9JTEH8"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)