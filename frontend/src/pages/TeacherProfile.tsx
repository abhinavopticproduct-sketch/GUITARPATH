import { motion } from 'framer-motion';
import { useAuthStore } from '@store/authStore';

export default function TeacherProfile() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-charcoal-950">
      <header className="glass-effect border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-display font-bold text-cream-100">Teacher Profile</h1>
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
                <p className="text-orange-500 mt-2">Guitar Instructor</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Students', value: '24' },
              { label: 'Classes', value: '3' },
              { label: 'Experience', value: '8 years' },
              { label: 'Specialization', value: 'Beginner' },
            ].map((stat) => (
              <div key={stat.label} className="card text-center">
                <div className="text-2xl font-bold text-cream-100">{stat.value}</div>
                <div className="text-cream-200/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="card">
            <h3 className="text-lg font-semibold text-cream-100 mb-4">Bio</h3>
            <p className="text-cream-200/70">
              Passionate guitar instructor with 8 years of experience teaching beginners to advanced players.
              Specializing in building strong foundations and making learning fun.
            </p>
          </div>

          {/* Specialization */}
          <div className="card">
            <h3 className="text-lg font-semibold text-cream-100 mb-4">Specialization</h3>
            <div className="flex flex-wrap gap-2">
              {['Beginner Guitar', 'Fingerstyle', 'Music Theory', 'Acoustic Guitar'].map((spec) => (
                <span key={spec} className="px-3 py-1 bg-charcoal-800 rounded-full text-cream-200 text-sm">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
