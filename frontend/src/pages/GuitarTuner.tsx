import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AudioProcessor, MicrophoneAccess, PitchDetector } from '@audio/index';

export default function GuitarTuner() {
  const [selectedString, setSelectedString] = useState(1);
  const [tuningMode, setTuningMode] = useState('Standard');
  const [frequency, setFrequency] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const microphone = useRef(new MicrophoneAccess());
  const animationFrame = useRef<number>();

  const strings = [
    { name: 'E', frequency: 82.41 },
    { name: 'A', frequency: 110.00 },
    { name: 'D', frequency: 146.83 },
    { name: 'G', frequency: 196.00 },
    { name: 'B', frequency: 246.94 },
    { name: 'E', frequency: 329.63 },
  ];

  const tuningOffsets: Record<string, number> = {
    Standard: 0,
    'Drop D': -2,
    'Half-step down': -1,
  };

  const selected = strings[selectedString];

  useEffect(() => () => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    microphone.current.stopListening();
  }, []);

  const startListening = async () => {
    try {
      setError('');
      const permissionGranted = await microphone.current.requestPermission();
      if (!permissionGranted) {
        setError('Microphone permission is required.');
        return;
      }
      const audioContext = await microphone.current.startListening();
      const analyser = microphone.current.getAnalyser();
      if (!analyser) return;

      const processor = new AudioProcessor(analyser);
      const detector = new PitchDetector(audioContext.sampleRate);
      setIsListening(true);
      const detect = () => {
        const result = detector.detectPitchYIN(processor.getAudioData());
        if (result.frequency > 0 && result.confidence > 0.2) {
          setFrequency(result.frequency);
          setConfidence(result.confidence);
        }
        animationFrame.current = requestAnimationFrame(detect);
      };
      detect();
    } catch {
      setError('We could not access the microphone.');
    }
  };

  const stopListening = () => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    microphone.current.stopListening();
    setIsListening(false);
    setConfidence(0);
  };

  const targetFrequency = selected.frequency * Math.pow(2, tuningOffsets[tuningMode] / 12);
  const cents = frequency > 0 ? 1200 * Math.log2(frequency / targetFrequency) : 0;
  const isInTune = frequency > 0 && Math.abs(cents) < 5 && confidence > 0.5;

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
              <h2 className="text-4xl font-display font-bold text-cream-100 mb-2">{selected.name}</h2>
              <p className="text-cream-200/60">Select a string to tune</p>
            </div>

            {/* String selection */}
            <div className="flex justify-center gap-4 mb-8">
              {strings.map((string, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedString(index)}
                  className={`w-12 h-12 rounded-lg font-medium transition-all ${
                    selectedString === index
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
                <div className="text-6xl font-bold text-cream-100 mb-2">{frequency > 0 ? `${frequency.toFixed(1)} Hz` : '--'}</div>
                <div className="text-cream-200/60">Frequency</div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-cream-200">Too Low</span>
                <div className="w-64 h-2 bg-charcoal-700 rounded-full relative">
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full"
                    style={{ left: `${Math.min(100, Math.max(0, 50 + cents / 2))}%` }}
                  />
                </div>
                <span className="text-cream-200">Too High</span>
              </div>

              {isInTune && (
                <div className="text-center text-green-400 text-xl font-medium">
                  ✓ In Tune
                </div>
              )}
              {isListening && frequency > 0 && !isInTune && (
                <div className="text-center text-orange-400 text-sm">{cents < 0 ? 'Tune up' : 'Tune down'} · Confidence {(confidence * 100).toFixed(0)}%</div>
              )}
            </div>

            {/* Microphone button */}
            <button
              onClick={isListening ? stopListening : startListening}
              className={`btn-primary w-full ${isListening ? 'bg-green-500' : ''}`}
            >
              {isListening ? 'Stop Listening' : 'Allow Microphone'}
            </button>
            {error && <p className="text-red-400 text-sm text-center mt-3">{error}</p>}
          </div>

          {/* Tuning modes */}
          <div className="card">
            <h3 className="text-lg font-semibold text-cream-100 mb-4">Tuning Modes</h3>
            <div className="flex gap-4">
              {Object.keys(tuningOffsets).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTuningMode(mode)}
                  aria-pressed={tuningMode === mode}
                  className={`btn-secondary flex-1 ${tuningMode === mode ? 'border-orange-500 text-orange-400' : ''}`}
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
