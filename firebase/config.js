import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGdgbt3STYGFIpHLKuUMl-zPV1BXIV3dc",
  authDomain: "my-login-pages.firebaseapp.com",
  databaseURL: "https://my-login-pages-default-rtdb.firebaseio.com",
  projectId: "my-login-pages",
  storageBucket: "my-login-pages.firebasestorage.app",
  messagingSenderId: "835280657035",
  appId: "1:835280657035:web:dc6e5d09520246e18a928e",
  measurementId: "G-NVV7XZ22Z0",
};
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
