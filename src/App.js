import './App.css';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [inputText, setInputText] = useState('');
  const [detectLanguageKey, setdetectedLanguageKey] = useState("");
  const [selectedLanguageKey, setSelectedLanguageKey] = useState('');
  const [languages, setLanguages] = useState([]);
  const [resultText, setResultText] = useState('');

  const getLanguageSource = ()=>{
    axios.post(`https://libretranslate.de/detect`,{
      q:inputText
    }).then((response=>{
      // console.log(response);
      setdetectedLanguageKey(response.data[0].language);
    }))
  }

  useEffect(()=>{
    axios.get(`https://libretranslate.de/languages`)
    .then((response)=>{
      // console.log(response.data);
      setLanguages(response.data);
    })

    // getLanguageSource()
  },[]);

  // useEffect(() => {
  
  // }, [inputText])

  const languageTranslateKey=(selectedLanguage)=>{
    setSelectedLanguageKey(selectedLanguage.target.value);
    // console.log(selectedLanguage);
  }

  const translateText=()=>{
    getLanguageSource();

    let data={
      q: inputText,
      source: detectLanguageKey,
      target: selectedLanguageKey
    }

    axios.post(`https://libretranslate.de/translate`, data)
    .then((response)=>{
      setResultText(response.data);
      // console.log(resultText.translatedText)
    })
  }

  return (
    <div className="app-header">
      <h2 className="header">Texty Translator</h2>
      <div className='app-body'>
        <div>
          <Form>
              <Form.Field control={TextArea} placeholder='Type Text to Translate..' onChange={(e)=>setInputText(e.target.value)} />

              <select className="language-select" onChange={languageTranslateKey}>
                  <option>Please Select Language..</option>
                  {languages && languages.map((language)=>{
                    return(
                      <option value={language.code}>
                      {language.name}
                    </option>
                    )
                  }) }
              </select>

              <Form.Field control={TextArea} placeholder='Your Result Translation..' value={resultText.translatedText} />

              <Button color="orange" size="large" onClick={translateText}>
                  <Icon name='translate' />
                  Translate
              </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default App;
