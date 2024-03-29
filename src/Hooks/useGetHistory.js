import { useState, useEffect } from "react";

import { auth, db } from "../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

import { doc, deleteDoc } from "firebase/firestore";

const useGetHistory = () => {
  const [allDocs, setAllDocs] = useState([]);
  const [isHistoryLoading, setHistoryLoading] = useState(true);

  async function deleteEntryTest(docId) {
    await deleteDoc(doc(db, auth.currentUser.uid, docId)).catch((err) =>
      console.log(err)
    );
  }

  const loadHistory = () => {
    auth.onAuthStateChanged((authObj) => {
      if (authObj) {
        (async () => {
          const id = authObj.uid;
          const colRef = collection(db, id);
          const snapshots = await getDocs(colRef).catch((error) =>
            console.log(error)
          );
          const docs = snapshots.docs.map((doc) => {
            const data = doc.data();
            data.id = doc.id;
            return data;
          });
          setAllDocs(docs);
          setHistoryLoading(false);
        })();
      }
    });
  };

  useEffect(() => {
    loadHistory();
  }, []);

  return { allDocs, isHistoryLoading, deleteEntryTest, loadHistory };
};
export default useGetHistory;
