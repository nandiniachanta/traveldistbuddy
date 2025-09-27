
// firebase/firebaseconfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 1️⃣ Your Firebase configuration object
// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCL7S1NvQr66DbhaI1peKbd8_ebrTSuDm8",
    authDomain: "traveldisbuddy-authapp.firebaseapp.com",
    projectId: "traveldisbuddy-authapp",
    storageBucket: "traveldisbuddy-authapp.firebasestorage.app",
    messagingSenderId: "66207758371",
    appId: "1:66207758371:web:bda455eb09d2d03faa1996"
};


// 2️⃣ Initialize Firebase
const app = initializeApp(firebaseConfig);

// 3️⃣ Export Firebase services you need
export const auth = getAuth(app);      // For authentication
export const db = getFirestore(app);   // For Firestore (storing extra user info)
