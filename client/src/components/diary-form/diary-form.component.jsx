import { useState, } from "react";
import { diaryUser } from "../../firebase/firebase.utils";
import { Link } from "react-router-dom";
import axios from "axios";
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

         resetFormFields();
    };

    const handleAnalyze=async(event)=>{
         event.preventDefault();
        // const url='https://apis.paralleldots.com/v4/emotion'
        // axios.post(url, {
        //     text: 'I had a tooth removal today, it was really painful but got a chance to eat ice cream.',
        //     api_key: '',
        //     lang_code: 'pt'
        // })
        //   .then(response=>{
        //     console.log(response.json());
        //   })
    }

    return(
        <div className="diary-container">
        <div className="diary-title">
        <h2>Enter your diary entry here</h2>
        <Link className="history-button" to='/diary/history'>History</Link>
        </div>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input className="dateField" type="date" required onChange={handleChange} name='date' value={date} />
        <textarea className="entryField" rows='20' placeholder="Diary Entry" type="text" required onChange={handleChange} name='entry' value={entry}/>
        <div className="buttons-container">
            <button className="diary-button" onClick={handleAnalyze}>Analyze</button>
            <button className="diary-button" type="submit">Save</button>
        </div>
      </form>
    </div>
    </div>
    )
}
export default DiaryForm;