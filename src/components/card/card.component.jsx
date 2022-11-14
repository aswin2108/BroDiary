import React from "react";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase.utils";
import {  useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import './card.styles.css'; 

const Card=(props)=>{
  const {currentUser}=useContext(UserContext);
    const deleteEntry=async(event)=>{
        event.preventDefault();
        await deleteDoc(doc(db, currentUser.uid, props.indDoc.id));
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
       {
        props.indDoc.imgurl?(
            <img className="d-img" alt="Memory-img" src={props.indDoc.imgurl}/>
        ):(
            <p></p>
        )
       }
    </div>
    )
}

export default Card;