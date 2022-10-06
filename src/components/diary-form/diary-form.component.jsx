import { useState, } from "react";
import { diaryUser } from "../../firebase/firebase.utils";
// import { UserProvider } from "../../contexts/user.context";
import { createUserDocumentFromAuth } from "../../firebase/firebase.utils"; 
import {db} from '../../firebase/firebase.utils';

import { doc, setDoc } from "firebase/firestore";

import './diary-form.styles.css';

const defaultFormFields={
    date:'',
    entry:''
}

const DiaryForm=()=>{
    const [formFields, setFormFields]=useState(defaultFormFields)
    const {date, entry}=formFields;

    const handleChange=(event)=>{
        const {name, value}=event.target ;
        setFormFields({...formFields,[name]: value})
    };

    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
    };

    const handleSubmit=async(event)=>{
        event.preventDefault();


        await setDoc(doc(db, diaryUser.currentUser.uid, date),{
            entry:entry
        });

        // db.collection('diaryUsercontact.currentUser.uid').add({
        //     date: date,
        //     entry: entry 
        // })
        // .then(()=>{
        //     alert("Diary entry completed");
        // })
        // .catch((error)=>{
        //     alert(error.message);
        // })

        // console.log('curr: ')
         resetFormFields();
    };
    return(
        <div className="diary-container">
        <h2>Enter your diary entry here</h2>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input className="dateField" type="date" required onChange={handleChange} name='date' value={date} />
        <textarea className="entryField" rows='20' placeholder="Diary Entry" type="text" required onChange={handleChange} name='entry' value={entry}/>
        <div className="buttons-container">
            <button className="diary-button" type="submit">Analyze</button>
            <button className="diary-button" type="submit">Save</button>
        </div>
      </form>
    </div>
    </div>
    )
}
export default DiaryForm;