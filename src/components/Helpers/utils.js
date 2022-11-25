import { doc, deleteDoc } from "firebase/firestore";
import { db,auth } from "../../firebase/firebase.utils";

export async function deleteEntryTest (docId){
    await deleteDoc(doc(db, auth.currentUser.uid, docId));
}