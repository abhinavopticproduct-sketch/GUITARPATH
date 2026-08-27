import { useState } from 'react';
import { motion } from 'framer-motion';

export default function GuitarTuner() {
  const [selectedString, setSelectedString] = useState('A');
  const [frequency, setFrequency] = useState(110.2);
  const [isListening, setIsListening] = useState(false);

  const strings = [
    { name: 'E', frequency: 82.41 },
    { name: 'A', frequency: 110.00 },
    { name: 'D', frequency: 146.83 },
    { name: 'G', frequency: 196.00 },
    { name: 'B', frequency: 246.94 },
    { name: 'E', frequency: 329.63 },
  ];

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsListening(true);
      // In a real implementation, this would process audio
    } catch (error) {
      console.error('Microphone access denied');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950">
      <header className="glass-effect border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-display font-bold text-cream-100">Guitar Tuner</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="card">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-display font-bold text-cream-100 mb-2">{selectedString}</h2>
              <p className="text-cream-200/60">Select a string to tune</p>
            </div>

            {/* String selection */}
            <div className="flex justify-center gap-4 mb-8">
              {strings.map((string, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedString(string.name)}
                  className={`w-12 h-12 rounded-lg font-medium transition-all ${
                    selectedString === string.name
                      ? 'bg-orange-500 text-white'
                      : 'bg-charcoal-800 text-cream-200 hover:bg-charcoal-700'
                  }`}
                >
                  {string.name}
                </button>
              ))}
            </div>

            {/* Tuning display */}
            <div className="bg-charcoal-800 rounded-lg p-8 mb-8">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-cream-100 mb-2">{frequency.toFixed(1)} Hz</div>
                <div className="text-cream-200/60">Frequency</div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-cream-200">Too Low</span>
                <div className="w-64 h-2 bg-charcoal-700 rounded-full relative">
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full"
                    style={{ left: `${((frequency - 100) / 50) * 100}%` }}
                  />
                </div>
                <span className="text-cream-200">Too High</span>
              </div>

              {Math.abs(frequency - 110) < 2 && (
                <div className="text-center text-green-400 text-xl font-medium">
                  ✓ In Tune
                </div>
              )}
            </div>

            {/* Microphone button */}
            <button
              onClick={startListening}
              className={`btn-primary w-full ${isListening ? 'bg-green-500' : ''}`}
            >
              {isListening ? '🎙 Listening...' : '🎙 Allow Microphone'}
            </button>
          </div>

          {/* Tuning modes */}
          <div className="card">
            <h3 className="text-lg font-semibold text-cream-100 mb-4">Tuning Modes</h3>
            <div className="flex gap-4">
              {['Standard', 'Drop D', 'Half-step down'].map((mode) => (
                <button
                  key={mode}
                  className="btn-secondary flex-1"
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
