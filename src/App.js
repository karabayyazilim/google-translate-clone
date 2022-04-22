import TextField from "./components/TextField";
import Arrows from "./components/Arrows";
import {useEffect, useState} from "react";
import Modal from "./components/Modal";
import axios from "axios";
import Button from "./components/Button";


const App = () => {
    const [showModal, setShowModal] = useState(null)
    const [languages, setLanguages] = useState(null)
    const [inputLanguage, setInputLanguage] = useState('Turkish')
    const [outputLanguage, setOutputLanguage] = useState('English')
    const [textToTranslate, setTextToTranslate] = useState('')
    const [translatedText, setTranslatedText] = useState('')

    const getLanguages = () => {
        const options = {
            method: 'GET',
            url: 'https://google-translate20.p.rapidapi.com/languages',
            headers: {
                'X-RapidAPI-Host': 'google-translate20.p.rapidapi.com',
                'X-RapidAPI-Key': 'Su4Ob1Bkmtmshv4jqCUcaduA30E5p1thDMzjsnyOkTwu3TlsLx'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            const arrayOfData = Object.keys(response.data.data).map(key => response.data.data[key])
            setLanguages(arrayOfData)
        }).catch(function (error) {
            console.error(error);
        });
    }

    const translate = () => {
        const options = {
            method: 'GET',
            url: 'https://google-translate20.p.rapidapi.com/translate',
            params: {
                text: textToTranslate,
                tl: outputLanguage,
                sl: inputLanguage
            },
            headers: {
                'X-RapidAPI-Host': 'google-translate20.p.rapidapi.com',
                'X-RapidAPI-Key': 'Su4Ob1Bkmtmshv4jqCUcaduA30E5p1thDMzjsnyOkTwu3TlsLx'
            }
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setTranslatedText(response.data.data.translation)
        }).catch(function (error) {
            console.error(error);
        });
    }

    console.log('translated', translatedText)

    useEffect(() => {
        getLanguages()
    }, [])

    const handleClick = () => {
        setInputLanguage(outputLanguage)
        setOutputLanguage(inputLanguage);
    }

    console.log('showModal', showModal)

    return (
        <div className="app">
            {!showModal && <>
                <TextField
                    selectedLanguage={inputLanguage}
                    style='input'
                    setShowModal={setShowModal}
                    textToTranslate={textToTranslate}
                    setTextToTranslate={setTextToTranslate}
                    setTranslatedText={setTranslatedText}/>
                <div className='arrow-container' onClick={handleClick}>
                    <Arrows/>
                </div>
                <TextField
                    selectedLanguage={outputLanguage}
                    style='output'
                    setShowModal={setShowModal}
                    translatedText={translatedText}/>
                <div className="button-container" onClick={translate}>
                    <Button/>
                </div>
            </>}
            {showModal && <Modal
                setShowModal={setShowModal}
                languages={languages}
                chosenLanguage={showModal === 'input' ? inputLanguage : outputLanguage}
                setChosenLanguage={showModal === 'input' ? setInputLanguage : setOutputLanguage}
            />}

        </div>
    )
}

export default App;
