// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYAmF2k482UkRk_OQ452Dgv2Ac5Wfe9A8",
    authDomain: "todo-test-b84cd.firebaseapp.com",
    projectId: "todo-test-b84cd",
    storageBucket: "todo-test-b84cd.firebasestorage.app",
    messagingSenderId: "275218238279",
    appId: "1:275218238279:web:019693e6381bd60536da62",
    measurementId: "G-J2GQSZQPJN"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);