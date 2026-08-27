import { PitchDetector } from './pitchDetector';

export class NoteDetector {
  private pitchDetector: PitchDetector;

  constructor(sampleRate: number = 44100) {
    this.pitchDetector = new PitchDetector(sampleRate);
  }

  detectNotes(audioData: Float32Array, duration: number): Array<{ note: string; startTime: number; duration: number; confidence: number }> {
    const detectedNotes: Array<{ note: string; startTime: number; duration: number; confidence: number }> = [];
    const sampleRate = 44100;
    const windowSize = 2048; // Analysis window size
    const hopSize = 1024; // Hop size between windows

    let currentNote: string | null = null;
    let noteStartTime = 0;
    let noteConfidences: number[] = [];

    for (let i = 0; i < audioData.length - windowSize; i += hopSize) {
      const window = audioData.slice(i, i + windowSize);
      const { note, confidence } = this.pitchDetector.detectPitch(window);
      const currentTime = (i / audioData.length) * duration;

      if (note && confidence > 0.7) {
        if (currentNote === null) {
          currentNote = note;
          noteStartTime = currentTime;
          noteConfidences = [confidence];
        } else if (note === currentNote) {
          noteConfidences.push(confidence);
        } else {
          // Note changed
          if (currentNote) {
            const avgConfidence = noteConfidences.reduce((a, b) => a + b, 0) / noteConfidences.length;
            detectedNotes.push({
              note: currentNote,
              startTime: noteStartTime,
              duration: currentTime - noteStartTime,
              confidence: avgConfidence,
            });
          }
          currentNote = note;
          noteStartTime = currentTime;
          noteConfidences = [confidence];
        }
      } else if (currentNote !== null) {
        // Note ended
        const avgConfidence = noteConfidences.reduce((a, b) => a + b, 0) / noteConfidences.length;
        detectedNotes.push({
          note: currentNote,
          startTime: noteStartTime,
          duration: currentTime - noteStartTime,
          confidence: avgConfidence,
        });
        currentNote = null;
        noteConfidences = [];
      }
    }

    // Handle final note
    if (currentNote !== null && noteConfidences.length > 0) {
      const avgConfidence = noteConfidences.reduce((a, b) => a + b, 0) / noteConfidences.length;
      detectedNotes.push({
        note: currentNote,
        startTime: noteStartTime,
        duration: duration - noteStartTime,
        confidence: avgConfidence,
      });
    }

    return detectedNotes;
  }

  compareNotes(detectedNotes: string[], expectedNotes: string[]): {
    correct: number;
    incorrect: number;
    missed: number;
    accuracy: number;
  } {
    let correct = 0;
    let incorrect = 0;
    let missed = 0;

    // Simple comparison - can be improved with timing consideration
    const maxLength = Math.max(detectedNotes.length, expectedNotes.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < detectedNotes.length && i < expectedNotes.length) {
        if (detectedNotes[i] === expectedNotes[i]) {
          correct++;
        } else {
          incorrect++;
        }
      } else if (i < expectedNotes.length) {
        missed++;
      }
    }

    const total = correct + incorrect + missed;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;

    return { correct, incorrect, missed, accuracy };
  }

  filterGuitarNotes(notes: string[]): string[] {
    const guitarStrings = ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'];
    const validNotes = new Set<string>();

    guitarStrings.forEach(string => {
      const freq = this.pitchDetector.noteToFrequency(string);
      // Add notes within reasonable range of guitar strings
      for (let octave = 2; octave <= 6; octave++) {
        validNotes.add(`E${octave}`);
        validNotes.add(`A${octave}`);
        validNotes.add(`D${octave}`);
        validNotes.add(`G${octave}`);
        validNotes.add(`B${octave}`);
      }
    });

    return notes.filter(note => validNotes.has(note));
  }
}
