// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqmwvfZDMuyUuYD35fUWlAuQ_tmSSWrY8",
  authDomain: "smart-doc-2ada4.firebaseapp.com",
  projectId: "smart-doc-2ada4",
  storageBucket: "smart-doc-2ada4.firebasestorage.app",
  messagingSenderId: "Y999000993769",
  appId: "1:999000993769:web:569cd76024633d3f0f2578"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };