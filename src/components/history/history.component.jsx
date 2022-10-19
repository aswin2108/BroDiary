import React, {useState, useEffect} from "react";

import { db } from "../../firebase/firebase.utils";
import { diaryUser } from "../../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

import Card from "../card/card.component";

import './history.styles.css';

const History=()=>{
    
    const [allDocs,setAllDocs]=useState([]);

    const loadPrev=()=>{
        (async()=>{
           
          const id=  diaryUser.currentUser.uid;
          
          const colRef= collection(db, id)
          const snapshots=await getDocs(colRef)

          const docs=snapshots.docs.map(doc=> {
            const data=doc.data()
            data.id=doc.id
            return data
        })
         setAllDocs(docs);
        })()
    }

    useEffect(()=>{
      loadPrev();
  }, [allDocs]);
    
    
    return(
        <div>
        <button  className="diary-history-button" onClick={loadPrev}>Load Previous</button>
           <div className="entry-list">
           {
             allDocs.map(indDoc=>(
                <Card key={indDoc.id} indDoc={indDoc} />
             ))
           }
           </div>
        </div>
    )
}

export default History;