import { useState } from "react";

import { db } from "../firebase/firebase.utils";
import { doc, setDoc } from "firebase/firestore";
import { storage } from "../firebase/firebase.utils";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const useDiaryUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = (imageUpload, ...otherProps) => {
    setIsUploading(true);
    const imageRef = ref(storage, `diaryImage/${imageUpload.name + v4()}`);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Stopped");
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("Error", error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          addToFirestore(downloadURL, ...otherProps);
        });
      }
    );
  };

  const addToFirestore = async (
    downloadURL,
    entry,
    date,
    sentimentData,
    currentUser
  ) => {
    const { general_sentiment, general_sentiment_rate } = sentimentData.amazon;
    setIsUploading(true);
    await setDoc(doc(db, currentUser.uid, date), {
      entry: entry,
      imgurl: downloadURL,
      general_sentiment: general_sentiment,
      general_sentiment_rate: general_sentiment_rate,
    });
    setIsUploading(false);
  };
  return { isUploading, uploadImage, addToFirestore };
};

export default useDiaryUpload;
