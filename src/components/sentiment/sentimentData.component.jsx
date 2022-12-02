import React from "react";

import "./sentimentData.styles.css";

const SENTIMENT_TYPE = {
  Positive: "positive",
  Negative: "negative",
  Neutral: "neutral",
};

const Sentiment = (props) => {
  const { general_sentiment, general_sentiment_rate } = props;

  return (
    <div className={`sentiment-card ${SENTIMENT_TYPE[general_sentiment]}`}>
      <p>{general_sentiment}</p>
      <p>{general_sentiment_rate * 100}%</p>
    </div>
  );
};
export default Sentiment;
