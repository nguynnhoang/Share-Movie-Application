import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { config } from "../config";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object


const firebaseConfig = config.firebase;

const app = initializeApp(firebaseConfig);
export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

