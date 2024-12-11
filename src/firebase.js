// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyDsTc9etfbds2Xo2U5G_5bf9zM6-pUgKxs",
//   authDomain: "vibe-snap-4a1dd.firebaseapp.com",
//   projectId: "vibe-snap-4a1dd",
//   storageBucket: "vibe-snap-4a1dd.firebasestorage.app",
//   messagingSenderId: "538180401027",
//   appId: "1:538180401027:web:30f509a6998cb5ef52a8b6",
//   measurementId: "G-J1XYR7BRPB"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const googleProvider = new GoogleAuthProvider(app);
// // const analytics = getAnalytics(app);
// export const db = getFirestore(app);


const firebaseConfig = {
  apiKey: "AIzaSyDsTc9etfbds2Xo2U5G_5bf9zM6-pUgKxs",
  authDomain: "vibe-snap-4a1dd.firebaseapp.com",
  databaseURL: "https://vibe-snap-4a1dd-default-rtdb.firebaseio.com",
  projectId: "vibe-snap-4a1dd",
  storageBucket: "vibe-snap-4a1dd.firebasestorage.app",
  messagingSenderId: "538180401027",
  appId: "1:538180401027:web:30f509a6998cb5ef52a8b6",
  measurementId: "G-J1XYR7BRPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);