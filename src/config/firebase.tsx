// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCBzpWYTYwl1EXJeGIz2JV7YCpwpzKRZao",
  authDomain: "olx-clone2-2f56f.firebaseapp.com",
  projectId: "olx-clone2-2f56f",
  storageBucket: "olx-clone2-2f56f.appspot.com",
  messagingSenderId: "363623816591",
  appId: "1:363623816591:web:48e5e3e0ee44d713dbbffa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export const db = getFirestore(app)
export const storageRef = ref(storage, 'images');
export const auth = getAuth()