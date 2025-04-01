interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
}
interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
}