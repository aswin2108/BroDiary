import { useState } from "react";

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";

import './sign-in-form.styles.css'

const defaultFormFields={
    email:'',
    password:''
}

const SignInForm=()=>{
    const [formFields, setFormFields]=useState(defaultFormFields)
    const {email, password}=formFields;

    const handleChange=(event)=>{
        const {name, value}=event.target ;
        setFormFields({...formFields,[name]: value})
    };
    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async()=>{
        const {user}=await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
       
        try{
            const response=await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();
        }catch(error){
            if(error.code==="auth/wrong-password"){
                alert('Incorrect password for email');
            }
            else if(error.code==="auth/user-not-found"){
                alert('User not registered')
            }
            else
              console.log(error);
        }
    }

    return(
        <div className="sign-up-container">
        <h2 className="sign-up-title">Already have an account?</h2>
         <span>Sign in with your email and password</span>
         <form onSubmit={handleSubmit}>
           <FormInput label="Email" type='email' required onChange={handleChange} name='email' value={email}/>
           <FormInput label="Password" type='password' required onChange={handleChange} name='password' value={password}/>
           <div className="buttons-container">
           <button className="sign-up-button" type="submit">Sign In</button>
           <button type="button" className="sign-up-button" onClick={signInWithGoogle}>Google Sign In</button>
           </div>
         </form>
        </div>
    );

    
}
export default SignInForm;