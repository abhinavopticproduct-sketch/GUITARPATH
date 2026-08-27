// User types
export type UserRole = 'student' | 'teacher' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  level: string;
  xp: number;
  streak: number;
  totalPracticeMinutes: number;
  guitarType: 'acoustic' | 'electric' | 'classical';
  experienceLevel: 'never' | 'little' | 'beginner' | 'intermediate';
  learningGoal: string;
  practiceGoal: number;
  completedOnboarding: boolean;
}

export interface TeacherProfile {
  id: string;
  userId: string;
  bio: string;
  experience: string;
  specialization: string;
  studentCount: number;
}

// Course types
export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  thumbnail: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  content: string;
  videoUrl: string;
  order: number;
  duration: number;
  chordDiagram?: ChordDiagram;
  exercise?: Exercise;
  quiz?: Quiz;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChordDiagram {
  strings: string[];
  frets: number[][];
  fingerNumbers: number[][];
  name: string;
}

export interface Exercise {
  id: string;
  lessonId: string;
  type: 'chord' | 'note' | 'rhythm' | 'switching' | 'song';
  title: string;
  instructions: string;
  targetChord?: string;
  targetNote?: string;
  chordProgression?: string[];
  bpm?: number;
  duration: number;
  passingScore: number;
}

export interface Quiz {
  id: string;
  lessonId: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

// Practice types
export interface PracticeSession {
  id: string;
  studentId: string;
  lessonId: string;
  exerciseId: string;
  startTime: string;
  endTime: string;
  duration: number;
  accuracy: number;
  pitchScore: number;
  timingScore: number;
  rhythmScore: number;
  chordScore: number;
  overallScore: number;
  detectedNotes: string[];
  expectedNotes: string[];
  detectedChord?: string;
  expectedChord?: string;
  confidence: number;
}

export interface PerformanceResult {
  accuracy: number;
  pitch: number;
  timing: number;
  rhythm: number;
  chord: number;
  consistency: number;
  overall: number;
  feedback: string;
}

// Progress types
export interface StudentProgress {
  id: string;
  studentId: string;
  courseId: string;
  lessonId: string;
  completed: boolean;
  progress: number;
  lastAccessed: string;
  completedAt?: string;
}

// Assignment types
export interface Assignment {
  id: string;
  teacherId: string;
  classId: string;
  title: string;
  description: string;
  exerciseId: string;
  targetAccuracy: number;
  deadline: string;
  createdAt: string;
}

export interface AssignmentStatus {
  assignmentId: string;
  studentId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  submittedAt?: string;
  score?: number;
}

// Class types
export interface Class {
  id: string;
  teacherId: string;
  name: string;
  description: string;
  schedule: string;
  studentCount: number;
  createdAt: string;
}

export interface ClassMember {
  id: string;
  classId: string;
  studentId: string;
  joinedAt: string;
}

// Feedback types
export interface TeacherFeedback {
  id: string;
  teacherId: string;
  studentId: string;
  practiceSessionId: string;
  comment: string;
  createdAt: string;
}

// Achievement types
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpReward: number;
  requirement: string;
}

export interface StudentAchievement {
  id: string;
  studentId: string;
  achievementId: string;
  unlockedAt: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'assignment' | 'feedback' | 'class' | 'lesson' | 'reminder' | 'achievement';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Chord library types
export interface Chord {
  name: string;
  variation: string;
  strings: string[];
  frets: number[][];
  fingers: number[][];
  notes: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Scale types
export interface Scale {
  name: string;
  type: 'major' | 'minor' | 'pentatonic' | 'blues';
  notes: string[];
  intervals: number[];
  pattern: number[];
}

// Song types
export interface Song {
  id: string;
  title: string;
  artist: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  bpm: number;
  chords: string[];
  chordProgression: string[][];
  strummingPattern: string;
  duration: number;
  thumbnail: string;
}

// Live class types
export interface LiveClass {
  id: string;
  classId: string;
  teacherId: string;
  title: string;
  scheduledTime: string;
  duration: number;
  meetingLink?: string;
  status: 'scheduled' | 'live' | 'ended';
  createdAt: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Audio analysis types
export interface AudioAnalysisResult {
  pitch: number;
  note: string;
  confidence: number;
  timestamp: number;
}

export interface ChordDetectionResult {
  chord: string;
  confidence: number;
  timestamp: number;
}

export interface TimingAnalysisResult {
  timing: number;
  early: boolean;
  late: boolean;
  beat: number;
}
