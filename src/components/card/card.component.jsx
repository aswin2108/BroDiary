import React from "react";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";
import { diaryUser } from "../../firebase/firebase.utils";

import './card.styles.css'; 

const Card=(props)=>{
    const deleteEntry=async(event)=>{
        event.preventDefault();
        await deleteDoc(doc(db, diaryUser.currentUser.uid, props.indDoc.id));
    }
    return(
    <div className="card-container">
      <div className="history-card-header">
       <h3>{props.indDoc.id}</h3>
       <button className="delete-history-btn" onClick={deleteEntry}>Delete</button>
       </div>
       <p>{props.indDoc.entry}</p>
       <p>Possitive: {props.indDoc.possitive}</p>
       <p>Negative: {props.indDoc.negative}</p>
       <p>Neutral: {props.indDoc.neutral}</p>
       <p>Mixed: {props.indDoc.mixed}</p>
    </div>
    )
}

export default Card;