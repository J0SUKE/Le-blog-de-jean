import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAGKtQET6WOQtjfFJ-PqZdKdD814wP8-zY",
  authDomain: "le-blog-de-jean.firebaseapp.com",
  projectId: "le-blog-de-jean",
  storageBucket: "le-blog-de-jean.appspot.com",
  messagingSenderId: "1036676939581",
  appId: "1:1036676939581:web:73e9b8683db1fede5a4f54",
  measurementId: "G-SY8PNVZWQP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();