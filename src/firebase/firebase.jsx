import { initializeApp } from "firebase/app";
import {getFirestore , collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAZtnUSPMzdQZp2yX8mMKxm4c5q3_9tGYY",
  authDomain: "filmyworld-6820a.firebaseapp.com",
  projectId: "filmyworld-6820a",
  storageBucket: "filmyworld-6820a.appspot.com",
  messagingSenderId: "1095219164108",
  appId: "1:1095219164108:web:80d7c1eb893e9245c4e369"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;