import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/functions";
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
export const fun = firebase.functions();

if (window.location.hostname === "localhost") {
  auth.useEmulator("http://localhost:9099/");
  db.useEmulator("localhost", 8080);
  fun.useEmulator("localhost", 5001);
}
export default app;
