import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import StudentDashboard from './pages/StudentDashboard'
import TeacherDashboard from './pages/TeacherDashboard'
import AdminDashboard from './pages/AdminDashboard'
import LearningPath from './pages/LearningPath'
import LessonPage from './pages/LessonPage'
import PracticeMode from './pages/PracticeMode'
import ChordLibrary from './pages/ChordLibrary'
import GuitarTuner from './pages/GuitarTuner'
import Metronome from './pages/Metronome'
import StudentProfile from './pages/StudentProfile'
import TeacherProfile from './pages/TeacherProfile'
import OnboardingFlow from './pages/OnboardingFlow'
import { useAuthStore } from './store/authStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { user, isAuthenticated } = useAuthStore()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }
  
  return <>{children}</>
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Student routes */}
          <Route 
            path="/onboarding" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <OnboardingFlow />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/learning-path" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <LearningPath />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/lesson/:id" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <LessonPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/practice/:exerciseId" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <PracticeMode />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chords" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <ChordLibrary />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tuner" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <GuitarTuner />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/metronome" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Metronome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentProfile />
              </ProtectedRoute>
            } 
          />
          
          {/* Teacher routes */}
          <Route 
            path="/teacher/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                <TeacherDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/teacher/profile" 
            element={
              <ProtectedRoute allowedRoles={['teacher']}>
                <TeacherProfile />
              </ProtectedRoute>
            } 
          />
          
          {/* Admin routes */}
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
