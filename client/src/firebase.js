// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4b408.firebaseapp.com",
  projectId: "mern-estate-4b408",
  storageBucket: "mern-estate-4b408.firebasestorage.app",
  messagingSenderId: "151746654501",
  appId: "1:151746654501:web:d725997b4e4c39633daacc"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
