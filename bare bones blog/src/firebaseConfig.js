// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAjqLOmy95ieRHSQzjTUYqJiK7lMC289uo',
  authDomain: 'bone-blog-cmsi2021-fall2023.firebaseapp.com',
  projectId: 'bone-blog-cmsi2021-fall2023',
  storageBucket: 'bone-blog-cmsi2021-fall2023.appspot.com',
  messagingSenderId: '1064880751137',
  appId: '1:1064880751137:web:aa52f0718394f0b4495960'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
