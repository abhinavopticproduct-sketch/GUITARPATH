// Shared types between frontend and backend

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

export interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  thumbnail: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
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
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

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
