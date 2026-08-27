// Guitar string frequencies (standard tuning)
export const GUITAR_STRINGS = {
  E2: 82.41,
  A2: 110.00,
  D3: 146.83,
  G3: 196.00,
  B3: 246.94,
  E4: 329.63,
};

// Note names
export const NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Practice difficulty levels
export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
};

// XP rewards
export const XP_REWARDS = {
  LESSON_COMPLETE: 50,
  EXERCISE_COMPLETE: 25,
  PERFECT_SCORE: 50,
  DAILY_PRACTICE: 10,
  STREAK_BONUS: 5,
};

// Level thresholds
export const LEVEL_THRESHOLDS = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
  6: 2000,
  7: 3500,
  8: 5000,
  9: 7500,
  10: 10000,
};

// Audio settings
export const AUDIO_SETTINGS = {
  SAMPLE_RATE: 44100,
  FFT_SIZE: 2048,
  SMOOTHING_TIME_CONSTANT: 0.8,
  MIN_CONFIDENCE: 0.7,
};

// Practice session defaults
export const PRACTICE_DEFAULTS = {
  MIN_DURATION: 10, // seconds
  MAX_DURATION: 300, // seconds (5 minutes)
  DEFAULT_BPM: 60,
  MIN_BPM: 40,
  MAX_BPM: 200,
};

// Chord definitions for display
export const CHORD_SHAPES = {
  C: {
    strings: ['X', '3', '2', '0', '1', '0'],
    fingers: [0, 3, 2, 0, 1, 0],
  },
  G: {
    strings: ['3', '2', '0', '0', '0', '3'],
    fingers: [3, 2, 0, 0, 0, 3],
  },
  D: {
    strings: ['X', 'X', '0', '2', '3', '2'],
    fingers: [0, 0, 0, 1, 3, 2],
  },
  Em: {
    strings: ['0', '2', '2', '0', '0', '0'],
    fingers: [0, 2, 3, 0, 0, 0],
  },
  Am: {
    strings: ['X', '0', '2', '2', '1', '0'],
    fingers: [0, 0, 2, 3, 1, 0],
  },
  E: {
    strings: ['0', '2', '2', '1', '0', '0'],
    fingers: [0, 2, 3, 1, 0, 0],
  },
  A: {
    strings: ['X', '0', '2', '2', '2', '0'],
    fingers: [0, 0, 2, 3, 4, 0],
  },
};
