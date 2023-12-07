import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_o1mAhRNNFSRhRiMBaracbxQPlamOpM8",
    authDomain: "projectappreact-b97f6.firebaseapp.com",
    projectId: "projectappreact-b97f6",
    storageBucket: "projectappreact-b97f6.appspot.com",
    messagingSenderId: "139793316048",
    appId: "1:139793316048:web:bb6d77100018f165e286d5",
    measurementId: "G-1D52534QND"
};

 const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
