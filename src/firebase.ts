// import { initializeApp } from 'firebase/app';

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//     //...
//   };
  
//   const app = initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF6D9wg9fOanz9yTM5DzDq5iLSD6dMHy4",
  authDomain: "smartphone-4d35f.firebaseapp.com",
  projectId: "smartphone-4d35f",
  storageBucket: "smartphone-4d35f.appspot.com",
  messagingSenderId: "874444688983",
  appId: "1:874444688983:web:ff898d480ed27aded09d12",
  measurementId: "G-43WD6TKSMR"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const db = getFirestore(app);
const analytics = getAnalytics(app);