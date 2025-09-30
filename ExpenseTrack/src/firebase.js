import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArmKpzPAWESXO-13uTJuXx__h6OqgXzNU",
  authDomain: "expensetrack-d6fcc.firebaseapp.com",
  projectId: "expensetrack-d6fcc",
  storageBucket: "expensetrack-d6fcc.firebasestorage.app",
  messagingSenderId: "270781270679",
  appId: "1:270781270679:web:c13cc5b72ea9b7e53db7d2",
  measurementId: "G-YW23RF8EVG"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };