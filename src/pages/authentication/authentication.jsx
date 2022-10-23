import SignInForm from "../../components/sign-in-form/signinForm.component";
import SignUpForm from "../../components/sign-up-form/signupForm.component";

import './authentication.styles.css'

const Authentication=()=>{  
    return(
        <div className="authentication-container">
            <SignInForm/>
            <SignUpForm/>
        </div>
    )
}

export default Authentication;