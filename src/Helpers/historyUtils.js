import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase.utils";
// import useGetHistory from "../Hooks/useGetHistory";

export async function deleteEntryTest(docId) {
  await deleteDoc(doc(db, auth.currentUser.uid, docId));
}
