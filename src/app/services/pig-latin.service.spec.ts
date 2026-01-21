import { TestBed } from '@angular/core/testing';
import { PigLatinService } from './pig-latin.service';

describe('PigLatinService', () => {
  let service: PigLatinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PigLatinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Word Translation', () => {
    it('should translate single vowels words correctly', () => {
      expect(service.encodeWord('I')).toBe('I-yay');
      expect(service.encodeWord('eat')).toBe('eat-yay');
      expect(service.encodeWord('omelet')).toBe('omelet-yay');
      expect(service.encodeWord('ape')).toBe('ape-yay');
    });

    it('should translate single consonant words correctly', () => {
      expect(service.encodeWord('latin')).toBe('atin-lay');
      expect(service.encodeWord('cheers')).toBe('eers-chay');
      // Case sensitivity might be an issue in my implementation vs original logic.
      // Original logic preserved case in inputs?
      // "Hank" -> "ank-Hay"?
      // Let's check my implementation: `word.slice(...)`. Yes, it preserves case.
      // "Hank" -> match 'a' at 1. prefix "H". stem "ank". -> "ank-Hay".
      expect(service.encodeWord('Hank')).toBe('ank-Hay'); 
    });
    
    it('should handle words without vowels', () => {
        expect(service.encodeWord('my')).toBe('myay');
        expect(service.encodeWord('thy')).toBe('thyay');
    });
  });

  describe('Sentence Translation', () => {
    it('should translate sentences correctly', () => {
      expect(service.encodeText('I ate an apple')).toBe('I-yay ate-yay an-yay apple-yay');
      expect(service.encodeText('Hank was very mad')).toBe('ank-Hay as-way ery-vay ad-may');
    });
    
    it('should handle empty strings', () => {
      expect(service.encodeText('')).toBe('');
    });
  });
});
