import { useEffect, useState } from "react";

const useFetchQuote=()=>{
    const [quote, setQuote]=useState("");
    const getQuote=async()=>{
            await fetch("https://type.fit/api/quotes")
               .then((res)=>res.json())
               .then((data)=>{
                    let randomNum=Math.floor(Math.random()*data.length);
                    setQuote(data[randomNum]);
                })
                .catch(err => console.error(err));
            }
    useEffect(()=>{
        getQuote();
    }, []);
   return quote;
}

export default useFetchQuote;