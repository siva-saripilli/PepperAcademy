import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import "./Speech.css";

const Speech = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <button className="btn" onClick={SpeechRecognition.startListening}>Start</button>
            <button className="btn"  onClick={SpeechRecognition.stopListening}>Stop</button>
            <button className="btn"  onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    );
};
export default Speech;