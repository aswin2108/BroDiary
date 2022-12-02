import React from "react";

import useGetHistory from "../../Hooks/useGetHistory";

import Card from "../card/card.component";
import Spinner from "../spinner/spinner.component";

import "./history.styles.css";

const History = () => {
  const { allDocs, isHistoryLoading } = useGetHistory();
  if (isHistoryLoading) {
    return <Spinner loading={isHistoryLoading} />;
  }

  return (
    <div className="entry-list">
      <h2>All your 📝 are here...!</h2>
      {allDocs.length === 0 ? (
        <span className="empty-list">No entries found!</span>
      ) : (
        allDocs.map((indDoc) => <Card key={indDoc.id} indDoc={indDoc} />)
      )}
    </div>
  );
};

export default History;
