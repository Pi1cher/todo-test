// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "todo-test-b84cd.firebaseapp.com",
    projectId: "todo-test-b84cd",
    storageBucket: "todo-test-b84cd.firebasestorage.app",
    messagingSenderId: "275218238279",
    appId: "1:275218238279:web:019693e6381bd60536da62",
    measurementId: "G-J2GQSZQPJN"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);