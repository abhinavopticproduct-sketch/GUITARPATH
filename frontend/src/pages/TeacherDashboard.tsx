import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@store/authStore';
import { teacherService } from '@services/teacherService';

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    teacherService.getTeacherStudents(user.id).then(setStudents).catch(() => setStudents([]));
  }, [user]);

  return (
    <div className="min-h-screen bg-charcoal-950">
      {/* Header */}
      <header className="glass-effect border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-display font-bold text-cream-100">
              GuitarPath Teacher
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-cream-200">Welcome, {user?.name}</span>
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
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Students', value: String(students.length), change: 'Current roster' },
                { label: 'Active Students', value: String(students.length), change: 'Current roster' },
                { label: 'Average Performance', value: '--', change: 'Awaiting practice data' },
                { label: 'Assignments', value: '--', change: 'Open assignments view' },
            ].map((stat, index) => (
              <div key={stat.label} className="card">
                <div className="text-cream-200/70 text-sm mb-1">{stat.label}</div>
                <div className="text-3xl font-bold text-cream-100 mb-1">{stat.value}</div>
                <div className="text-green-400 text-sm">{stat.change}</div>
              </div>
            ))}
          </div>

          {/* Students Needing Attention */}
          <div className="card">
            <h3 className="text-xl font-semibold text-cream-100 mb-4">Students Needing Attention</h3>
            <div className="space-y-4">
              {students.length === 0 && <p className="text-cream-200/60">No students need attention yet.</p>}
              {students.map((student) => (
                <div key={student.name} className="flex justify-between items-center py-3 border-b border-charcoal-800 last:border-0">
                  <div>
                    <div className="text-cream-100 font-medium">{student.user?.name || 'Student'}</div>
                    <div className="text-cream-200/60 text-sm">Review recent practice performance</div>
                  </div>
                  <div className="text-cream-200/60 text-sm">Current roster</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-xl font-semibold text-cream-100 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'Sarah completed Lesson 8', time: '10 minutes ago' },
                { action: 'Mike submitted practice assignment', time: '1 hour ago' },
                { action: 'Emma reached 7-day streak', time: '3 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-charcoal-800 last:border-0">
                  <span className="text-cream-200">{activity.action}</span>
                  <span className="text-cream-200/60 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
