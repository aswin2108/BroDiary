import { useState } from "react";
import { Link } from "react-router-dom";

import Sentiment from "../sentiment/sentimentData.component";
import Greeting from "../diaryGreeting/diaryGreeting.component";
import CustomButton from "../button/button.component";
import Spinner from "../spinner/spinner.component";

import useAnalyzeSentiment from "../../Hooks/useGetSentiment";
import useDiaryUpload from "../../Helpers/diaryUtils";

import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import "./diary-form.styles.css";

const defaultFormFields = {
  date: "",
  entry: "",
};

const Diary = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { date, entry } = formFields;
  const [imageUpload, setImageUpload] = useState(null);

  const { currentUser } = useContext(UserContext);
  const { sentimentData, handleAnalyze, clearSentiment, isSentimentLoading } =
    useAnalyzeSentiment();
  const { isUploading, uploadImage, addToFirestore } = useDiaryUpload();

  if (isSentimentLoading) {
    return <Spinner loading={isSentimentLoading} />;
  }
  if (isUploading) {
    return <Spinner loading={isUploading} />;
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    clearSentiment();
    setImageUpload("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    imageUpload === null
      ? addToFirestore("", entry, date, sentimentData, currentUser)
      : uploadImage(imageUpload, entry, date, sentimentData, currentUser);
    resetFormFields();
  };

  return (
    <div className="diary-container">
      <div className="diary-title">
        <Greeting />
        <Link className="history-button" to="/diary/history">
          History📜
        </Link>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            className="dateField"
            type="date"
            required
            aria-label="date"
            onChange={handleChange}
            name="date"
            value={date}
          />
          <textarea
            className="entryField"
            rows="15"
            placeholder="Diary Entry"
            aria-label="entry"
            type="text"
            required
            onChange={handleChange}
            name="entry"
            value={entry}
          />
          {imageUpload ? (
            <CustomButton
              buttonType="smallInverted"
              onClick={() => {
                setImageUpload(null);
              }}
            >
              Reset Image
            </CustomButton>
          ) : (
            <input
              className="image-entry"
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
                event.target.value = "";
              }}
            />
          )}
          <div className="buttons-container">
            <CustomButton
              type="button"
              name="analyzeBtn"
              onClick={() => {
                handleAnalyze(entry);
              }}
            >
              Analyze
            </CustomButton>
            {sentimentData ? (
              <CustomButton type="submit">Save</CustomButton>
            ) : (
              <p className="no-data">First analyze the entry.</p>
            )}
          </div>
        </form>
      </div>
      {sentimentData ? (
        <Sentiment {...sentimentData.amazon} />
      ) : (
        <p className="no-data">Do the analysis to view the result</p>
      )}
    </div>
  );
};
export default Diary;
