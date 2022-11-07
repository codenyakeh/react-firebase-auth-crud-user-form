// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnly9ULuwlSS2OnSnr4mmVtCTjRJtId-Q",
  authDomain: "contact-form-f71d9.firebaseapp.com",
  projectId: "contact-form-f71d9",
  storageBucket: "contact-form-f71d9.appspot.com",
  messagingSenderId: "893980126948",
  appId: "1:893980126948:web:7db3dfcf35be76251906f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);