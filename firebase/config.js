import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXI-gJ1goKoJFEa9mcwP66gKnzInGBsUc",
  authDomain: "socialconnect-493c7.firebaseapp.com",
  projectId: "socialconnect-493c7",
  storageBucket: "socialconnect-493c7.appspot.com",
  messagingSenderId: "939057615638",
  appId: "1:939057615638:web:0dbe3ac473e4925646b637",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);


