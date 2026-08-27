import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, StudentProfile, TeacherProfile } from '@types/index';

interface AuthState {
  user: User | null;
  studentProfile: StudentProfile | null;
  teacherProfile: TeacherProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setAuth: (user: User, token: string) => void;
  setStudentProfile: (profile: StudentProfile) => void;
  setTeacherProfile: (profile: TeacherProfile) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      studentProfile: null,
      teacherProfile: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      
      setAuth: (user, token) => set({ 
        user, 
        token, 
        isAuthenticated: true 
      }),
      
      setStudentProfile: (profile) => set({ studentProfile: profile }),
      
      setTeacherProfile: (profile) => set({ teacherProfile: profile }),
      
      logout: () => set({ 
        user: null, 
        studentProfile: null, 
        teacherProfile: null,
        token: null, 
        isAuthenticated: false 
      }),
      
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: 'guitarpath-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        studentProfile: state.studentProfile,
        teacherProfile: state.teacherProfile,
      }),
    }
  )
);
