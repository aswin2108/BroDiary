import React from "react";

import useGetHistory from "../../Hooks/useGetHistory";

import Card from "../card/card.component";

import './history.styles.css';

const History=()=>{
  const allDocs=useGetHistory();

  return(
    <div className="entry-list">
       { allDocs.length===0 ? (<span>no entries found</span> ): 
          (allDocs.map(indDoc=>(
             <Card key={indDoc.id} indDoc={indDoc} />
          )))
      }
    </div>
        
    )
}

export default History;