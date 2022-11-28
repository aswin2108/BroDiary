import { useState} from "react";

const useAnalyzeSentiment=()=>{
    const [sentimentData, setSentiment]=useState('');
    const [isSentimentLoading, setIsSentimentLoading] = useState(false);

    const handleAnalyze=async(entry)=>{
        if(entry===''){
            alert('Enter contents into the field');
            return;
           }
           setIsSentimentLoading(true)
           const options = {
              method: 'POST',
              headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `${process.env.REACT_APP_API_KEY}`
               },
              body: JSON.stringify({
                response_as_dict: true,
                attributes_as_list: false,
                show_original_response: false,
                text: entry,
                language: 'en',
                providers: 'amazon'
              })
            };
            await fetch('https://api.edenai.run/v2/text/sentiment_analysis', options)
              .then(response => response.json())
              .then(response=>{
                        setSentiment(response)
                        setIsSentimentLoading(false)
                    })
              .catch(err => console.error(err));
    }
    const clearSentiment=()=>{
        setSentiment("")
    }
    return {sentimentData, handleAnalyze, clearSentiment, isSentimentLoading}
}
export default useAnalyzeSentiment