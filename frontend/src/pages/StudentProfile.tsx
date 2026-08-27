import { motion } from 'framer-motion';
import { useAuthStore } from '@store/authStore';

export default function StudentProfile() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-charcoal-950">
      <header className="glass-effect border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-display font-bold text-cream-100">Profile</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Profile Header */}
          <div className="card">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center text-4xl">
                {user?.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-cream-100">{user?.name}</h2>
                <p className="text-cream-200/60">{user?.email}</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-orange-500">Level 5</span>
                  <span className="text-green-400">🔥 7 day streak</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'XP', value: '2,450' },
              { label: 'Practice Hours', value: '24' },
              { label: 'Lessons Complete', value: '12' },
              { label: 'Average Accuracy', value: '87%' },
            ].map((stat) => (
              <div key={stat.label} className="card text-center">
                <div className="text-2xl font-bold text-cream-100">{stat.value}</div>
                <div className="text-cream-200/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Learning Goal */}
          <div className="card">
            <h3 className="text-lg font-semibold text-cream-100 mb-4">Learning Goal</h3>
            <p className="text-cream-200/70">Play songs</p>
          </div>

          {/* Badges */}
          <div className="card">
            <h3 className="text-lg font-semibold text-cream-100 mb-4">Achievements</h3>
            <div className="grid grid-cols-4 gap-4">
              {['🎸', '🔥', '⭐', '🏆'].map((badge, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-2">{badge}</div>
                  <div className="text-cream-200/60 text-xs">Achievement {index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
