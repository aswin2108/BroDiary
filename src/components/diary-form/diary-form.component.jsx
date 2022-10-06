import { useState, } from "react";

import FormInput from "../form-input/form-input.component";

import './diary-form.styles.css';

const defaultFormFields={
    date:'',
    entry:''
}

const DiaryForm=()=>{
    const [formFields, setFormFields]=useState(defaultFormFields)
    const {date, entry}=formFields;

    const handleChange=(event)=>{
        const {name, value}=event.target ;
        setFormFields({...formFields,[name]: value})
    };

    const resetFormFields=()=>{
        setFormFields(defaultFormFields);
    }

    return(
        <div className="diary-container">
        <h2>Enter your diary entry here</h2>
      <div className="form-container">
      <form>
        <input className="dateField" type="date" required onChange={handleChange} name='date' value={date} />
        <textarea className="entryField" row='4' placeholder="Diary Entry" type="text" required onChange={handleChange} name='entry' value={entry}/>
        <div className="buttons-container">
            <button className="diary-button" type="submit">Analyze</button>
            <button className="diary-button" type="submit">Save</button>
        </div>
      </form>
    </div>
    </div>
    )
}
export default DiaryForm;