// get firebase modules via Javascript SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// apiKey: Public API key to interact with Firebase services
// authDomain: URL used for user authentication services
// projectId: Project ID for your Firebase application
// storageBucket: URL for file storage within your application
// messagingSenderId: Sender ID for sending messages via Firebase Cloud Messaging
// appId: Application ID for the Firebase app, it is unique to this application

// STEP 1: Declare Firebase Environment Variables  
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC0mHiZ_y5Y085d9mWQYxxs1BPuypP7iLk",
    authDomain: "password-generator-c1f81.firebaseapp.com",
    projectId: "password-generator-c1f81",
    storageBucket: "password-generator-c1f81.appspot.com",
    messagingSenderId: "881801322987",
    appId: "1:881801322987:web:d52daf5dba5c429c3df9ae",
    measurementId: "G-ND7DXG1VBY"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);