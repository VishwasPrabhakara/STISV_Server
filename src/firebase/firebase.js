// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB7218OrJ36gZmBvwloZepfkQk3FedhihU",
    authDomain: "stis-v.firebaseapp.com",
    databaseURL: "https://stis-v-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "stis-v",
    storageBucket: "stis-v.firebasestorage.app",
    messagingSenderId: "919266749589",
    appId: "1:919266749589:web:4e5a581424ffcc3ddaff9c",
    measurementId: "G-X2SH2GBK8P"
};

// ✅ Prevent multiple initializations
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Prevent analytics error in SSR (server-side rendering)
let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, setDoc, doc };
