import SignInForm from "../sign-in-form copy/signinForm.component";
import SignUpForm from "../sign-up-form/signupForm.component";

import './suthentication.styles.css'

const Authentication=()=>{  
    return(
        <div className="authentication-container">
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default Authentication;