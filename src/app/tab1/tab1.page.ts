import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SpeechRecognitionService } from '../services/speech-recognition.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    standalone: true,
    imports: [IonicModule, ExploreContainerComponent],
})
export class Tab1Page {
    constructor(private speechRecognitionService: SpeechRecognitionService) {
        
    }

    startListening(): void {
        this.speechRecognitionService.startListening();
    }
    
    stopListening(): void {
        this.speechRecognitionService.stopListening();
    }
}
