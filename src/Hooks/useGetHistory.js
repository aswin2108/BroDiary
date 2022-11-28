import {useState, useEffect} from "react";

import { auth,db } from "../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

export default function useGetHistory(){
    const [allDocs,setAllDocs]=useState([]);
    const [isHistoryLoading, setHistoryLoading]=useState(true);

    useEffect(()=>{auth.onAuthStateChanged((authObj)=>{
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
          setHistoryLoading(false);
          })()
        }
      })
  }, [allDocs]);

  return {allDocs, isHistoryLoading};
}