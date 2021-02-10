import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
require("dotenv").config();

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
});

export const db = firebase.firestore();
export const auth = app.auth();

if (window.location.hostname === "localhost") {
  auth.useEmulator("http://localhost:9099/");
  db.useEmulator("localhost", 8080);
}
export default app;
