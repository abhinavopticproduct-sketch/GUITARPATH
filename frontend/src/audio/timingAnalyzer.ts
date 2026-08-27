export class TimingAnalyzer {
  private expectedBpm: number;
  private tolerance: number; // in seconds

  constructor(expectedBpm: number = 60, tolerance: number = 0.1) {
    this.expectedBpm = expectedBpm;
    this.tolerance = tolerance;
  }

  analyzeNoteTiming(detectedNotes: Array<{ note: string; startTime: number }>, expectedNotes: Array<{ note: string; startTime: number }>): {
    accuracy: number;
    earlyNotes: number;
    lateNotes: number;
    missedNotes: number;
    extraNotes: number;
    averageDeviation: number;
  } {
    let earlyNotes = 0;
    let lateNotes = 0;
    let missedNotes = 0;
    let extraNotes = 0;
    let totalDeviation = 0;
    let matchedNotes = 0;

    // Check each expected note
    for (const expected of expectedNotes) {
      const matched = detectedNotes.find(detected => 
        detected.note === expected.note && 
        Math.abs(detected.startTime - expected.startTime) < this.tolerance
      );

      if (matched) {
        const deviation = matched.startTime - expected.startTime;
        totalDeviation += Math.abs(deviation);
        matchedNotes++;

        if (deviation < -0.05) {
          earlyNotes++;
        } else if (deviation > 0.05) {
          lateNotes++;
        }
      } else {
        missedNotes++;
      }
    }

    // Check for extra notes
    for (const detected of detectedNotes) {
      const matched = expectedNotes.find(expected => 
        expected.note === detected.note && 
        Math.abs(detected.startTime - expected.startTime) < this.tolerance
      );

      if (!matched) {
        extraNotes++;
      }
    }

    const averageDeviation = matchedNotes > 0 ? totalDeviation / matchedNotes : 0;
    const totalExpected = expectedNotes.length;
    const accuracy = totalExpected > 0 ? ((totalExpected - missedNotes) / totalExpected) * 100 : 0;

    return {
      accuracy,
      earlyNotes,
      lateNotes,
      missedNotes,
      extraNotes,
      averageDeviation,
    };
  }

  analyzeChordSwitchingTiming(detectedChords: Array<{ chord: string; startTime: number }>, expectedChords: Array<{ chord: string; startTime: number }>): {
    averageSwitchTime: number;
    fastestSwitch: number;
    slowestSwitch: number;
    accuracy: number;
  } {
    const switchTimes: number[] = [];
    let correctSwitches = 0;
    let totalSwitches = 0;

    for (let i = 1; i < detectedChords.length; i++) {
      const currentChord = detectedChords[i];
      const previousChord = detectedChords[i - 1];

      if (currentChord.chord !== previousChord.chord) {
        const switchTime = currentChord.startTime - previousChord.startTime;
        switchTimes.push(switchTime);
        totalSwitches++;

        // Check if this matches expected
        const expectedIndex = expectedChords.findIndex(
          expected => expected.chord === currentChord.chord
        );

        if (expectedIndex !== -1) {
          correctSwitches++;
        }
      }
    }

    if (switchTimes.length === 0) {
      return {
        averageSwitchTime: 0,
        fastestSwitch: 0,
        slowestSwitch: 0,
        accuracy: 0,
      };
    }

    const averageSwitchTime = switchTimes.reduce((a, b) => a + b, 0) / switchTimes.length;
    const fastestSwitch = Math.min(...switchTimes);
    const slowestSwitch = Math.max(...switchTimes);
    const accuracy = totalSwitches > 0 ? (correctSwitches / totalSwitches) * 100 : 0;

    return {
      averageSwitchTime,
      fastestSwitch,
      slowestSwitch,
      accuracy,
    };
  }

  analyzeRhythmConsistency(detectedBeats: number[], expectedBpm: number): {
    consistency: number;
    variance: number;
    standardDeviation: number;
  } {
    if (detectedBeats.length < 2) {
      return { consistency: 0, variance: 0, standardDeviation: 0 };
    }

    const expectedInterval = 60 / expectedBpm;
    const intervals: number[] = [];

    for (let i = 1; i < detectedBeats.length; i++) {
      intervals.push(detectedBeats[i] - detectedBeats[i - 1]);
    }

    const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - mean, 2), 0) / intervals.length;
    const standardDeviation = Math.sqrt(variance);

    // Consistency is inverse of normalized variance
    const normalizedVariance = variance / Math.pow(expectedInterval, 2);
    const consistency = Math.max(0, 1 - normalizedVariance);

    return {
      consistency,
      variance,
      standardDeviation,
    };
  }

  calculateNoteDuration(detectedNotes: Array<{ startTime: number; endTime?: number }>, audioDuration: number): Array<{ note: string; duration: number }> {
    return detectedNotes.map((note, index) => {
      const endTime = note.endTime || (index < detectedNotes.length - 1 ? detectedNotes[index + 1].startTime : audioDuration);
      return {
        note: note.note,
        duration: endTime - note.startTime,
      };
    });
  }

  detectNoteSustain(detectedNotes: Array<{ startTime: number; endTime?: number }>, expectedDuration: number): {
    averageSustain: number;
    tooShort: number;
    tooLong: number;
    accuracy: number;
  } {
    const noteDurations = this.calculateNoteDuration(detectedNotes, expectedDuration);
    
    if (noteDurations.length === 0) {
      return { averageSustain: 0, tooShort: 0, tooLong: 0, accuracy: 0 };
    }

    let tooShort = 0;
    let tooLong = 0;
    const tolerance = 0.2; // 20% tolerance

    for (const note of noteDurations) {
      const ratio = note.duration / expectedDuration;
      if (ratio < 1 - tolerance) {
        tooShort++;
      } else if (ratio > 1 + tolerance) {
        tooLong++;
      }
    }

    const averageSustain = noteDurations.reduce((sum, note) => sum + note.duration, 0) / noteDurations.length;
    const accurateNotes = noteDurations.length - tooShort - tooLong;
    const accuracy = noteDurations.length > 0 ? (accurateNotes / noteDurations.length) * 100 : 0;

    return {
      averageSustain,
      tooShort,
      tooLong,
      accuracy,
    };
  }

  generateTimingFeedback(timingAnalysis: {
    accuracy: number;
    earlyNotes: number;
    lateNotes: number;
    averageDeviation: number;
  }): string {
    if (timingAnalysis.accuracy > 90) {
      return "Excellent timing! Your rhythm is very consistent.";
    } else if (timingAnalysis.accuracy > 75) {
      if (timingAnalysis.earlyNotes > timingAnalysis.lateNotes) {
        return "Good timing, but try to wait slightly longer before playing each note.";
      } else if (timingAnalysis.lateNotes > timingAnalysis.earlyNotes) {
        return "Good timing, but try to play each note a bit sooner.";
      } else {
        return "Good timing overall. Focus on maintaining consistency.";
      }
    } else if (timingAnalysis.accuracy > 50) {
      return "Your timing needs some work. Try practicing with a metronome at a slower tempo.";
    } else {
      return "Significant timing issues detected. Start with simple exercises at a very slow tempo.";
    }
  }

  setExpectedBpm(bpm: number): void {
    this.expectedBpm = bpm;
  }

  setTolerance(tolerance: number): void {
    this.tolerance = tolerance;
  }
}
