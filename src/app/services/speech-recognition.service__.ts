// src/app/services/speech-recognition.service.ts
import { Injectable } from '@angular/core';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Observable, fromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SpeechRecognitionService {
    private isListening = false;

    constructor(private speechRecognition: SpeechRecognition) {}

    startListening(): void {
    const options = {
        language: 'en-US',
        prompt: 'Speak now...',
        showPopup: false,
        confirm: true
    };

    this.speechRecognition.requestPermission()
        .then(() => {
            console.log('Permission granted for speech recognition.');
            this.speechRecognition.startListening(options)
                .subscribe(
                (matches: Array<string>) => {
                    console.log('Matches:', matches);
                    this.handleSpeech(matches);
                },
                (onerror) => console.log('error:', onerror)
                );
            this.isListening = true;
        })
        .catch((error) => console.error('Permission denied for speech recognition.', error));
    }

    stopListening(): void {
    this.speechRecognition.stopListening()
        .then(() => {
        console.log('Speech recognition stopped');
        this.isListening = false;
        })
        .catch((error) => console.error('Error stopping speech recognition:', error));
    }

    private handleSpeech(matches: Array<string>): void {
        // Replace 'your-word' with the specific word you're looking for
        const specificWord = 'hello';

        if (matches.includes(specificWord)) {
            console.log('Specific word detected:', specificWord);
            // Execute your desired action when the specific word is detected
            // Replace this with the action you want to perform
        }
    }

    listenForSpecificWord(): Observable<void> {
    return new Observable<void>((observer) => {
        const speechEvent = fromEvent(this.speechRecognition, 'result');
        const destroy$ = new Observable<void>((destroyObserver) => {
        // Stop listening when the observer unsubscribes
        observer.add(() => {
            if (this.isListening) {
            this.speechRecognition.stopListening()
                .then(() => {
                console.log('Speech recognition stopped');
                this.isListening = false;
                destroyObserver.complete();
                })
                .catch((error) => {
                console.error('Error stopping speech recognition:', error);
                destroyObserver.complete();
                });
            } else {
            destroyObserver.complete();
            }
        });
        });

        speechEvent.pipe(
        filter((event: any) => event && event.length > 0),
        takeUntil(destroy$)
        ).subscribe(
        (event: any) => {
            const matches: Array<string> = event;
            console.log('Matches:', matches);
            this.handleSpeech(matches);
        },
        (error) => console.error('Error during speech recognition:', error)
        );
    });
    }
}
