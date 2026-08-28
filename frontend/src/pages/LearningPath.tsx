import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const levels = [
  { level: '01', title: 'Guitar Basics', lessons: ['Meet Your Guitar', 'Guitar Parts', 'Correct Posture', 'Holding the Pick', 'Guitar Strings'], status: 'complete' },
  { level: '02', title: 'Tuning', lessons: ['Standard Tuning', 'Tune Low E', 'Tune A', 'Tune D', 'Tune G', 'Tune B', 'Tune High E'], status: 'complete' },
  { level: '03', title: 'First Notes', lessons: ['Playing Your First Note', 'String Picking', 'Alternate Picking', 'Simple Melody'], status: 'complete' },
  { level: '04', title: 'First Chords', lessons: ['Your First Chord — Em', 'A Minor', 'C Major', 'G Major', 'D Major'], status: 'current' },
  { level: '05', title: 'Chord Switching', lessons: ['Em → Am', 'C → G', 'G → D', 'D → Em'], status: 'locked' },
  { level: '06', title: 'Rhythm & Strumming', lessons: ['Downstroke', 'Upstroke', 'Down-Up', '4/4 Rhythm', 'Basic Strumming'], status: 'locked' },
  { level: '07', title: 'Songs', lessons: ['First Song', 'Song Performance'], status: 'locked' },
];

export default function LearningPath() {
  return <div className="min-h-screen bg-charcoal-950">
    <header className="glass-effect border-b border-charcoal-800"><div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center"><Link to="/" className="font-display text-2xl font-bold text-cream-100">GuitarPath</Link><span className="text-cream-200/60 text-sm">Demo Student · 7 day streak</span></div></header>
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-10 max-w-2xl"><p className="text-orange-400 text-sm font-semibold tracking-widest mb-3">YOUR LEARNING JOURNEY</p><h1 className="text-4xl md:text-6xl font-display font-bold text-cream-100 mb-4">A little farther<br /><span className="text-orange-400">every session.</span></h1><p className="text-cream-200/70 text-lg">Move through the path in order. Each node turns your next skill into a small, playable win.</p></motion.div>
      <div className="relative"><div className="absolute left-8 md:left-1/2 top-5 bottom-5 w-px bg-gradient-to-b from-green-400 via-orange-400 to-charcoal-700" /><div className="space-y-5">{levels.map((section, levelIndex) => <motion.section key={section.level} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: levelIndex * 0.08 }} className={`relative md:w-[calc(50%-2rem)] ${levelIndex % 2 ? 'md:ml-auto' : ''}`}>
        <div className={`absolute left-8 md:left-auto md:right-[-2.55rem] top-5 w-5 h-5 rounded-full border-4 border-charcoal-950 z-10 ${section.status === 'complete' ? 'bg-green-400' : section.status === 'current' ? 'bg-orange-400 ring-8 ring-orange-400/15' : 'bg-charcoal-700'}`} />
        <div className={`card ${section.status === 'current' ? 'border-orange-500/50 shadow-orange-500/10 shadow-xl' : section.status === 'locked' ? 'opacity-55' : ''}`}><div className="flex items-start gap-4 mb-5"><div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-display font-bold ${section.status === 'complete' ? 'bg-green-400/15 text-green-400' : section.status === 'current' ? 'bg-orange-400 text-charcoal-950' : 'bg-charcoal-800 text-charcoal-500'}`}>{section.status === 'complete' ? '✓' : section.status === 'locked' ? '⌁' : section.level}</div><div><p className="text-xs text-cream-200/50 uppercase tracking-widest">Level {section.level}</p><h2 className="text-2xl font-display font-bold text-cream-100">{section.title}</h2><p className="text-sm text-cream-200/60">{section.lessons.length} lessons · {section.status === 'complete' ? 'mastered' : section.status === 'current' ? 'in progress' : 'unlock after Level 4'}</p></div></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{section.lessons.map((lesson, lessonIndex) => section.status === 'locked' ? <div key={lesson} className="px-3 py-3 rounded-lg bg-charcoal-800/60 text-sm text-charcoal-500 flex justify-between"><span>{lesson}</span><span>locked</span></div> : <Link key={lesson} to={`/lesson/${encodeURIComponent(lesson)}`} className={`px-3 py-3 rounded-lg text-sm transition-colors flex justify-between ${section.status === 'current' && lessonIndex === 0 ? 'bg-orange-500 text-white' : 'bg-charcoal-800 text-cream-200 hover:bg-orange-500 hover:text-white'}`}><span>{lesson}</span><span>{section.status === 'complete' ? '✓' : lessonIndex === 0 ? '→' : '•'}</span></Link>)}</div></div>
      </motion.section>)}</div></div>
    </main>
  </div>;
}
