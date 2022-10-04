import React, {useEffect, useState} from "react";

import './words.styles.css';

const Words=()=>{
    const [result, setWord]=useState([]);
    
    // useEffect(()=>{
    //     const getWord=()=>{
    //         fetch("https://random-words-api.vercel.app/word")
    //            .then((response)=>response.json())
    //            .then((data)=>{
    //             setWord(data);
    //             // getMeaning(data.definition)
    //             // console.log(words[0].word);
    //             //  console.log(words[0].definition);
    //            })
    //         //    .then((data)=>getMeaning(data.definition));
    //         //  getMeaning();
    //         // <div><h1>{words[0].word}</h1></div>
    //         // <div><h1>{words[0].definition}</h1></div>
    //     };
    //     getWord();
    // }, [1]);
    // https://random-words-api.vercel.app/word
    useEffect(()=>{
        fetch("https://random-words-api.vercel.app/word")
           .then((response)=>response.json())
           .then((data)=>setWord(data[0]));
    }, [])

    return(
        <div className="top">
        <div className="word-butt">
       <div>{result.word}</div>
       <div>{result.definition}</div>
        </div>
        </div>
    );
};

export default Words;