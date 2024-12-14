// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrhIFBaYuCgJyg2HXjNRvGlkrauLcMVDQ",
  authDomain: "fortunebank-dd630.firebaseapp.com",
  projectId: "fortunebank-dd630",
  storageBucket: "fortunebank-dd630.firebasestorage.app",
  messagingSenderId: "771939667165",
  appId: "1:771939667165:web:679f0452403777d2125f34",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Export services
export { auth, db, storage };
