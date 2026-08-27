import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@store/authStore';
import { studentService } from '@services/studentService';

export default function StudentDashboard() {
  const { user } = useAuthStore();
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    studentService.getStudentAnalytics(user.id).then(setAnalytics).catch(() => setAnalytics(null));
  }, [user]);

  const averageScore = Math.round(analytics?.averageScore || 0);

  return (
    <div className="min-h-screen bg-charcoal-950">
      {/* Header */}
      <header className="glass-effect border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-display font-bold text-cream-100">
              GuitarPath
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-cream-200">Welcome, {user?.name} 🎸</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Welcome Section */}
          <div className="card">
            <h2 className="text-3xl font-display font-bold text-cream-100 mb-2">
              Good evening, {user?.name} 🎸
            </h2>
            <p className="text-cream-200/70">
              What should you practice today?
            </p>
          </div>

          {/* Continue Learning */}
          <div className="card">
            <h3 className="text-xl font-semibold text-cream-100 mb-4">Continue Learning</h3>
            <div className="bg-charcoal-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-medium text-cream-100">Lesson 7</h4>
                  <p className="text-orange-500 font-medium">Your First Chord — Em</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cream-100">65%</div>
                  <div className="text-sm text-cream-200/60">Progress</div>
                </div>
              </div>
              <div className="w-full bg-charcoal-700 rounded-full h-2 mb-4">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <button className="btn-primary w-full">Continue</button>
            </div>
          </div>

          {/* Today's Practice */}
          <div className="card">
            <h3 className="text-xl font-semibold text-cream-100 mb-4">Today's Practice</h3>
            <div className="space-y-3">
              {['Tune Guitar — 2 min', 'Em Chord — 5 min', 'Am Chord — 5 min', 'Chord Switching — 5 min', 'Strumming — 5 min'].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-charcoal-800 last:border-0">
                  <span className="text-cream-200">{item}</span>
                  <input type="checkbox" className="w-5 h-5 rounded border-charcoal-600 text-orange-500 focus:ring-orange-500" />
                </div>
              ))}
              <div className="pt-4 border-t border-charcoal-800">
                <div className="flex justify-between items-center">
                  <span className="text-cream-100 font-medium">Total: 22 minutes</span>
                  <button className="btn-primary">Start Practice</button>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="card">
            <h3 className="text-xl font-semibold text-cream-100 mb-4">Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Chords', 'Rhythm', 'Strumming', 'Picking', 'Timing', 'Songs'].map((skill) => (
                <div key={skill} className="bg-charcoal-800 rounded-lg p-4">
                  <div className="text-cream-200 text-sm mb-2">{skill}</div>
                  <div className="w-full bg-charcoal-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${averageScore}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Feedback */}
          <div className="card">
            <h3 className="text-xl font-semibold text-cream-100 mb-4">Teacher Feedback</h3>
            <div className="bg-charcoal-800 rounded-lg p-4 border-l-4 border-orange-500">
              <p className="text-cream-200 italic">
                "Your chord placement is improving. Focus on switching between C and G."
              </p>
              <p className="text-cream-200/60 text-sm mt-2">— 2 hours ago</p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
