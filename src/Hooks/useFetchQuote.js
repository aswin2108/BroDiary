import { useEffect, useState } from "react";

export default function useFetchQuote(){
    const [quote, setQuote]=useState("");
    const getQuote=()=>{
        fetch("https://type.fit/api/quotes")
            .then((res)=>res.json())
            .then((data)=>{
                let randomNum=Math.floor(Math.random()*data.length);
                setQuote(data[randomNum]);
            })
    }
    useEffect(()=>{
            getQuote();
    }, []);

    return quote;
}