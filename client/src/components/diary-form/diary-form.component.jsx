import { useState } from "react";
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
    
    const [sentimentData, setSentiment]=useState("");

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
            entry:entry,
            possitive: sentimentData.amazon.items[0].sentiment_rate,
            negative: sentimentData.amazon.items[1].sentiment_rate,
            neutral: sentimentData.amazon.items[2].sentiment_rate,
            mixed: sentimentData.amazon.items[3].sentiment_rate
        });

         resetFormFields();
    };

    const handleAnalyze=async(event)=>{
         event.preventDefault();
        
         const options = {
            method: 'POST',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: `${process.env.REACT_APP_API_KEY}`
             },
            body: JSON.stringify({
              response_as_dict: true,
              attributes_as_list: false,
              show_original_response: false,
              text: entry,
              language: 'en',
              providers: 'amazon'
            })
          };
          fetch('https://api.edenai.run/v2/text/sentiment_analysis', options)
            .then(response => response.json())
            .then(response => setSentiment(response))
            .catch(err => console.error(err));
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
            {
              sentimentData?(
                <button className="diary-button" type="submit">Save</button>
                ):(<p>First analyze the entry.</p>)
            }
        </div>
      </form>
    </div>
    {
        sentimentData?(<div> 
          <p>Possitive: {sentimentData.amazon.items[0].sentiment_rate}</p>
          <p>Negative: {sentimentData.amazon.items[1].sentiment_rate}</p>
          <p>Neutral: {sentimentData.amazon.items[2].sentiment_rate}</p>
          <p>Mixed: {sentimentData.amazon.items[3].sentiment_rate}</p>
        </div>)
        : (
        <p>Do the analysis to view the result</p>
        )
    }
    </div>
    )
}
export default DiaryForm;