// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "abyalew-estate.firebaseapp.com",
  projectId: "abyalew-estate",
  storageBucket: "abyalew-estate.firebasestorage.app",
  messagingSenderId: "453461841427",
  appId: "1:453461841427:web:598215f9a9eb84250791e6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
