export interface PerformanceMetrics {
  accuracy: number;
  pitch: number;
  timing: number;
  rhythm: number;
  chord: number;
  consistency: number;
  overall: number;
}

export interface DetailedPerformance {
  metrics: PerformanceMetrics;
  breakdown: {
    pitch: {
      correctNotes: number;
      incorrectNotes: number;
      missedNotes: number;
      averageConfidence: number;
    };
    timing: {
      earlyNotes: number;
      lateNotes: number;
      averageDeviation: number;
    };
    rhythm: {
      beatAccuracy: number;
      patternMatch: number;
      tempoConsistency: number;
    };
    chord: {
      correctChords: number;
      incorrectChords: number;
      chordTransitionTime: number;
    };
  };
}

export class PerformanceScorer {
  private weights: {
    accuracy: number;
    pitch: number;
    timing: number;
    rhythm: number;
    chord: number;
    consistency: number;
  };

  constructor(customWeights?: Partial<typeof this.weights>) {
    this.weights = {
      accuracy: 0.25,
      pitch: 0.20,
      timing: 0.20,
      rhythm: 0.15,
      chord: 0.10,
      consistency: 0.10,
      ...customWeights,
    };
  }

  calculateOverallScore(detected: any, expected: any): DetailedPerformance {
    const pitchScore = this.calculatePitchScore(detected.notes, expected.notes);
    const timingScore = this.calculateTimingScore(detected.timing, expected.timing);
    const rhythmScore = this.calculateRhythmScore(detected.rhythm, expected.rhythm);
    const chordScore = this.calculateChordScore(detected.chords, expected.chords);
    const consistencyScore = this.calculateConsistencyScore(detected.consistency);
    const accuracyScore = this.calculateAccuracyScore(detected, expected);

    const overall = this.calculateWeightedOverall({
      accuracy: accuracyScore,
      pitch: pitchScore.metrics.overall,
      timing: timingScore.metrics.overall,
      rhythm: rhythmScore.metrics.overall,
      chord: chordScore.metrics.overall,
      consistency: consistencyScore,
    });

    return {
      metrics: {
        accuracy: accuracyScore,
        pitch: pitchScore.metrics.overall,
        timing: timingScore.metrics.overall,
        rhythm: rhythmScore.metrics.overall,
        chord: chordScore.metrics.overall,
        consistency: consistencyScore,
        overall,
      },
      breakdown: {
        pitch: pitchScore.breakdown,
        timing: timingScore.breakdown,
        rhythm: rhythmScore.breakdown,
        chord: chordScore.breakdown,
      },
    };
  }

  private calculatePitchScore(detectedNotes: string[], expectedNotes: string[]): {
    metrics: { overall: number };
    breakdown: {
      correctNotes: number;
      incorrectNotes: number;
      missedNotes: number;
      averageConfidence: number;
    };
  } {
    let correctNotes = 0;
    let incorrectNotes = 0;
    let missedNotes = 0;

    const maxLength = Math.max(detectedNotes.length, expectedNotes.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < detectedNotes.length && i < expectedNotes.length) {
        if (detectedNotes[i] === expectedNotes[i]) {
          correctNotes++;
        } else {
          incorrectNotes++;
        }
      } else if (i < expectedNotes.length) {
        missedNotes++;
      }
    }

    const total = correctNotes + incorrectNotes + missedNotes;
    const overall = total > 0 ? (correctNotes / total) * 100 : 0;

