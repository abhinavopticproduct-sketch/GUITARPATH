import { motion } from 'framer-motion';
import { useAuthStore } from '@store/authStore';

export default function AdminDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-charcoal-950">
      <header className="glass-effect border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-display font-bold text-cream-100">
              GuitarPath Admin
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
          <div className="card">
            <h2 className="text-2xl font-bold text-cream-100 mb-4">Admin Dashboard</h2>
            <p className="text-cream-200/70">Manage users, courses, and platform content.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Users', 'Courses', 'Lessons', 'Classes', 'Analytics', 'Settings'].map((section) => (
              <div key={section} className="card hover:border-orange-500 transition-colors cursor-pointer">
                <h3 className="text-lg font-semibold text-cream-100">{section}</h3>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
