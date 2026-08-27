export class ChordDetector {
  // Guitar chord definitions (simplified for MVP)
  private chords: { [key: string]: { notes: string[]; intervals: number[] } } = {
    'C': { notes: ['C', 'E', 'G'], intervals: [0, 4, 7] },
    'Cm': { notes: ['C', 'D#', 'G'], intervals: [0, 3, 7] },
    'C7': { notes: ['C', 'E', 'G', 'A#'], intervals: [0, 4, 7, 10] },
    'D': { notes: ['D', 'F#', 'A'], intervals: [0, 4, 7] },
    'Dm': { notes: ['D', 'F', 'A'], intervals: [0, 3, 7] },
    'D7': { notes: ['D', 'F#', 'A', 'C'], intervals: [0, 4, 7, 10] },
    'E': { notes: ['E', 'G#', 'B'], intervals: [0, 4, 7] },
    'Em': { notes: ['E', 'G', 'B'], intervals: [0, 3, 7] },
    'E7': { notes: ['E', 'G#', 'B', 'D'], intervals: [0, 4, 7, 10] },
    'F': { notes: ['F', 'A', 'C'], intervals: [0, 4, 7] },
    'Fm': { notes: ['F', 'G#', 'C'], intervals: [0, 3, 7] },
    'G': { notes: ['G', 'B', 'D'], intervals: [0, 4, 7] },
    'Gm': { notes: ['G', 'A#', 'D'], intervals: [0, 3, 7] },
    'G7': { notes: ['G', 'B', 'D', 'F'], intervals: [0, 4, 7, 10] },
    'A': { notes: ['A', 'C#', 'E'], intervals: [0, 4, 7] },
    'Am': { notes: ['A', 'C', 'E'], intervals: [0, 3, 7] },
    'A7': { notes: ['A', 'C#', 'E', 'G'], intervals: [0, 4, 7, 10] },
    'B': { notes: ['B', 'D#', 'F#'], intervals: [0, 4, 7] },
    'Bm': { notes: ['B', 'D', 'F#'], intervals: [0, 3, 7] },
    'B7': { notes: ['B', 'D#', 'F#', 'A'], intervals: [0, 4, 7, 10] },
  };

  detectChord(detectedNotes: string[]): { chord: string; confidence: number } {
    if (detectedNotes.length === 0) {
      return { chord: '', confidence: 0 };
    }

    // Extract unique notes (ignoring octave)
    const uniqueNotes = [...new Set(detectedNotes.map(note => note.slice(0, -1)))];
    
    if (uniqueNotes.length < 2) {
      return { chord: '', confidence: 0 };
    }

    let bestMatch = '';
    let bestConfidence = 0;

    for (const [chordName, chordData] of Object.entries(this.chords)) {
      const matchScore = this.calculateChordMatch(uniqueNotes, chordData.notes);
      
      if (matchScore > bestConfidence) {
        bestConfidence = matchScore;
        bestMatch = chordName;
      }
    }

    return { chord: bestMatch, confidence: bestConfidence };
  }

  private calculateChordMatch(detectedNotes: string[], chordNotes: string[]): number {
    let matches = 0;
    let total = chordNotes.length;

    for (const chordNote of chordNotes) {
      if (detectedNotes.includes(chordNote)) {
        matches++;
      }
    }

    // Penalize extra notes
    const extraNotes = Math.max(0, detectedNotes.length - chordNotes.length);
    const penalty = extraNotes * 0.1;

    const baseScore = matches / total;
    const confidence = Math.max(0, baseScore - penalty);

    return confidence;
  }

  detectChordFromFrequencies(frequencies: number[]): { chord: string; confidence: number } {
    if (frequencies.length === 0) {
      return { chord: '', confidence: 0 };
    }

    // Convert frequencies to notes
    const notes = frequencies.map(freq => this.frequencyToNote(freq)).filter(note => note !== '');
    
    return this.detectChord(notes);
  }

  private frequencyToNote(frequency: number): string {
    const noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const a4 = 440;
    const c0 = a4 * Math.pow(2, -4.75);

    const halfSteps = Math.round(12 * Math.log2(frequency / c0));
    const octave = Math.floor(halfSteps / 12);
    const noteIndex = halfSteps % 12;

    if (noteIndex < 0 || noteIndex >= noteStrings.length) return '';

    return noteStrings[noteIndex] + octave;
  }

  // Advanced chord detection using harmonic series
  detectChordAdvanced(audioData: Float32Array, sampleRate: number): { chord: string; confidence: number } {
    // This would use FFT to detect all frequencies present
    // For MVP, we'll use a simplified approach
    
    // Find dominant frequencies using FFT (simplified)
    const frequencies = this.findDominantFrequencies(audioData, sampleRate);
    
    if (frequencies.length < 2) {
      return { chord: '', confidence: 0 };
    }

    return this.detectChordFromFrequencies(frequencies);
  }

  private findDominantFrequencies(audioData: Float32Array, sampleRate: number): number[] {
    // Simplified peak detection - in production, use proper FFT
    const frequencies: number[] = [];
    const threshold = 0.3; // Amplitude threshold

    // This is a simplified version - real implementation would use FFT
    // For now, return empty array as this requires more complex signal processing
    return frequencies;
  }

  getChordInfo(chordName: string): { notes: string[]; intervals: number[]; difficulty: string } | null {
    const chordData = this.chords[chordName];
    if (!chordData) return null;

    const difficulty = this.getChordDifficulty(chordName);
    
    return {
      notes: chordData.notes,
      intervals: chordData.intervals,
      difficulty,
    };
  }

  private getChordDifficulty(chordName: string): string {
    const beginnerChords = ['C', 'G', 'D', 'Em', 'Am', 'E', 'A'];
    const intermediateChords = ['Dm', 'F', 'Cm', 'Gm'];
    
    if (beginnerChords.includes(chordName)) return 'beginner';
    if (intermediateChords.includes(chordName)) return 'intermediate';
    return 'advanced';
  }

  getChordProgressionSuggestions(currentChord: string): string[] {
    const progressions: { [key: string]: string[] } = {
      'C': ['G', 'Am', 'F', 'Dm'],
      'G': ['C', 'D', 'Em', 'Am'],
      'D': ['G', 'A', 'Em', 'Bm'],
      'Am': ['C', 'F', 'Dm', 'E'],
      'Em': ['C', 'G', 'D', 'Am'],
      'F': ['C', 'G', 'Dm', 'Bb'],
      'E': ['A', 'B', 'C#m', 'F#m'],
      'A': ['D', 'E', 'Bm', 'F#m'],
    };

    return progressions[currentChord] || [];
  }
}
