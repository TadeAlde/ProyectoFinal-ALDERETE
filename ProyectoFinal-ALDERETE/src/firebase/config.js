import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-KzG1LF-tPJtB4TWTAfy_w5dbMRWir6M",
  authDomain: "proyectofinal-alderete.firebaseapp.com",
  projectId: "proyectofinal-alderete",
  storageBucket: "proyectofinal-alderete.firebasestorage.app",
  messagingSenderId: "783128381978",
  appId: "1:783128381978:web:4f7fd885b05b5b4d399fa3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);