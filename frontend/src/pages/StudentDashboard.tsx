import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function StudentDashboard() {
  const skills = [
    { label: 'Chords', value: 86, color: 'bg-orange-400' },
    { label: 'Rhythm', value: 72, color: 'bg-teal-400' },
    { label: 'Timing', value: 81, color: 'bg-sky-400' },
    { label: 'Picking', value: 69, color: 'bg-rose-400' },
  ];

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
              <span className="text-cream-200">Demo Student 🎸</span>
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
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-transparent to-teal-500/10 pointer-events-none" />
            <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div><p className="text-orange-400 text-sm font-semibold tracking-widest mb-3">DEMO STUDENT · LEVEL 4</p><h2 className="text-3xl md:text-5xl font-display font-bold text-cream-100 mb-3">Good evening, Guitarist.</h2><p className="text-cream-200/70 text-lg">Your hands are warmed up. Let’s make today’s sound cleaner.</p></div>
              <div className="text-left md:text-right"><div className="text-4xl font-display font-bold text-orange-400">7</div><div className="text-sm text-cream-200/60">day streak</div></div>
            </div>
          </div>

          {/* Continue Learning */}
          <div className="card">
            <div className="flex items-center justify-between mb-4"><div><p className="text-orange-400 text-sm font-semibold tracking-wide">YOUR NEXT STEP</p><h3 className="text-2xl font-display font-bold text-cream-100">Build your Em chord</h3></div><span className="text-cream-200/60 text-sm">Lesson 17</span></div>
            <div className="bg-charcoal-800 rounded-lg p-6 border border-orange-500/20">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-lg font-medium text-cream-100">Your First Chord — Em</h4>
                  <p className="text-cream-200/60">Place, listen, adjust, then strum.</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cream-100">72%</div>
                  <div className="text-sm text-cream-200/60">Progress</div>
                </div>
              </div>
              <div className="w-full bg-charcoal-700 rounded-full h-2 mb-4">
                <motion.div initial={{ width: 0 }} animate={{ width: '72%' }} transition={{ duration: 1 }} className="bg-orange-500 h-2 rounded-full" />
              </div>
              <Link to="/lesson/Your%20First%20Chord%20%E2%80%94%20Em" className="btn-primary w-full text-center block">Continue learning</Link>
            </div>
          </div>

          {/* Today's Practice */}
          <div className="card">
            <h3 className="text-xl font-semibold text-cream-100 mb-4">Today's Practice</h3>
            <div className="space-y-3">
              {['Tune Guitar', 'Em chord sound check', 'Am chord shape', 'Chord switching', 'Down-up rhythm'].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-charcoal-800 last:border-0">
                  <span className="text-cream-200"><span className="text-cream-200/40 mr-3">0{index + 1}</span>{item}</span>
                  <span className="text-cream-200/50 text-sm">{index === 1 ? '5 min' : index === 0 ? '2 min' : '5 min'}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-charcoal-800">
                <div className="flex justify-between items-center">
                  <span className="text-cream-100 font-medium">22 minutes planned</span>
                  <Link to="/practice/Em" className="btn-primary">Start practice</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="card">
            <h3 className="text-xl font-semibold text-cream-100 mb-4">Progress</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <div key={skill.label} className="bg-charcoal-800 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2"><span className="text-cream-200">{skill.label}</span><span className="text-cream-200/60">{skill.value}%</span></div>
                  <div className="w-full bg-charcoal-700 rounded-full h-2">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${skill.value}%` }} transition={{ duration: 0.8 }} className={`${skill.color} h-2 rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Feedback */}
          <div className="card">
            <h3 className="text-xl font-semibold text-cream-100 mb-4">Teacher Feedback</h3>
            <div className="bg-charcoal-800 rounded-lg p-4 border-l-4 border-orange-500">
              <p className="text-cream-200 italic">“Your Em chord is sounding cleaner. Keep each fingertip close to the fret and let the open strings ring.”</p>
              <p className="text-cream-200/60 text-sm mt-2">— Maya, your demo teacher · today</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3"><Link to="/learning-path" className="btn-secondary">Explore learning journey</Link><Link to="/teacher" className="btn-ghost">View teacher demo →</Link></div>
        </motion.div>
      </main>
    </div>
  );
}
