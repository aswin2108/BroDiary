import SignInForm from "../../components/sign-in-form/signinForm.component";
import SignUpForm from "../../components/sign-up-form/signupForm.component";

import { UserContext } from "../../contexts/user.context";
import {  useContext } from "react";

import './authentication.styles.css';
import { Navigate } from "react-router-dom";

const Authentication=()=>{  
    const {currentUser}=useContext(UserContext);
    if(currentUser){
        return <Navigate to="/"/>
    }
    return(
        <div className="authentication-container">
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default Authentication;