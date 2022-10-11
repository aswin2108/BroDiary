import React from "react";

import './card.styles.css'; 

export const Card=(props)=>(
    <div className="card-container">
       <h3>{props.indDoc.id}</h3>
       <p>{props.indDoc.entry}</p>
    </div>
)