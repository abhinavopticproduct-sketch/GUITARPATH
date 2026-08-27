import { motion } from 'framer-motion';

export default function PracticeMode() {
  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="card max-w-2xl w-full mx-4"
      >
        <h2 className="text-3xl font-display font-bold text-cream-100 mb-8 text-center">
          Practice C Major
        </h2>
        
        <div className="text-center mb-8">
          <p className="text-cream-200/70 mb-4">Place your fingers correctly and strum once.</p>
          <div className="text-6xl mb-4">🎙</div>
          <p className="text-orange-500">Listening...</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-charcoal-800 rounded-lg p-4 text-center">
            <div className="text-cream-200/60 text-sm">Accuracy</div>
            <div className="text-2xl font-bold text-cream-100">--</div>
          </div>
          <div className="bg-charcoal-800 rounded-lg p-4 text-center">
            <div className="text-cream-200/60 text-sm">Timing</div>
            <div className="text-2xl font-bold text-cream-100">--</div>
          </div>
          <div className="bg-charcoal-800 rounded-lg p-4 text-center">
            <div className="text-cream-200/60 text-sm">Confidence</div>
            <div className="text-2xl font-bold text-cream-100">--</div>
          </div>
        </div>

        <button className="btn-secondary w-full">Stop Practice</button>
      </motion.div>
    </div>
  );
}
