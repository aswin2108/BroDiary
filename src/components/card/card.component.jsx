import React from "react";

import { deleteEntryTest } from "../../Helpers/historyUtils";

import './card.styles.css'; 

const Card=(props)=>{

    return(
    <div className="card-container">
      <div className="history-card-header">
       <h3>{props.indDoc.id}</h3>
       <button className="delete-history-btn" onClick={()=>(deleteEntryTest(props.indDoc.id))}>Delete</button>
       </div>
       <p>{props.indDoc.entry}</p>
       <p>Possitive: {props.indDoc.possitive}</p>
       <p>Negative: {props.indDoc.negative}</p>
       <p>Neutral: {props.indDoc.neutral}</p>
       <p>Mixed: {props.indDoc.mixed}</p>
       {
        props.indDoc.imgurl && (
            <img className="d-img" alt="Memory-img" src={props.indDoc.imgurl}/>
        )
       }
    </div>
    )
}

export default Card;