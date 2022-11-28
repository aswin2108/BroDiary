import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../firebase/firebase.utils";
//actual value to access 
export const UserContext=createContext({
    currentUser:null,
    setCurrentUser:()=>null,
    isLoading:true,
})

export const UserProvider=({children})=>{
    const [currentUser, setCurrentUser]=useState(null);
    const [isLoading, setIsLoading]=useState(true);
    const value={currentUser,setCurrentUser, isLoading};
    useEffect(()=>{
        const unsubscribe= onAuthStateChangedListener((user)=>{
            if(user){
              createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
            setIsLoading(false);
        });
        return unsubscribe
    },[]);


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}