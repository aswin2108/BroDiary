import { useState, useEffect } from "react";

import { auth, db } from "../firebase/firebase.utils";
import { collection, getDocs } from "firebase/firestore";

import { useContext } from "react";
import { UserContext } from "../contexts/user.context";

// import { deleteEntryTest } from "../Helpers/historyUtils";
import { doc, deleteDoc } from "firebase/firestore";

// export default function useGetHistory() {
//   const [allDocs, setAllDocs] = useState([]);
//   const [isHistoryLoading, setHistoryLoading] = useState(true);

//   const { currentUser } = useContext(UserContext);

//   // useEffect(() => {
//   //   auth.onAuthStateChanged((authObj) => {
//   //     if (authObj) {
//   //       (async () => {
//   //         const id = authObj.uid;

//   //         const colRef = collection(db, id);
//   //         const snapshots = await getDocs(colRef);

//   //         const docs = snapshots.docs.map((doc) => {
//   //           const data = doc.data();
//   //           data.id = doc.id;
//   //           return data;
//   //         });
//   //         setAllDocs(docs);
//   //         setHistoryLoading(false);
//   //       })();
//   //     }
//   //   });
//   // }, [allDocs]);

//   // useEffect(() => {
//   //   if (!isUserContextLoading) {
//   //     (async () => {
//   //       const id = currentUser.uid;

//   //       const colRef = collection(db, id);
//   //       const snapshots = await getDocs(colRef);

//   //       const docs = snapshots.docs.map((doc) => {
//   //         const data = doc.data();
//   //         data.id = doc.id;
//   //         return data;
//   //       });
//   //       setAllDocs(docs);
//   //       setHistoryLoading(false);
//   //     })();
//   //   }
//   // }, [allDocs]);

//   useEffect(() => {
//     (async () => {
//       const id = currentUser.uid;

//       const colRef = collection(db, id);
//       const snapshots = await getDocs(colRef);

//       const docs = snapshots.docs.map((doc) => {
//         const data = doc.data();
//         data.id = doc.id;
//         return data;
//       });
//       setAllDocs(docs);
//       setHistoryLoading(false);
//     })();
//   }, [deleteEntryTest]);

//   return { allDocs, isHistoryLoading };
// }

const useGetHistory = () => {
  const [allDocs, setAllDocs] = useState([]);
  const [isHistoryLoading, setHistoryLoading] = useState(true);
  const { currentUser } = useContext(UserContext);

  const loadHistory = async () => {
    if (!isHistoryLoading) return;
    console.log("hi");
    const id = currentUser.uid;
    const colRef = collection(db, id);
    const snapshots = await getDocs(colRef);

    const docs = snapshots.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    setAllDocs(docs);
    setHistoryLoading(false);
  };

  const deleteEntryTest = async (docId) => {
    await deleteDoc(doc(db, auth.currentUser.uid, docId));
    setHistoryLoading(true);
  };

  useEffect(() => {
    // console.log("hi");
    loadHistory();
  }, [isHistoryLoading]);
  return { allDocs, isHistoryLoading, loadHistory, deleteEntryTest };
};
export default useGetHistory;
