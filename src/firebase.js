
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDf-7OWARXRAOxxoB1YIJbkkQbU71O9ta0",
  authDomain: "lms-mjs.firebaseapp.com",
  projectId: "lms-mjs",
  storageBucket: "lms-mjs.appspot.com",
  messagingSenderId: "476587637758",
  appId: "1:476587637758:web:b563b170c69fc030265eaf",
  measurementId: "G-FFRYPG6GGV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
