import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDGcAmEZTzyEHKk3ORbMYN3JDrHuBOIi9c",
  authDomain: "blockchain-d97f1.firebaseapp.com",
  projectId: "blockchain-d97f1",
  storageBucket: "blockchain-d97f1.firebasestorage.app",
  messagingSenderId: "105566085232",
  appId: "1:105566085232:web:065570b9f3a117edbb54b5",
  measurementId: "G-6KLQYGEP61"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { analytics };
export default app;