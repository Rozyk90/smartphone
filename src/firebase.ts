
import { initializeApp } from "firebase/app";

import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCF6D9wg9fOanz9yTM5DzDq5iLSD6dMHy4",
  authDomain: "smartphone-4d35f.firebaseapp.com",
  projectId: "smartphone-4d35f",
  storageBucket: "smartphone-4d35f.appspot.com",
  messagingSenderId: "874444688983",
  appId: "1:874444688983:web:ff898d480ed27aded09d12",
  measurementId: "G-43WD6TKSMR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
