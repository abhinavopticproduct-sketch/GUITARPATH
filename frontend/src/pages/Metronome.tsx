import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Metronome() {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(1);
  const [signature, setSignature] = useState('4/4');
  const [taps, setTaps] = useState<number[]>([]);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => {
      setCurrentBeat((beat) => beat >= Number(signature.split('/')[0]) ? 1 : beat + 1);
    }, 60000 / bpm);
    return () => window.clearInterval(interval);
  }, [bpm, isPlaying, signature]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const tapTemp = () => {
    const now = performance.now();
    const recentTaps = [...taps, now].filter((tap) => now - tap < 3000);
    setTaps(recentTaps);
    if (recentTaps.length > 1) {
      const intervals = recentTaps.slice(1).map((tap, index) => tap - recentTaps[index]);
      const averageInterval = intervals.reduce((sum, interval) => sum + interval, 0) / intervals.length;
      setBpm(Math.min(250, Math.max(30, Math.round(60000 / averageInterval))));
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950">
      <header className="glass-effect border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-display font-bold text-cream-100">Metronome</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="card">
            {/* BPM Display */}
            <div className="text-center mb-8">
              <div className="text-7xl font-display font-bold text-cream-100 mb-2">{bpm}</div>
              <div className="text-cream-200/60">BPM</div>
            </div>

            {/* Beat visualization */}
            <div className="flex justify-center gap-4 mb-8">
              {Array.from({ length: Number(signature.split('/')[0]) }, (_, index) => index + 1).map((beat) => (
                <div
                  key={beat}
                  className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all ${
                    beat === currentBeat && isPlaying
                      ? 'bg-orange-500 text-white scale-110'
                      : 'bg-charcoal-800 text-cream-200'
                  }`}
                >
                  {beat}
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mb-8">
              <button
                onClick={togglePlay}
                className={`w-20 h-20 rounded-full text-2xl font-bold transition-all ${
                  isPlaying
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isPlaying ? '■' : '▶'}
              </button>
            </div>

            {/* BPM Controls */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setBpm(Math.max(30, bpm - 5))}
                className="btn-secondary"
              >
                -5
              </button>
              <button
                onClick={() => setBpm(Math.max(30, bpm - 1))}
                className="btn-secondary"
              >
                -1
              </button>
              <button
                onClick={tapTemp}
                className="btn-primary"
              >
                Tap Tempo
              </button>
              <button
                onClick={() => setBpm(Math.min(250, bpm + 1))}
                className="btn-secondary"
              >
                +1
              </button>
              <button
                onClick={() => setBpm(Math.min(250, bpm + 5))}
                className="btn-secondary"
              >
                +5
              </button>
            </div>

            {/* BPM Slider */}
            <div className="mb-8">
              <input
                type="range"
                min="30"
                max="250"
                value={bpm}
                onChange={(e) => setBpm(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Time signature */}
            <div className="flex justify-center gap-4">
              {['4/4', '3/4', '6/8'].map((option) => (
                <button
                  key={option}
                  onClick={() => { setSignature(option); setCurrentBeat(1); }}
                  aria-pressed={signature === option}
                  className="btn-secondary"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
