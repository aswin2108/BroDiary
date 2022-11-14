import React, {useState, useEffect} from "react";

import { auth, db } from "../../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

import Card from "../card/card.component";

import './history.styles.css';

const History=()=>{
    const [allDocs,setAllDocs]=useState([]);

    const loadPrev=auth.onAuthStateChanged((authObj)=>{
      if(authObj){
        (async()=>{
           
          const id = authObj.uid;
          
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
    })

    useEffect(()=>{
      loadPrev();
  }, [allDocs]);
    
    
    return(
      <div className="entry-list">
           {
             allDocs.map(indDoc=>(
                <Card key={indDoc.id} indDoc={indDoc} />
             ))
           }
      </div>
        
    )
}

export default History;