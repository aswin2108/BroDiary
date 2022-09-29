import { signInWithGooglePopup,
    signInWithGoogleRedirect, 
    createUserDocumentFromAuth } from "../../firebase/firebase.utils";
import SignUpForm from "../sign-up-form/signupForm.component";
const SignIn=()=>{
    const logGoogleUser = async()=>{
        const {user}=await signInWithGooglePopup();
        const userDocRef=await createUserDocumentFromAuth(user);
        
    }

    return(
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
              Signin with Google Popup
            </button>
            <SignUpForm/>
        </div>
    )
}

export default SignIn;