import { DetailedPerformance, PerformanceScorer } from './performanceScorer';

export interface FeedbackMessage {
  type: 'success' | 'improvement' | 'critical';
  message: string;
  priority: number;
}

export class FeedbackEngine {
  private performanceScorer: PerformanceScorer;

  constructor() {
    this.performanceScorer = new PerformanceScorer();
  }

  generateFeedback(performance: DetailedPerformance, exerciseType: string): FeedbackMessage[] {
    const feedback: FeedbackMessage[] = [];
    const { metrics, breakdown } = performance;

    // Overall performance feedback
    if (metrics.overall >= 90) {
      feedback.push({
        type: 'success',
        message: "Excellent performance! You're showing great progress.",
        priority: 1,
      });
    } else if (metrics.overall >= 75) {
      feedback.push({
        type: 'success',
        message: "Good job! Keep practicing to improve further.",
        priority: 2,
      });
    } else if (metrics.overall >= 60) {
      feedback.push({
        type: 'improvement',
        message: "You're making progress, but there's room for improvement.",
        priority: 3,
      });
    } else {
      feedback.push({
        type: 'critical',
        message: "Let's focus on fundamentals. Slow down and practice each element carefully.",
        priority: 1,
      });
    }

    // Exercise-specific feedback
    switch (exerciseType) {
      case 'chord':
        feedback.push(...this.generateChordFeedback(metrics, breakdown));
        break;
      case 'note':
        feedback.push(...this.generateNoteFeedback(metrics, breakdown));
        break;
      case 'rhythm':
        feedback.push(...this.generateRhythmFeedback(metrics, breakdown));
        break;
      case 'switching':
        feedback.push(...this.generateSwitchingFeedback(metrics, breakdown));
        break;
      case 'song':
        feedback.push(...this.generateSongFeedback(metrics, breakdown));
        break;
      default:
        feedback.push(...this.generateGeneralFeedback(metrics, breakdown));
    }

    // Sort by priority
    return feedback.sort((a, b) => a.priority - b.priority);
  }

  private generateChordFeedback(metrics: any, breakdown: any): FeedbackMessage[] {
    const feedback: FeedbackMessage[] = [];

    if (metrics.chord < 70) {
      feedback.push({
        type: 'improvement',
        message: "Focus on clean chord fingering. Make sure each string rings clearly.",
        priority: 2,
      });
    }

    if (breakdown.chord.incorrectChords > breakdown.chord.correctChords) {
      feedback.push({
        type: 'critical',
        message: "Many incorrect chords detected. Practice each chord shape slowly before attempting transitions.",
        priority: 1,
      });
    }

    if (breakdown.chord.chordTransitionTime > 2.0) {
      feedback.push({
        type: 'improvement',
        message: "Chord transitions are slow. Practice moving between two chords repeatedly.",
        priority: 3,
      });
    }

    if (metrics.pitch < 70) {
      feedback.push({
        type: 'improvement',
        message: "Check your finger placement. Press firmly just behind the frets.",
        priority: 2,
      });
    }

    return feedback;
  }

  private generateNoteFeedback(metrics: any, breakdown: any): FeedbackMessage[] {
    const feedback: FeedbackMessage[] = [];

    if (metrics.pitch < 70) {
      feedback.push({
        type: 'improvement',
        message: "Work on individual note accuracy. Practice slowly and focus on pitch.",
        priority: 2,
      });
    }

    if (breakdown.pitch.missedNotes > breakdown.pitch.correctNotes) {
      feedback.push({
        type: 'critical',
        message: "You're missing many notes. Slow down and focus on hitting each note clearly.",
        priority: 1,
      });
    }

    if (breakdown.pitch.averageConfidence < 0.7) {
      feedback.push({
        type: 'improvement',
        message: "Your notes aren't sounding clear. Check your fretting hand position.",
        priority: 3,
      });
    }

    if (metrics.timing < 70) {
      feedback.push({
        type: 'improvement',
        message: "Timing needs work. Try practicing with a metronome at a slower tempo.",
        priority: 2,
      });
    }

    return feedback;
  }

