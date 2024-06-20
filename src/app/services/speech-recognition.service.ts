import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Injectable({
  providedIn: 'root',
})
export class SpeechRecognitionService {
    private readonly targetWord = 'hello'; // Change this to your specific word

    constructor(private speechRecognition: SpeechRecognition) {}

    startListening(): void {
        const options = {
            language: 'en-US',
            prompt: 'Speak now...',
            showPopup: false,
            showPartial: true,
            confirm: true
        };
        
        this.speechRecognition.requestPermission()
        .then(
            () => {
                console.log('Permission granted for speech recognition.');
                this.speechRecognition.startListening(options)
                .subscribe(
                  (matches: Array<string>) => {
                    console.log('Matches:', matches);
                    this.handleSpeechMatches(matches);
                  },
                  (onerror) => console.log('error:', onerror)
                )
            },
            (error) => console.error('Permission denied for speech recognition.', error)
        );
    }

    private handleSpeechMatches(matches: Array<string>): void {
        if (matches && matches.length > 0) {
            const detectedWord = matches[0].toLowerCase();
            if (detectedWord.includes(this.targetWord.toLowerCase())) {
                console.log('Specific word detected: ', this.targetWord);
                // Execute your action when the specific word is detected
            }
        }
    }

    stopListening(): void {
        this.speechRecognition.stopListening()
        .then(() => console.log('Speech recognition stopped'))
        .catch((error) => console.error('Error stopping speech recognition:', error));
    }
}
