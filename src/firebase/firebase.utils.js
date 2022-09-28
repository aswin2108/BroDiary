// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, signInWithRedirect,signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZIQfAvguQTQaSO8AwGTQYQ0VTs-uzdj0",
  authDomain: "diary-db-81612.firebaseapp.com",
  projectId: "diary-db-81612",
  storageBucket: "diary-db-81612.appspot.com",
  messagingSenderId: "858103293432",
  appId: "1:858103293432:web:9786ac7340de347f77220d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider=new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth=getAuth();
export const signInWithGooglePopup=()=>signInWithPopup(auth, provider);

export const db=getFirestore()

export const createUserDocumentFromAuth=async(userAuth) =>{
    const userDocRef=doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()){
        const {displayName, email}=userAuth;
        const createdAt=new Date();

        try{
            await setDoc(userDocRef, {
                displayName, email, createdAt
            });
        } catch(error){
            console.log('Error creating the user', error.message);
        }
    }
    return userDocRef;
      
};