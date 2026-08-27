export class RhythmDetector {
  private bpm: number;
  private beatHistory: number[] = [];
  private lastBeatTime: number = 0;

  constructor(bpm: number = 60) {
    this.bpm = bpm;
  }

  detectBeats(audioData: Float32Array, sampleRate: number): number[] {
    const beats: number[] = [];
    const threshold = 0.3; // Amplitude threshold for beat detection
    const minBeatInterval = (60 / this.bpm) * sampleRate * 0.5; // Minimum time between beats

    let lastBeatIndex = -minBeatInterval;

    for (let i = 1; i < audioData.length; i++) {
      const amplitude = Math.abs(audioData[i]);
      const previousAmplitude = Math.abs(audioData[i - 1]);

      // Detect peaks
      if (amplitude > threshold && amplitude > previousAmplitude) {
        if (i - lastBeatIndex > minBeatInterval) {
          const beatTime = i / sampleRate;
          beats.push(beatTime);
          lastBeatIndex = i;
        }
      }
    }

    return beats;
  }

  detectStrummingPattern(audioData: Float32Array, sampleRate: number): {
    pattern: string;
    confidence: number;
    downstrokes: number;
    upstrokes: number;
  } {
    const beats = this.detectBeats(audioData, sampleRate);
    
    if (beats.length < 2) {
      return { pattern: '', confidence: 0, downstrokes: 0, upstrokes: 0 };
    }

    // Analyze beat intervals to determine pattern
    const intervals: number[] = [];
    for (let i = 1; i < beats.length; i++) {
      intervals.push(beats[i] - beats[i - 1]);
    }

    // Classify as downstroke or upstroke based on interval timing
    const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const beatDuration = 60 / this.bpm;

    let downstrokes = 0;
    let upstrokes = 0;
    let pattern = '';

    // Simple pattern detection
    if (intervals.length >= 4) {
      const quarterNoteThreshold = beatDuration * 0.8;
      const eighthNoteThreshold = beatDuration * 0.4;

      for (const interval of intervals) {
        if (interval > quarterNoteThreshold) {
          downstrokes++;
          pattern += '↓ ';
        } else if (interval > eighthNoteThreshold) {
          upstrokes++;
          pattern += '↑ ';
        }
      }

      // Normalize pattern
      pattern = pattern.trim();
    }

    // Calculate confidence based on consistency
    const intervalVariance = this.calculateVariance(intervals);
    const confidence = Math.max(0, 1 - (intervalVariance / averageInterval));

    return { pattern, confidence, downstrokes, upstrokes };
  }

  calculateVariance(values: number[]): number {
    if (values.length === 0) return 0;

    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const squaredDifferences = values.map(value => Math.pow(value - mean, 2));
    return squaredDifferences.reduce((a, b) => a + b, 0) / values.length;
  }

  detectTempo(audioData: Float32Array, sampleRate: number): number {
    const beats = this.detectBeats(audioData, sampleRate);
    
    if (beats.length < 2) {
      return this.bpm;
    }

    // Calculate average interval between beats
    const intervals: number[] = [];
    for (let i = 1; i < beats.length; i++) {
      intervals.push(beats[i] - beats[i - 1]);
    }

    const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const detectedBpm = 60 / averageInterval;

    // Round to nearest reasonable BPM
    return Math.round(detectedBpm);
  }

  analyzeTimingConsistency(detectedBeats: number[], expectedBpm: number): {
    accuracy: number;
    earlyBeats: number;
    lateBeats: number;
    averageDeviation: number;
  } {
    if (detectedBeats.length < 2) {
      return { accuracy: 0, earlyBeats: 0, lateBeats: 0, averageDeviation: 0 };
    }

    const beatDuration = 60 / expectedBpm;
    let earlyBeats = 0;
    let lateBeats = 0;
    let totalDeviation = 0;

    for (let i = 1; i < detectedBeats.length; i++) {
      const actualInterval = detectedBeats[i] - detectedBeats[i - 1];
      const deviation = actualInterval - beatDuration;
      totalDeviation += Math.abs(deviation);

      if (deviation < -0.05) { // More than 50ms early
        earlyBeats++;
      } else if (deviation > 0.05) { // More than 50ms late
        lateBeats++;
      }
    }

    const averageDeviation = totalDeviation / (detectedBeats.length - 1);
    const totalBeats = detectedBeats.length - 1;
    const accurateBeats = totalBeats - earlyBeats - lateBeats;
    const accuracy = totalBeats > 0 ? (accurateBeats / totalBeats) * 100 : 0;

    return { accuracy, earlyBeats, lateBeats, averageDeviation };
  }

  detectMissedBeats(detectedBeats: number[], expectedBeats: number[], tolerance: number = 0.1): {
    missed: number;
    extra: number;
    accuracy: number;
  } {
    let missed = 0;
    let extra = 0;

    // Check for missed expected beats
    for (const expectedTime of expectedBeats) {
      const matched = detectedBeats.some(detectedTime => 
        Math.abs(detectedTime - expectedTime) < tolerance
      );
      if (!matched) {
        missed++;
      }
    }

    // Check for extra detected beats
    for (const detectedTime of detectedBeats) {
      const matched = expectedBeats.some(expectedTime => 
        Math.abs(detectedTime - expectedTime) < tolerance
      );
      if (!matched) {
        extra++;
      }
    }

    const totalExpected = expectedBeats.length;
    const accuracy = totalExpected > 0 ? ((totalExpected - missed) / totalExpected) * 100 : 0;

    return { missed, extra, accuracy };
  }

  generateExpectedBeats(duration: number, bpm: number, beatsPerMeasure: number = 4): number[] {
    const beatDuration = 60 / bpm;
    const beats: number[] = [];

    for (let i = 0; i < duration / beatDuration; i++) {
      beats.push(i * beatDuration);
    }

    return beats;
  }

  setBpm(bpm: number): void {
    this.bpm = bpm;
  }

  getBpm(): number {
    return this.bpm;
  }
}
