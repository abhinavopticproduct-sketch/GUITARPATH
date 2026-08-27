import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import React from 'react';

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-charcoal-950">
      <header className="glass-effect border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-display font-bold text-cream-100">Lesson {id}</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="card">
            <h2 className="text-3xl font-display font-bold text-cream-100 mb-4">Your First Chord — Em</h2>
            <p className="text-cream-200/70 mb-6">
              Learn your first chord! The E minor chord is one of the easiest and most useful chords for beginners.
            </p>
            
            {/* Video placeholder */}
            <div className="bg-charcoal-800 rounded-lg aspect-video flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="text-6xl mb-4">▶️</div>
                <p className="text-cream-200/60">Video Lesson</p>
              </div>
            </div>

            {/* Chord diagram */}
            <div className="bg-charcoal-800 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-cream-100 mb-4">Chord Diagram</h3>
              <div className="flex justify-center">
                <div className="chord-diagram">
                  {/* Chord diagram visualization */}
                  <div className="text-center text-cream-100 font-bold text-2xl mb-4">Em</div>
                  <div className="grid grid-cols-6 gap-1">
                    {['e', 'B', 'G', 'D', 'A', 'E'].map((string) => (
                      <div key={string} className="text-center text-cream-200 text-sm">{string}</div>
                    ))}
                    {Array.from({ length: 4 }).map((_, fret) => (
                      <React.Fragment key={fret}>
                        <div className="h-8 border-r border-charcoal-600 flex items-center justify-center">
                          {fret === 0 && <div className="w-3 h-3 bg-orange-500 rounded-full" />}
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Practice section */}
            <div className="bg-charcoal-800 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-cream-100 mb-4">Practice</h3>
              <p className="text-cream-200/70 mb-4">Try it yourself! Place your fingers and strum the chord.</p>
              <button onClick={() => navigate(`/practice/${id}`)} className="btn-primary">Start Practice</button>
            </div>

            {/* Quiz section */}
            <div className="bg-charcoal-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-cream-100 mb-4">Quiz</h3>
              <p className="text-cream-200/70 mb-4">Test your knowledge before completing the lesson.</p>
              <button className="btn-secondary">Take Quiz</button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
