
// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0xB05A0EeD02_oGInMO9gNZiWNDd2k1M",
  authDomain: "patrol-team.firebaseapp.com",
  projectId: "patrol-team",
  storageBucket: "patrol-team.appspot.com",
  messagingSenderId: "768928244596",
  appId: "1:768928244596:web:5bfba1e1c6fd5b0bf70221",
  measurementId: "G-5GRTMJ0X3B"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