    return {
      metrics: { overall },
      breakdown: {
        correctNotes,
        incorrectNotes,
        missedNotes,
        averageConfidence: 0.85, // Placeholder - would come from pitch detector
      },
    };
  }

  private calculateTimingScore(detectedTiming: any, expectedTiming: any): {
    metrics: { overall: number };
    breakdown: {
      earlyNotes: number;
      lateNotes: number;
      averageDeviation: number;
    };
  } {
    // Simplified timing calculation
    const earlyNotes = detectedTiming.early || 0;
    const lateNotes = detectedTiming.late || 0;
    const averageDeviation = detectedTiming.deviation || 0;

    const totalNotes = earlyNotes + lateNotes + (detectedTiming.correct || 0);
    const correctNotes = totalNotes - earlyNotes - lateNotes;
    const overall = totalNotes > 0 ? (correctNotes / totalNotes) * 100 : 0;

    return {
      metrics: { overall },
      breakdown: {
        earlyNotes,
        lateNotes,
        averageDeviation,
      },
    };
  }

  private calculateRhythmScore(detectedRhythm: any, expectedRhythm: any): {
    metrics: { overall: number };
    breakdown: {
      beatAccuracy: number;
      patternMatch: number;
      tempoConsistency: number;
    };
  } {
    const beatAccuracy = detectedRhythm.beatAccuracy || 80;
    const patternMatch = detectedRhythm.patternMatch || 75;
    const tempoConsistency = detectedRhythm.tempoConsistency || 85;

    const overall = (beatAccuracy + patternMatch + tempoConsistency) / 3;

    return {
      metrics: { overall },
      breakdown: {
        beatAccuracy,
        patternMatch,
        tempoConsistency,
      },
    };
  }

  private calculateChordScore(detectedChords: string[], expectedChords: string[]): {
    metrics: { overall: number };
    breakdown: {
      correctChords: number;
      incorrectChords: number;
      chordTransitionTime: number;
    };
  } {
    let correctChords = 0;
    let incorrectChords = 0;

    const maxLength = Math.max(detectedChords.length, expectedChords.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < detectedChords.length && i < expectedChords.length) {
        if (detectedChords[i] === expectedChords[i]) {
          correctChords++;
        } else {
          incorrectChords++;
        }
      }
    }

    const total = correctChords + incorrectChords;
    const overall = total > 0 ? (correctChords / total) * 100 : 0;

    return {
      metrics: { overall },
      breakdown: {
        correctChords,
        incorrectChords,
        chordTransitionTime: 1.2, // Placeholder - would be calculated from timing data
      },
    };
  }

  private calculateConsistencyScore(consistencyData: any): number {
    if (!consistencyData) return 75;

    const {
      timingConsistency = 75,
      volumeConsistency = 80,
      rhythmConsistency = 70,
    } = consistencyData;

    return (timingConsistency + volumeConsistency + rhythmConsistency) / 3;
  }

  private calculateAccuracyScore(detected: any, expected: any): number {
    // Overall accuracy based on multiple factors
    const noteAccuracy = this.calculateNoteAccuracy(detected.notes, expected.notes);
    const timingAccuracy = this.calculateTimingAccuracy(detected.timing, expected.timing);
    const rhythmAccuracy = this.calculateRhythmAccuracy(detected.rhythm, expected.rhythm);

    return (noteAccuracy + timingAccuracy + rhythmAccuracy) / 3;
  }

  private calculateNoteAccuracy(detectedNotes: string[], expectedNotes: string[]): number {
    if (expectedNotes.length === 0) return 100;

    let matches = 0;
    const minLength = Math.min(detectedNotes.length, expectedNotes.length);

    for (let i = 0; i < minLength; i++) {
      if (detectedNotes[i] === expectedNotes[i]) {
        matches++;
      }
    }

    return (matches / expectedNotes.length) * 100;
  }

  private calculateTimingAccuracy(detectedTiming: any, expectedTiming: any): number {
    if (!detectedTiming || !expectedTiming) return 75;

    const deviation = Math.abs(detectedTiming - expectedTiming);
    const tolerance = 0.1; // 100ms tolerance

    return Math.max(0, 100 - (deviation / tolerance) * 100);
  }

  private calculateRhythmAccuracy(detectedRhythm: any, expectedRhythm: any): number {
    if (!detectedRhythm || !expectedRhythm) return 75;

    return detectedRhythm.accuracy || 75;
  }

  private calculateWeightedOverall(scores: {
    accuracy: number;
    pitch: number;
    timing: number;
    rhythm: number;
    chord: number;
    consistency: number;
  }): number {
    return (
      scores.accuracy * this.weights.accuracy +
      scores.pitch * this.weights.pitch +
      scores.timing * this.weights.timing +
      scores.rhythm * this.weights.rhythm +
      scores.chord * this.weights.chord +
      scores.consistency * this.weights.consistency
    );
  }

  generatePerformanceGrade(score: number): string {
    if (score >= 95) return 'A+';
    if (score >= 90) return 'A';
    if (score >= 85) return 'A-';
    if (score >= 80) return 'B+';
    if (score >= 75) return 'B';
    if (score >= 70) return 'B-';
    if (score >= 65) return 'C+';
    if (score >= 60) return 'C';
    if (score >= 55) return 'C-';
    if (score >= 50) return 'D';
    return 'F';
  }

  generatePerformanceInsights(performance: DetailedPerformance): string[] {
    const insights: string[] = [];
    const { metrics, breakdown } = performance;

    if (metrics.pitch < 70) {
      insights.push("Focus on pitch accuracy - practice individual notes slowly.");
    }

    if (metrics.timing < 70) {
      insights.push("Work on timing - use a metronome during practice.");
    }

    if (metrics.rhythm < 70) {
      insights.push("Rhythm needs improvement - practice strumming patterns.");
    }

    if (metrics.chord < 70) {
      insights.push("Chord transitions need work - practice switching between chords.");
    }

    if (metrics.consistency < 70) {
      insights.push("Consistency is key - try to maintain steady timing and volume.");
    }

    if (breakdown.pitch.missedNotes > breakdown.pitch.correctNotes) {
      insights.push("You're missing many notes - slow down and focus on accuracy.");
    }

    if (breakdown.timing.earlyNotes > breakdown.timing.lateNotes) {
      insights.push("You tend to play early - try counting before playing.");
    } else if (breakdown.timing.lateNotes > breakdown.timing.earlyNotes) {
      insights.push("You tend to play late - anticipate the beat more.");
    }

    if (insights.length === 0) {
      insights.push("Great job! Keep practicing to maintain your skills.");
    }

    return insights;
  }

  setWeights(customWeights: Partial<typeof this.weights>): void {
    this.weights = { ...this.weights, ...customWeights };
  }

  getWeights(): typeof this.weights {
    return { ...this.weights };
  }
}
