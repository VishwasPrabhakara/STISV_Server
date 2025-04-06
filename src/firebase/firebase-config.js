import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDyoGjS8fsA7jKv7LGpEW16FhF_C8VPuoo",
    authDomain: "stisv-2025.firebaseapp.com",
    databaseURL: "https://stisv-2025-default-rtdb.firebaseio.com/", 
    projectId: "stisv-2025",
    storageBucket: "stisv-2025.appspot.com",
    messagingSenderId: "497097240774",
    appId: "1:497097240774:web:06cbb6a649e201aaa27d9f"
};

// Initialize Firebase with error handling
let database = null;

try {
    const app = initializeApp(firebaseConfig);
    database = getDatabase(app);
    // console.log('Firebase initialized successfully');
} catch (error) {
    // console.error('Error initializing Firebase:', error);
}

export { database };