import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { AudioProcessor, MicrophoneAccess, PitchDetector } from '@audio/index';
import { practiceService } from '@services/practiceService';

export default function PracticeMode() {
  const { exerciseId = '' } = useParams();
  const [sessionId, setSessionId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');
  const microphone = useRef(new MicrophoneAccess());
  const animationFrame = useRef<number>();
  const latestNote = useRef('');
  const latestConfidence = useRef(0);

  useEffect(() => () => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    microphone.current.stopListening();
  }, []);

  const startPractice = async () => {
    try {
      setError('');
      const granted = await microphone.current.requestPermission();
      if (!granted) {
        setError('Microphone permission is required.');
        return;
      }
      const audioContext = await microphone.current.startListening();
      const analyser = microphone.current.getAnalyser();
      if (!analyser) return;
      const processor = new AudioProcessor(analyser);
      const detector = new PitchDetector(audioContext.sampleRate);
      const session = await practiceService.startPractice({ lessonId: exerciseId, exerciseId }).catch(() => null);
      setSessionId(session?.id || '');
      setStartTime(session?.startTime || new Date().toISOString());
      setCompleted(false);
      setIsListening(true);

      const detect = () => {
        const result = detector.detectPitchYIN(processor.getAudioData());
        if (result.note && result.confidence > 0.2) {
          latestNote.current = result.note;
          latestConfidence.current = result.confidence;
          setNote(result.note);
          setConfidence(result.confidence);
        }
        animationFrame.current = requestAnimationFrame(detect);
      };
      detect();
    } catch (requestError: any) {
      setError(requestError.response?.data?.error || 'Could not start practice.');
    }
  };

  const stopPractice = async () => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    microphone.current.stopListening();
    setIsListening(false);
    if (sessionId) {
      try {
      await practiceService.submitPracticeResult(sessionId, {
        startTime,
        accuracy: latestConfidence.current * 100,
        pitchScore: latestConfidence.current * 100,
        timingScore: 0,
        rhythmScore: 0,
        chordScore: 0,
        overallScore: latestConfidence.current * 100,
        detectedNotes: latestNote.current ? [latestNote.current] : [],
        expectedNotes: ['C4'],
        confidence: latestConfidence.current,
      });
      setSessionId('');
      } catch {
        setError('Practice was measured locally but could not be saved.');
      }
    }
    setCompleted(true);
  };

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
          <p className="text-orange-500">{completed ? 'Practice complete' : isListening ? (note ? `Detected ${note}` : 'Listening...') : 'Ready to listen'}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-charcoal-800 rounded-lg p-4 text-center">
            <div className="text-cream-200/60 text-sm">Detected note</div>
            <div className="text-2xl font-bold text-cream-100">{note || '--'}</div>
          </div>
          <div className="bg-charcoal-800 rounded-lg p-4 text-center">
            <div className="text-cream-200/60 text-sm">Timing</div>
            <div className="text-2xl font-bold text-cream-100">--</div>
          </div>
          <div className="bg-charcoal-800 rounded-lg p-4 text-center">
            <div className="text-cream-200/60 text-sm">Confidence</div>
            <div className="text-2xl font-bold text-cream-100">{confidence ? `${(confidence * 100).toFixed(0)}%` : '--'}</div>
          </div>
        </div>

        <button onClick={isListening ? stopPractice : startPractice} className="btn-secondary w-full">
          {isListening ? 'Stop Practice' : completed ? 'Try Again' : 'Start Practice'}
        </button>
        {completed && <Link to="/learning-path" className="btn-primary w-full text-center block mt-3">Continue Learning</Link>}
        {error && <p className="text-red-400 text-sm text-center mt-3">{error}</p>}
      </motion.div>
    </div>
  );
}
