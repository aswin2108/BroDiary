import React from "react";

import useGetQuote from "../../Hooks/useFetchQuote";

import Spinner from "../spinner/spinner.component";

import "./quote.styles.css";

const Quote = () => {
  const quotes = useGetQuote();

  if (quotes === "") {
    return <Spinner loading />;
  }

  return (
    <div className="quoteBox">
      <div className="quote">
        <h1 aria-label="quote">"{quotes.text}"</h1>
      </div>
      <div className="author">
        <h2 aria-label="author">:- {quotes.author}</h2>
      </div>
    </div>
  );
};

export default Quote;
