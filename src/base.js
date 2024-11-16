// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAjaUV3Y6Xb1fp2RRNLS5058DGtzh19KpA",
  authDomain: "instarat-a3676.firebaseapp.com",
  projectId: "instarat-a3676",
  storageBucket: "instarat-a3676.firebasestorage.app",
  messagingSenderId: "699261930320",
  appId: "1:699261930320:web:c8450c8f2ea2a346827a55",
  measurementId: "G-8G8TB5BB3V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);