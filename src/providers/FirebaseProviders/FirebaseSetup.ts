import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import { firebaseConfig } from "../../firebaseConfig";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
