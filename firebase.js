// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo0RPdkcWwMWhoJnux6fhGS2BBjNHQvJk",
  authDomain: "pantry-tracker-951bf.firebaseapp.com",
  projectId: "pantry-tracker-951bf",
  storageBucket: "pantry-tracker-951bf.appspot.com",
  messagingSenderId: "475045359375",
  appId: "1:475045359375:web:ab39852870111f7e0b587a",
  measurementId: "G-GKRWMHT6HP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const firestore = getFirestore(app);


const auth = getAuth(app);


export { firestore, auth };