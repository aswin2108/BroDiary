import { useState } from "react";
import { Link } from "react-router-dom";

import {db} from '../../firebase/firebase.utils';
import { doc, setDoc } from "firebase/firestore";
import { diaryUser } from "../../firebase/firebase.utils";
import { storage } from "../../firebase/firebase.utils";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid';

import './diary-form.styles.css';

const defaultFormFields={
    date:'',
    entry:''
}

const DiaryForm=()=>{
    const [formFields, setFormFields]=useState(defaultFormFields)
    const {date, entry}=formFields;
    const [imageUpload, setImageUpload]=useState(null);
    const [sentimentData, setSentiment]=useState("");

    const handleChange=(event)=>{
        const {name, value}=event.target ;
        setFormFields({...formFields,[name]: value})
    };

    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
        setSentiment("");
        setImageUpload('');
    };

    const uploadImage=()=>{
      if(imageUpload==null) return;
      const imageRef=ref(storage,`diaryImage/${imageUpload.name + v4()}`);
      const uploadTask = uploadBytesResumable(imageRef, imageUpload);
      uploadTask.on('state_changed', 
        (snapshot) => { 
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
               case 'paused':
                   console.log('Upload is paused');
                   break;
               case 'running':
                   console.log('Upload is running');
                   break;
               default: console.log('Stopped');
          }
      }, 
      (error) => {
             // Handle unsuccessful uploads
             console.log('Error',error);
          }, 
      () => {
           // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              addToFirestore(downloadURL)
              console.log(downloadURL);
         });
       }
      );
    }

    const handleSubmit=async(event)=>{
        event.preventDefault();
        uploadImage();
    };

    const addToFirestore=async(downloadURL)=>{
      await setDoc(doc(db, diaryUser.currentUser.uid, date),{
        entry:entry,
        imgurl:downloadURL,
        possitive: sentimentData.amazon.items[0].sentiment_rate,
        negative: sentimentData.amazon.items[1].sentiment_rate,
        neutral: sentimentData.amazon.items[2].sentiment_rate,
        mixed: sentimentData.amazon.items[3].sentiment_rate
      });
      resetFormFields();
    }

    const handleAnalyze=async(event)=>{
         event.preventDefault();
         if(entry===''){
          alert('Enter contents into the field');
          return;
         }
        
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
            <input className="dateField" type="date" required aria-label="date" onChange={handleChange} name='date' value={date} />
            <textarea className="entryField" rows='20' placeholder="Diary Entry" aria-label="entry" type="text" required onChange={handleChange} name='entry' value={entry}/>
            <input className="image-entry" type='file' onChange={(event)=>{setImageUpload(event.target.files[0]);}}/>
            <div className="buttons-container">
              <button className="diary-button" name="analyzeBtn" onClick={handleAnalyze}>Analyze</button>
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
    );
}
export default DiaryForm;