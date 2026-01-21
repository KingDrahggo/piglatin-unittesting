import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PigLatinService {
  constructor() { }

  encodeText(sentence: string): string {
    if (!sentence) return '';
    const splitText = sentence.split(' ');
    const translatedWords = splitText.map(word => this.encodeWord(word));
    return translatedWords.join(' ');
  }

  encodeWord(word: string): string {
    if (!word) return '';
    // Handle case where word might be empty or just symbols?
    // Current logic assumes simple words.
    // Clean word?? The original logic didn't seem to clean much, just split by space.

    // Regex for vowels
    const vowelRegex = /[aeiouAEIOU]/;
    const firstVowelMatch = word.match(vowelRegex);

    // If no vowel, just return word? Or treat as consonant?
    // Original logic:
    // if (reachedVowel !== firstVowel[index]) ...
    // If no vowel found, match returns null.

    if (!firstVowelMatch) {
      // No vowels found, return as is or apply specific rule?
      // "my" -> "y" is sometimes vowel. Original logic used [aeiouAEIOU].
      // The original code loop logic was a bit weird: 
      // for loop over word length.
      // let reachedVowel = word.indexOf(firstVowel); 
      // if firstVowel is array (match result), firstVowel[0] is the char.
      // If no match, firstVowel is null.
      
      // Let's stick closer to the intent of the original logic but make it robust.
      // If no vowels, maybe treat whole word as consonant cluster? "my" -> "myay"?
      // Let's keep it simple: if no vowels, return word + "ay" (all consonants moved? or just append ay?)
      // Original logic would crash if firstVowel is null because `word.match` returns null.
      return word + 'ay'; 
    }

    const firstVowelChar = firstVowelMatch[0];
    const firstLetter = word[0];

    // Check if starts with vowel
    if (this.isVowel(firstLetter)) {
      return this.encodeVowelWord(word);
    } else {
      return this.encodeConsonantWord(word);
    }
  }

  private isVowel(char: string): boolean {
    return /^[aeiouAEIOU]$/.test(char);
  }

  private encodeVowelWord(word: string): string {
    return `${word}-yay`;
  }

  private encodeConsonantWord(word: string): string {
    // Find the index of the first vowel
    const match = word.match(/[aeiouAEIOU]/);
    if (!match) return word; // Should be handled by encodeWord, but safety check.
    
    const firstVowelIndex = match.index!;
    
    // Slice logic
    // "latin" -> "atin-lay"
    // first vowel 'a' at index 1.
    // word.slice(1) -> "atin"
    // word.slice(0, 1) -> "l"
    // result: "atin-lay"
    
    const prefix = word.slice(0, firstVowelIndex);
    const stem = word.slice(firstVowelIndex);
    return `${stem}-${prefix}ay`;
  }
}
