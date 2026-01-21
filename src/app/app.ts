import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PigLatinService } from './services/pig-latin.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  title = 'piglatin-web';
  
  wordInput: string = '';
  wordOutput: string = '';
  
  sentenceInput: string = '';
  sentenceOutput: string = '';

  constructor(private pigLatinService: PigLatinService) {}

  translateWord(): void {
    this.wordOutput = this.pigLatinService.encodeText(this.wordInput);
    // Add a simple timeout to clear it after 4 seconds like original?
    // User said "Overhaul", maybe persistent is better, or a clear button.
    // I'll keep it persistent for now, simpler UX.
  }

  translateSentence(): void {
    this.sentenceOutput = this.pigLatinService.encodeText(this.sentenceInput);
  }
}
