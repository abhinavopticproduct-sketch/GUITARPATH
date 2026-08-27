import { motion } from 'framer-motion';

export default function ChordLibrary() {
  const chords = [
    { name: 'C', variation: 'Major', difficulty: 'beginner' },
    { name: 'Cm', variation: 'Minor', difficulty: 'intermediate' },
    { name: 'C7', variation: '7th', difficulty: 'intermediate' },
    { name: 'G', variation: 'Major', difficulty: 'beginner' },
    { name: 'Gm', variation: 'Minor', difficulty: 'intermediate' },
    { name: 'D', variation: 'Major', difficulty: 'beginner' },
    { name: 'Dm', variation: 'Minor', difficulty: 'beginner' },
    { name: 'A', variation: 'Major', difficulty: 'beginner' },
    { name: 'Am', variation: 'Minor', difficulty: 'beginner' },
    { name: 'E', variation: 'Major', difficulty: 'beginner' },
    { name: 'Em', variation: 'Minor', difficulty: 'beginner' },
  ];

  return (
    <div className="min-h-screen bg-charcoal-950">
      <header className="glass-effect border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-display font-bold text-cream-100">Chord Library</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search chords..."
              className="input-field"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {chords.map((chord, index) => (
              <motion.div
                key={`${chord.name}-${chord.variation}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="card hover:border-orange-500 transition-colors cursor-pointer"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-cream-100 mb-1">{chord.name}</div>
                  <div className="text-cream-200/60 text-sm mb-2">{chord.variation}</div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    chord.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                  }`}>
                    {chord.difficulty}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
