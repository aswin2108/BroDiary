import { useState } from "react";
import { Link } from "react-router-dom";

import Sentiment from "../sentiment/sentimentData.component";
import Greeting from "../diaryGreeting/diaryGreeting.component"; 
import CustomButton from "../button/button.component";

import {db} from '../../firebase/firebase.utils';
import { doc, setDoc } from "firebase/firestore";
import { storage } from "../../firebase/firebase.utils";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {v4} from 'uuid';

import {  useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import './diary-form.styles.css';

import useAnalyzeSentiment from "../../Hooks/useGetSentiment";

import Spinner from "../spinner/spinner.component";

const defaultFormFields={
    date:'',
    entry:''
}

const DiaryForm=()=>{
    const [formFields, setFormFields]=useState(defaultFormFields)
    const {date, entry}=formFields;
    const [imageUpload, setImageUpload]=useState(null);

    const {currentUser}=useContext(UserContext);
    const {sentimentData, handleAnalyze, clearSentiment, isSentimentLoading}=useAnalyzeSentiment();
  
    if(isSentimentLoading){
      return <Spinner loading={isSentimentLoading}/>
    }

    const handleChange=(event)=>{
        const {name, value}=event.target ;
        setFormFields({...formFields,[name]: value})
    };

    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
        clearSentiment();
        setImageUpload('');
    };

    const uploadImage=()=>{
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
        imageUpload===null?(
          addToFirestore('')
      ):(
          uploadImage() 
      )
    };

    const addToFirestore=async(downloadURL)=>{
      await setDoc(doc(db, currentUser.uid, date),{
        entry:entry,
        imgurl:downloadURL,
        possitive: sentimentData.amazon.items[0].sentiment_rate,
        negative: sentimentData.amazon.items[1].sentiment_rate,
        neutral: sentimentData.amazon.items[2].sentiment_rate,
        mixed: sentimentData.amazon.items[3].sentiment_rate
      });
      resetFormFields();
    }

    return(
        <div className="diary-container">
        <div className="diary-title">
          <Greeting/>
          <Link className="history-button" to='/diary/history'>History📜</Link>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <input className="dateField" type="date" required aria-label="date" onChange={handleChange} name='date' value={date} />
            <textarea className="entryField" rows='20' placeholder="Diary Entry" aria-label="entry" type="text" required onChange={handleChange} name='entry' value={entry}/>
            <input className="image-entry" type='file' onChange={(event)=>{setImageUpload(event.target.files[0]);}}/>
            <div className="buttons-container">
              <CustomButton type="button" name="analyzeBtn" onClick={()=>{handleAnalyze(entry)}}>Analyze</CustomButton>
             {
              sentimentData?(
                  <CustomButton type="submit">Save</CustomButton>
                ):(<p>First analyze the entry.</p>)
             }
            </div>
          </form>
        </div>
     {
        sentimentData?(
             <Sentiment {...sentimentData.amazon.items}/>
             ): (
                  <p>Do the analysis to view the result</p>
                )
     }
    </div>
    );
}
export default DiaryForm;