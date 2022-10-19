import React, {useEffect, useState} from "react";

import './words.styles.css';

const Words=()=>{
    const [result, setWord]=useState([]);
    
    useEffect(()=>{
        fetch("https://random-words-api.vercel.app/word")
           .then((response)=>response.json())
           .then((data)=>setWord(data[0]));
    }, [])

    return(
        <div className="word-top">
           <div className="word-comp">
              <div className="word"><h1>Word: {result.word}</h1></div>
              <div className="meaning"><h2>Definition: {result.definition}</h2></div>
            </div>
        </div>
    );
};

export default Words;