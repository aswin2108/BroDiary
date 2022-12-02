import React from "react";

// import { deleteEntryTest } from "../../Helpers/historyUtils";
import useGetHistory from "../../Hooks/useGetHistory";
import Sentiment from "../sentiment/sentimentData.component";

import "./card.styles.css";

const Card = (props) => {
  const { deleteEntryTest } = useGetHistory();

  return (
    <div className="card-container">
      <div className="history-card-header">
        <h3>{props.indDoc.id}</h3>
        <button
          className="delete-history-btn"
          onClick={() => {
            deleteEntryTest(props.indDoc.id);
          }}
        >
          Delete
        </button>
      </div>
      <p>{props.indDoc.entry}</p>
      <Sentiment {...props.indDoc} />
      {props.indDoc.imgurl && (
        <img className="d-img" alt="Memory-img" src={props.indDoc.imgurl} />
      )}
    </div>
  );
};

export default Card;
