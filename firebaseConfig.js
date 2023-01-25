import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA5ajl1z2u9U3Rfrb6e8a_opeRcJnnZD5g",
  authDomain: "free-box-d1510.firebaseapp.com",
  projectId: "free-box-d1510",
  storageBucket: "free-box-d1510.appspot.com",
  messagingSenderId: "202064189244",
  appId: "1:202064189244:web:2f6b8ffbcb83528e243039"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);