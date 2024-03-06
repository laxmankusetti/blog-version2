// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-7aeee.firebaseapp.com",
  projectId: "blog-7aeee",
  storageBucket: "blog-7aeee.appspot.com",
  messagingSenderId: "579716529970",
  appId: "1:579716529970:web:6b50d3bc1dd1ebaddfa12b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);