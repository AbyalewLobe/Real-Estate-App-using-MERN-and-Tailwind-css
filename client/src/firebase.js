
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "abyalew-estate.firebaseapp.com",
  projectId: "abyalew-estate",
  storageBucket: "abyalew-estate.firebasestorage.app",
  messagingSenderId: "453461841427",
  appId: "1:453461841427:web:598215f9a9eb84250791e6",
};


export const app = initializeApp(firebaseConfig);
