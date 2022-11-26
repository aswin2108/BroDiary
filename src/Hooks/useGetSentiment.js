import { useState} from "react";

const useAnalyzeSentiment=()=>{
    const [sentimentData, setSentiment]=useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze=async(entry)=>{
        setIsLoading(true)
        if(entry===''){
            alert('Enter contents into the field');
            return;
           }
          
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
                        setIsLoading(false)
                    })
              .catch(err => console.error(err));
    }
    const clearSentiment=()=>{
        setSentiment("")
    }
    return {sentimentData, handleAnalyze, clearSentiment, isLoading}
}
export default useAnalyzeSentiment