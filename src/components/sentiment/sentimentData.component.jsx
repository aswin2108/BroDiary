import React from "react";

const Sentiment = (props) => {
  const { general_sentiment, general_sentiment_rate } = props;

  return (
    <div>
      <p>General Sentiment: {general_sentiment}</p>
      <p>Sentiment Rate: {general_sentiment_rate}</p>
    </div>
  );
};
export default Sentiment;
