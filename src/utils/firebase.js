import { initializeApp } from "firebase/app";


const apiUrl = import.meta.env.VITE_APP_API_KEY;

const firebaseConfig = {
  apiKey: apiUrl,
  authDomain: "exploreodisha-86ded.firebaseapp.com",
  projectId: "exploreodisha-86ded",
  storageBucket: "exploreodisha-86ded.appspot.com",
  messagingSenderId: "424268126857",
  appId: "1:424268126857:web:4bd46b9ebeb373c1e8c458",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
