import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAeQWOch64bOppi1UfHaKJJtHtuQ9FCXpw",
  authDomain: "eventmangment-9fe65.firebaseapp.com",
  databaseURL: "https://eventmangment-9fe65-default-rtdb.firebaseio.com/",
  projectId: "eventmangment-9fe65",
  storageBucket: "eventmangment-9fe65.firebasestorage.app",
  messagingSenderId: "746957501000",
  appId: "1:746957501000:web:2cd9b32cc843e8353fde7d",
  measurementId: "G-BZZ4L2VL6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app); // Corrected this line

export { db, auth };
