// Import the necessary functions from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "neel-estate.firebaseapp.com",
  projectId: "neel-estate",
  storageBucket: "neel-estate.appspot.com",
  messagingSenderId: "894203387438",
  appId: "1:894203387438:web:72383a7e659a3cd0d6c9bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

// Export the required Firebase Storage functions
export { storage, ref, uploadBytes, getDownloadURL };
