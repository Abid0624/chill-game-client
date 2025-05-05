// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB19ProzP7nRtQyKnaxIO8rbkgIO_o_DuY",
  authDomain: "chill-game-687dd.firebaseapp.com",
  projectId: "chill-game-687dd",
  storageBucket: "chill-game-687dd.firebasestorage.app",
  messagingSenderId: "377598491650",
  appId: "1:377598491650:web:c25999d15a7ad014597b1b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
