import React, {useState, useEffect} from "react";

import './quote.styles.css';

const Quote=()=>{
    const [quotes, setQuotes] =useState("");
    const getQuote=()=>{
        fetch("https://type.fit/api/quotes")
            .then((res)=>res.json())
            .then((data)=>{
                let randomNum=Math.floor(Math.random()*data.length);
                setQuotes(data[randomNum]);
            })
    }

    useEffect(()=>{
        getQuote();
    }, []);

    return(
    <div className="quoteBox">
        <div className="quote">
          <h1 aria-label="quote">"{quotes.text}"</h1>
        </div>
        <div className="author">
          <h2 aria-label="author">:- {quotes.author}</h2>
        </div>
        <div className="quote-button-cont">
          <button className="quote-button"  onClick={getQuote}>next</button>
        </div>
   </div>
    );
};

export default Quote;