  private generateRhythmFeedback(metrics: any, breakdown: any): FeedbackMessage[] {
    const feedback: FeedbackMessage[] = [];

    if (metrics.rhythm < 70) {
      feedback.push({
        type: 'improvement',
        message: "Rhythm needs improvement. Focus on the strumming pattern.",
        priority: 2,
      });
    }

    if (breakdown.rhythm.beatAccuracy < 70) {
      feedback.push({
        type: 'critical',
        message: "Beat accuracy is low. Practice counting out loud while strumming.",
        priority: 1,
      });
    }

    if (breakdown.rhythm.patternMatch < 70) {
      feedback.push({
        type: 'improvement',
        message: "Strumming pattern doesn't match. Practice the pattern slowly without chord changes.",
        priority: 2,
      });
    }

    if (breakdown.rhythm.tempoConsistency < 70) {
      feedback.push({
        type: 'improvement',
        message: "Tempo is inconsistent. Use a metronome to maintain steady timing.",
        priority: 3,
      });
    }

    return feedback;
  }

  private generateSwitchingFeedback(metrics: any, breakdown: any): FeedbackMessage[] {
    const feedback: FeedbackMessage[] = [];

    if (metrics.chord < 70) {
      feedback.push({
        type: 'improvement',
        message: "Chord switching needs work. Practice specific transitions slowly.",
        priority: 2,
      });
    }

    if (breakdown.chord.chordTransitionTime > 1.5) {
      feedback.push({
        type: 'improvement',
        message: "Transitions are taking too long. Practice 'economy of motion' - move fingers efficiently.",
        priority: 2,
      });
    }

    if (metrics.timing < 70) {
      feedback.push({
        type: 'improvement',
        message: "Timing during transitions is off. Practice transitioning in rhythm with a metronome.",
        priority: 3,
      });
    }

    if (breakdown.timing.earlyNotes > breakdown.timing.lateNotes) {
      feedback.push({
        type: 'improvement',
        message: "You're rushing transitions. Take your time and aim for clean changes.",
        priority: 2,
      });
    }

    return feedback;
  }

  private generateSongFeedback(metrics: any, breakdown: any): FeedbackMessage[] {
    const feedback: FeedbackMessage[] = [];

    if (metrics.overall < 70) {
      feedback.push({
        type: 'improvement',
        message: "Let's break this song down into smaller sections and practice each part.",
        priority: 1,
      });
    }

    if (metrics.rhythm < 70) {
      feedback.push({
        type: 'improvement',
        message: "Song rhythm needs work. Practice the chord progression without worrying about the melody.",
        priority: 2,
      });
    }

    if (metrics.chord < 70) {
      feedback.push({
        type: 'improvement',
        message: "Chord changes in the song need practice. Work on the difficult transitions separately.",
        priority: 2,
      });
    }

    if (metrics.consistency < 70) {
      feedback.push({
        type: 'improvement',
        message: "Consistency throughout the song varies. Try to maintain steady tempo and dynamics.",
        priority: 3,
      });
    }

    if (metrics.overall >= 85) {
      feedback.push({
        type: 'success',
        message: "Great song performance! You're ready to try playing along with the original recording.",
        priority: 2,
      });
    }

    return feedback;
  }

  private generateGeneralFeedback(metrics: any, breakdown: any): FeedbackMessage[] {
    const feedback: FeedbackMessage[] = [];

    if (metrics.pitch < 70) {
      feedback.push({
        type: 'improvement',
        message: "Work on pitch accuracy. Practice notes slowly and clearly.",
        priority: 2,
      });
    }

    if (metrics.timing < 70) {
      feedback.push({
        type: 'improvement',
        message: "Timing needs attention. Use a metronome during practice.",
        priority: 2,
      });
    }

    if (metrics.rhythm < 70) {
      feedback.push({
        type: 'improvement',
        message: "Rhythm could be improved. Focus on steady timing.",
        priority: 3,
      });
    }

    if (metrics.consistency < 70) {
      feedback.push({
        type: 'improvement',
        message: "Work on consistency. Try to maintain the same quality throughout.",
        priority: 3,
      });
    }

    return feedback;
  }

