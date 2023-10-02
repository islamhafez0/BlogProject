import { createContext } from "react";
import firebaseConfig from "../constants/fireBaseConfig";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

export const FirebaseContext = createContext()

const app = initializeApp(firebaseConfig);
const db = getFirestore()

export const FirebaseProvider = ({children}) => {
    return <FirebaseContext.Provider value={{ app, db }}>
        {children}
    </FirebaseContext.Provider>
}