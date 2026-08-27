export class PitchDetector {
  private sampleRate: number;

  constructor(sampleRate: number = 44100) {
    this.sampleRate = sampleRate;
  }

  // Autocorrelation-based pitch detection
  detectPitch(audioData: Float32Array): { frequency: number; note: string; confidence: number } {
    const bufferSize = audioData.length;
    const correlations = new Float32Array(bufferSize);

    // Calculate autocorrelation
    for (let lag = 0; lag < bufferSize; lag++) {
      let sum = 0;
      for (let i = 0; i < bufferSize - lag; i++) {
        sum += audioData[i] * audioData[i + lag];
      }
      correlations[lag] = sum;
    }

    // Find the first peak after the initial decay
    let maxCorrelation = 0;
    let bestLag = 0;
    let foundPeak = false;

    for (let lag = 1; lag < bufferSize / 2; lag++) {
      if (correlations[lag] > correlations[lag - 1] && correlations[lag] > correlations[lag + 1]) {
        if (!foundPeak || correlations[lag] > maxCorrelation) {
          maxCorrelation = correlations[lag];
          bestLag = lag;
          foundPeak = true;
        }
      }
    }

    if (!foundPeak || bestLag === 0) {
      return { frequency: 0, note: '', confidence: 0 };
    }

    // Calculate frequency
    const frequency = this.sampleRate / bestLag;

    // Calculate confidence based on correlation strength
    const confidence = maxCorrelation / correlations[0];

    // Convert frequency to note
    const note = this.frequencyToNote(frequency);

    return { frequency, note, confidence };
  }

  // Alternative: YIN algorithm (more accurate but more complex)
  detectPitchYIN(audioData: Float32Array): { frequency: number; note: string; confidence: number } {
    const bufferSize = audioData.length;
    const yinBuffer = new Float32Array(bufferSize / 2);
    const threshold = 0.15;

    // Step 1: Difference function
    for (let tau = 0; tau < bufferSize / 2; tau++) {
      let sum = 0;
      for (let i = 0; i < bufferSize / 2; i++) {
        const delta = audioData[i] - audioData[i + tau];
        sum += delta * delta;
      }
      yinBuffer[tau] = sum;
    }

    // Step 2: Cumulative mean normalized difference
    yinBuffer[0] = 1;
    let runningSum = 0;
    for (let tau = 1; tau < bufferSize / 2; tau++) {
      runningSum += yinBuffer[tau];
      yinBuffer[tau] *= tau / runningSum;
    }

    // Step 3: Absolute threshold
    let tauEstimate = -1;
    for (let tau = 2; tau < bufferSize / 2; tau++) {
      if (yinBuffer[tau] < threshold) {
        while (tau + 1 < bufferSize / 2 && yinBuffer[tau + 1] < yinBuffer[tau]) {
          tau++;
        }
        tauEstimate = tau;
        break;
      }
    }

    if (tauEstimate === -1 || yinBuffer[tauEstimate] >= threshold) {
      return { frequency: 0, note: '', confidence: 0 };
    }

    // Step 4: Parabolic interpolation
    const betterTau = tauEstimate - 0.5 * (yinBuffer[tauEstimate + 1] - yinBuffer[tauEstimate - 1]) /
      (yinBuffer[tauEstimate + 1] - 2 * yinBuffer[tauEstimate] + yinBuffer[tauEstimate - 1]);

    const frequency = this.sampleRate / betterTau;
    const confidence = 1 - yinBuffer[tauEstimate];
    const note = this.frequencyToNote(frequency);

    return { frequency, note, confidence };
  }

  frequencyToNote(frequency: number): string {
    if (frequency === 0) return '';

    const noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const a4 = 440;
    const c0 = a4 * Math.pow(2, -4.75);

    const halfSteps = Math.round(12 * Math.log2(frequency / c0));
    const octave = Math.floor(halfSteps / 12);
    const noteIndex = halfSteps % 12;

    if (noteIndex < 0 || noteIndex >= noteStrings.length) return '';

    return noteStrings[noteIndex] + octave;
  }

  noteToFrequency(note: string): number {
    const noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const noteName = note.slice(0, -1);
    const octave = parseInt(note.slice(-1));

    const noteIndex = noteStrings.indexOf(noteName);
    if (noteIndex === -1) return 0;

    const a4 = 440;
    const halfStepsFromA4 = (octave - 4) * 12 + (noteIndex - 9);
    return a4 * Math.pow(2, halfStepsFromA4 / 12);
  }

  // Guitar string frequencies (standard tuning)
  getGuitarStringFrequencies(): { [key: string]: number } {
    return {
      'E2': 82.41,
      'A2': 110.00,
      'D3': 146.83,
      'G3': 196.00,
      'B3': 246.94,
      'E4': 329.63,
    };
  }

  isGuitarNote(frequency: number, tolerance: number = 0.5): boolean {
    const stringFreqs = Object.values(this.getGuitarStringFrequencies());
    return stringFreqs.some(freq => Math.abs(frequency - freq) < tolerance);
  }
}
