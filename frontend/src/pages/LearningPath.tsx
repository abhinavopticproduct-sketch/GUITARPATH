import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LearningPath() {
  return (
    <div className="min-h-screen bg-charcoal-950">
      <header className="glass-effect border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-display font-bold text-cream-100">Learning Path</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-display font-bold text-cream-100 mb-2">BEGINNER</h2>
            <p className="text-cream-200/70">Your journey to becoming a guitarist</p>
          </div>

          {[
            { level: 'Level 1', title: 'Guitar Basics', lessons: ['Meet Your Guitar', 'Guitar Parts', 'Correct Posture', 'Holding the Pick', 'Guitar Strings'], completed: true },
            { level: 'Level 2', title: 'Tuning', lessons: ['Standard Tuning', 'Tune Low E', 'Tune A', 'Tune D', 'Tune G', 'Tune B', 'Tune High E'], completed: true },
            { level: 'Level 3', title: 'First Notes', lessons: ['Finger Placement', 'Single Notes', 'Alternate Picking', 'Simple Melodies'], completed: true },
            { level: 'Level 4', title: 'First Chords', lessons: ['Em', 'Am', 'C', 'G', 'D', 'E', 'A'], completed: false, current: true },
            { level: 'Level 5', title: 'Chord Switching', lessons: ['Em → Am', 'C → G', 'G → D', 'D → Em'], completed: false, locked: true },
            { level: 'Level 6', title: 'Strumming', lessons: ['Downstroke', 'Upstroke', 'Down-Up', '4/4 Rhythm', 'Basic Patterns'], completed: false, locked: true },
            { level: 'Level 7', title: 'Songs', lessons: ['Your First Song'], completed: false, locked: true },
          ].map((section, index) => (
            <div key={section.level} className="card">
              <div className="flex items-center gap-4 mb-4">
                {section.completed && <span className="text-green-500 text-2xl">✓</span>}
                {section.current && <span className="text-orange-500 text-2xl">●</span>}
                {section.locked && <span className="text-charcoal-600 text-2xl">🔒</span>}
                <div>
                  <h3 className="text-lg font-semibold text-cream-100">{section.level} — {section.title}</h3>
                  <p className="text-cream-200/60 text-sm">{section.lessons.length} lessons</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {section.lessons.map((lesson) => (
                  <Link key={lesson} to={`/lesson/${encodeURIComponent(lesson)}`} className="px-3 py-1 bg-charcoal-800 rounded-full text-sm text-cream-200 hover:bg-orange-500 hover:text-white transition-colors">
                    {lesson}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
