import React, {useState, useEffect} from "react";
import { db } from "../../firebase/firebase.utils";
import { diaryUser } from "../../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import './history.styles.css';
import { async } from "@firebase/util";
import { Card } from "../card/card.component";

const History=()=>{
    
    const [allDocs,setAllDocs]=useState([]);
    const location=useLocation();
   

    // useEffect(()=>{
    //     const id=  diaryUser.currentUser.uid;
    //     (async()=>{
           
    //       const colRef= collection(db, id)
    //       const snapshots=await getDocs(colRef)

    //       const docs=snapshots.docs.map(doc=> {
    //         const data=doc.data()
    //         data.id=doc.id
    //         return data
    //     })
    //     // setAllDocs(docs);

    //       console.log(docs);
    //     })()
    // })
    
    const loadPrev=()=>{
        const id=  diaryUser.currentUser.uid;
        (async()=>{
           
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