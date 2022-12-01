import { createContext, useState, useEffect } from "react";

import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../firebase/firebase.utils";
//actual value to access 
export const UserContext=createContext({
    currentUser:null,
    setCurrentUser:()=>null,
    isUserContextLoading:true,
})

export const UserProvider=({children})=>{
    const [currentUser, setCurrentUser]=useState(null);
    const [isUserContextLoading, setisUserContextLoading]=useState(true);
    const value={currentUser,setCurrentUser, isUserContextLoading};
    useEffect(()=>{
        const unsubscribe= onAuthStateChangedListener((user)=>{
            if(user){
              createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
            setisUserContextLoading(false);
        });
        return unsubscribe
    },[]);


    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}