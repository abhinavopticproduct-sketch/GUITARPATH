import { motion } from 'framer-motion';
import { useAuthStore } from '@store/authStore';

export default function TeacherDashboard() {
  const { user } = useAuthStore();

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
              { label: 'Total Students', value: '24', change: '+3 this week' },
              { label: 'Active Students', value: '18', change: '75% active' },
              { label: 'Average Performance', value: '78%', change: '+5% improvement' },
              { label: 'Assignments', value: '6', change: '2 pending review' },
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
              {[
                { name: 'Alex', issue: 'Average score dropped 12%', time: '2 days ago' },
                { name: 'Sam', issue: 'No practice for 5 days', time: '5 days ago' },
                { name: 'John', issue: 'Rhythm accuracy below 60%', time: '1 day ago' },
              ].map((student, index) => (
                <div key={student.name} className="flex justify-between items-center py-3 border-b border-charcoal-800 last:border-0">
                  <div>
                    <div className="text-cream-100 font-medium">{student.name}</div>
                    <div className="text-red-400 text-sm">{student.issue}</div>
                  </div>
                  <div className="text-cream-200/60 text-sm">{student.time}</div>
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
