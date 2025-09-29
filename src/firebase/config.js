import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    // Replace with your Firebase config
    apiKey: "AIzaSyA79wSmK0WUA_86ckcUbsiGxigxwRfTAhQ",
    authDomain: "memory-mapping-5566a.firebaseapp.com",
    projectId: "memory-mapping-5566a",
    storageBucket: "memory-mapping-5566a.appspot.com",
    messagingSenderId: "321287084464",
    appId: "1:321287084464:web:7e3f0335a25a3e565d1e75",
    measurementId: "G-H0DQF03WLV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
