import React from "react";

const Sentiment=(props)=>{
    return(
        <div> 
            <p>Possitive: {props[0].sentiment_rate}</p>
            <p>Negative: {props[1].sentiment_rate}</p>
            <p>Neutral: {props[2].sentiment_rate}</p>
            <p>Mixed: {props[3].sentiment_rate}</p>
        </div>
    );

}
export default Sentiment;