  generateAdaptiveRecommendations(performance: DetailedPerformance, practiceHistory: DetailedPerformance[]): {
    recommendedExercise: string;
    recommendedTempo: number;
    focusAreas: string[];
    reasoning: string;
  } {
    const { metrics } = performance;
    const focusAreas: string[] = [];

    // Identify weak areas
    if (metrics.pitch < 70) focusAreas.push('pitch');
    if (metrics.timing < 70) focusAreas.push('timing');
    if (metrics.rhythm < 70) focusAreas.push('rhythm');
    if (metrics.chord < 70) focusAreas.push('chords');
    if (metrics.consistency < 70) focusAreas.push('consistency');

    // Determine recommended exercise
    let recommendedExercise = 'general_practice';
    let recommendedTempo = 60;
    let reasoning = 'Continue general practice to build overall skills.';

    if (focusAreas.includes('chords')) {
      recommendedExercise = 'chord_transitions';
      recommendedTempo = 50;
      reasoning = 'Focus on chord transitions at a slower tempo to build muscle memory.';
    } else if (focusAreas.includes('rhythm')) {
      recommendedExercise = 'rhythm_training';
      recommendedTempo = 60;
      reasoning = 'Work on rhythm fundamentals with simple strumming patterns.';
    } else if (focusAreas.includes('pitch')) {
      recommendedExercise = 'note_accuracy';
      recommendedTempo = 70;
      reasoning = 'Practice individual notes to improve pitch accuracy.';
    } else if (focusAreas.includes('timing')) {
      recommendedExercise = 'metronome_practice';
      recommendedTempo = 50;
      reasoning = 'Use a metronome at a slow tempo to improve timing precision.';
    }

    // Adjust tempo based on overall performance
    if (metrics.overall >= 90) {
      recommendedTempo = Math.min(recommendedTempo + 10, 120);
      reasoning = 'You\'re doing well! Try increasing the tempo slightly.';
    } else if (metrics.overall < 60) {
      recommendedTempo = Math.max(recommendedTempo - 10, 40);
      reasoning = 'Slow down to focus on accuracy and build confidence.';
    }

    return {
      recommendedExercise,
      recommendedTempo,
      focusAreas,
      reasoning,
    };
  }

  generateProgressReport(currentPerformance: DetailedPerformance, previousPerformances: DetailedPerformance[]): {
    trend: 'improving' | 'stable' | 'declining';
    areasImproved: string[];
    areasNeedingWork: string[];
    motivationMessage: string;
  } {
    if (previousPerformances.length === 0) {
      return {
        trend: 'stable',
        areasImproved: [],
        areasNeedingWork: [],
        motivationMessage: "Keep practicing! Your first performance gives us a baseline to track improvement.",
      };
    }

    const previous = previousPerformances[previousPerformances.length - 1];
    const current = currentPerformance;

    const areasImproved: string[] = [];
    const areasNeedingWork: string[] = [];

    // Compare metrics
    if (current.metrics.pitch > previous.metrics.pitch + 5) areasImproved.push('pitch');
    else if (current.metrics.pitch < previous.metrics.pitch - 5) areasNeedingWork.push('pitch');

    if (current.metrics.timing > previous.metrics.timing + 5) areasImproved.push('timing');
    else if (current.metrics.timing < previous.metrics.timing - 5) areasNeedingWork.push('timing');

    if (current.metrics.rhythm > previous.metrics.rhythm + 5) areasImproved.push('rhythm');
    else if (current.metrics.rhythm < previous.metrics.rhythm - 5) areasNeedingWork.push('rhythm');

    if (current.metrics.chord > previous.metrics.chord + 5) areasImproved.push('chords');
    else if (current.metrics.chord < previous.metrics.chord - 5) areasNeedingWork.push('chords');

    // Determine trend
    const overallChange = current.metrics.overall - previous.metrics.overall;
    let trend: 'improving' | 'stable' | 'declining' = 'stable';
    if (overallChange > 5) trend = 'improving';
    else if (overallChange < -5) trend = 'declining';

    // Generate motivation message
    let motivationMessage = '';
    if (trend === 'improving') {
      motivationMessage = areasImproved.length > 0
        ? `Great progress! You've improved in: ${areasImproved.join(', ')}. Keep up the excellent work!`
        : "You're showing overall improvement. Keep practicing to maintain this momentum!";
    } else if (trend === 'declining') {
      motivationMessage = areasNeedingWork.length > 0
        ? `Don't get discouraged. Focus on: ${areasNeedingWork.join(', ')}. Progress takes time!`
        : "Every practice session is valuable. Stay consistent and you'll see improvement.";
    } else {
      motivationMessage = areasImproved.length > 0
        ? `You're improving in ${areasImproved.join(', ')}. Keep working on the other areas!`
        : "Steady progress! Consistency is key to continued improvement.";
    }

    return {
      trend,
      areasImproved,
      areasNeedingWork,
      motivationMessage,
    };
  }
}
