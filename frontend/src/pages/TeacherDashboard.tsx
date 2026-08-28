import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function TeacherDashboard() {
  const students = [
    { name: 'Alex Morgan', level: 'Level 4', progress: 72, score: 84, last: 'Today', status: 'Active', focus: 'Chord placement' },
    { name: 'Sam Rivera', level: 'Level 2', progress: 48, score: 67, last: 'Yesterday', status: 'Needs focus', focus: 'Rhythm below 70%' },
    { name: 'Jamie Lee', level: 'Level 5', progress: 91, score: 92, last: 'Today', status: 'Active', focus: 'Ready to unlock songs' },
  ];

  return (
    <div className="min-h-screen bg-charcoal-950">
      {/* Header */}
      <header className="glass-effect border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center"><Link to="/" className="text-2xl font-display font-bold text-cream-100">GuitarPath <span className="text-orange-400">/ Teacher</span></Link><div className="flex items-center gap-4"><span className="text-cream-200">Demo Teacher</span><Link to="/" className="btn-ghost text-sm">Student view</Link></div>
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
                { label: 'Students', value: '24', change: '+3 this month' },
                { label: 'Active today', value: '18', change: '75% of roster' },
                { label: 'Average score', value: '78%', change: '+6% this week' },
                { label: 'Open assignments', value: '8', change: '4 due this week' },
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
              {students.map((student) => (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: students.indexOf(student) * 0.08 }} key={student.name} className="flex justify-between items-center gap-4 py-3 border-b border-charcoal-800 last:border-0">
                  <div>
                    <div className="text-cream-100 font-medium">{student.name}</div>
                    <div className="text-cream-200/60 text-sm">{student.focus}</div>
                  </div>
                  <div className="text-right"><div className="text-orange-400 text-sm font-semibold">{student.status}</div><div className="text-cream-200/50 text-xs">last practice {student.last}</div></div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-xl font-semibold text-cream-100 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'Alex submitted Em chord practice · 84%', time: '10 minutes ago' },
                { action: 'Sam needs a rhythm review', time: '1 hour ago' },
                { action: 'Jamie unlocked Chord Switching', time: '3 hours ago' },
              ].map((activity) => (
                <div key={activity.action} className="flex justify-between items-center py-2 border-b border-charcoal-800 last:border-0">
                  <span className="text-cream-200">{activity.action}</span>
                  <span className="text-cream-200/60 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-6"><div className="card"><div className="flex justify-between items-center mb-5"><h3 className="text-xl font-display font-bold text-cream-100">Student performance</h3><span className="text-cream-200/50 text-sm">this week</span></div>{students.map((student) => <div key={student.name} className="mb-4 last:mb-0"><div className="flex justify-between text-sm mb-2"><span className="text-cream-200">{student.name} · {student.level}</span><span className="text-cream-100 font-semibold">{student.score}%</span></div><div className="h-2 bg-charcoal-800 rounded-full"><motion.div initial={{ width: 0 }} animate={{ width: `${student.score}%` }} transition={{ duration: 0.8 }} className="h-2 rounded-full bg-orange-400" /></div></div>)}</div><div className="card"><p className="text-orange-400 text-sm font-semibold tracking-wide mb-2">ASSIGNMENT IN PROGRESS</p><h3 className="text-2xl font-display font-bold text-cream-100">Em → Am switching</h3><p className="text-cream-200/60 mt-2 mb-5">Alex Morgan · target 85% · 10 min/day</p><div className="flex items-center justify-between text-sm"><span className="text-cream-200/60">4 of 7 sessions</span><span className="text-orange-400">due Friday</span></div><div className="h-2 bg-charcoal-800 rounded-full mt-2"><div className="h-2 w-[57%] bg-teal-400 rounded-full" /></div></div></div>
          <div className="card border-l-4 border-teal-400"><p className="text-teal-300 text-sm font-semibold tracking-wide mb-2">RECENT FEEDBACK</p><p className="text-cream-100 text-lg">“Your Em chord is sounding cleaner. Keep each fingertip close to the fret and let the open strings ring.”</p><p className="text-cream-200/50 text-sm mt-3">Sent to Alex Morgan · today</p></div>
        </motion.div>
      </main>
    </div>
  );
}
