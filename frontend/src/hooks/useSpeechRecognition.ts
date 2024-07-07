import { useEffect, useState } from "react";

let recognition: SpeechRecognition;

if ("webkitSpeechRecognition" in window) {
    recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
}

const useSpeechRecognition = () => {
    const [transcript, setTranscript] = useState<string>("");
    const [isListening, setIsListening] = useState<boolean>(false);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            setTranscript(event.results[0][0].transcript);
            recognition.stop();
            setIsListening(false);
        }
    }, []);

    const startListening = () => {
        setTranscript("");
        setIsListening(true);
        recognition.start();
    }

    const stopListening = () => {
        recognition.stop();
        setIsListening(false);
    }

    return {
        transcript,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition,
    }

}

export default useSpeechRecognition