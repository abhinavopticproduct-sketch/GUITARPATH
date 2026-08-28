import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { AudioProcessor, MicrophoneAccess, PitchDetector } from '@audio/index';
import { practiceService } from '@services/practiceService';

type ChordShape = { notes: string[]; positions: string[]; fingers: string[] };

const chordShapes: Record<string, ChordShape> = {
  Em: { notes: ['E', 'B', 'G'], positions: ['0', '0', '0', '2', '2', '0'], fingers: ['', '', '', '1', '2', ''] },
  Am: { notes: ['A', 'C', 'E'], positions: ['0', '1', '2', '2', '0', 'x'], fingers: ['', '1', '2', '3', '', ''] },
  C: { notes: ['C', 'E', 'G'], positions: ['0', '1', '0', '2', '3', 'x'], fingers: ['', '1', '', '2', '3', ''] },
  G: { notes: ['G', 'B', 'D'], positions: ['3', '0', '0', '0', '2', '3'], fingers: ['2', '', '', '', '1', '3'] },
  D: { notes: ['D', 'F#', 'A'], positions: ['2', '3', '2', '0', 'x', 'x'], fingers: ['1', '3', '2', '', '', ''] },
  E: { notes: ['E', 'G#', 'B'], positions: ['0', '0', '1', '2', '2', '0'], fingers: ['', '', '1', '2', '3', ''] },
  A: { notes: ['A', 'C#', 'E'], positions: ['0', '2', '2', '2', '0', 'x'], fingers: ['', '1', '2', '3', '', ''] },
};

const stringNames = ['high e', 'B', 'G', 'D', 'A', 'low E'];

export default function PracticeMode() {
  const { exerciseId = '' } = useParams();
  const targetChord = useMemo(() => {
    const decodedId = decodeURIComponent(exerciseId);
    if (chordShapes[decodedId]) return decodedId;
    const lessonChord = decodedId.match(/A Minor|C Major|G Major|D Major|Your First Chord.*Em/i)?.[0];
    if (lessonChord) {
      if (/A Minor/i.test(lessonChord)) return 'Am';
      if (/C Major/i.test(lessonChord)) return 'C';
      if (/G Major/i.test(lessonChord)) return 'G';
      if (/D Major/i.test(lessonChord)) return 'D';
      return 'Em';
    }
    return Object.keys(chordShapes).find((chord) => decodedId.includes(chord)) || 'C';
  }, [exerciseId]);
  const chord = chordShapes[targetChord];
  const [sessionId, setSessionId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [detectedNotes, setDetectedNotes] = useState<string[]>([]);
  const [activeFinger, setActiveFinger] = useState(0);
  const [waveform, setWaveform] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');
  const microphone = useRef(new MicrophoneAccess());
  const animationFrame = useRef<number>();
  const latestNote = useRef('');
  const latestConfidence = useRef(0);
  const detectedNotesRef = useRef<string[]>([]);

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
      setNote('');
      setConfidence(0);
      setDetectedNotes([]);
      detectedNotesRef.current = [];
      setActiveFinger(0);
      setWaveform([]);
      setScore(0);
      setIsListening(true);

      const detect = () => {
        const audioData = processor.getAudioData();
        const result = detector.detectPitchYIN(audioData);
        setWaveform(Array.from({ length: 28 }, (_, index) => Math.abs(audioData[Math.floor(index * audioData.length / 28)] || 0)));
        if (result.note && result.confidence > 0.2) {
          latestNote.current = result.note;
          latestConfidence.current = result.confidence;
          setNote(result.note);
          setConfidence(result.confidence);
          const noteName = result.note.replace(/[0-9]/g, '');
          if (!detectedNotesRef.current.includes(noteName)) {
            detectedNotesRef.current = [...detectedNotesRef.current, noteName].slice(-6);
            setDetectedNotes(detectedNotesRef.current);
          }
          if (chord.notes.includes(noteName)) setActiveFinger((current) => Math.min(current + 1, fingerSteps.length - 1));
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
        chordScore: detectedNotesRef.current.filter((item) => chord.notes.includes(item)).length / chord.notes.length * 100,
        overallScore: Math.round((latestConfidence.current * 100 + detectedNotesRef.current.filter((item) => chord.notes.includes(item)).length / chord.notes.length * 100) / 2),
        detectedNotes: latestNote.current ? [latestNote.current] : [],
        expectedNotes: chord.notes,
        detectedChord: detectedNotesRef.current.length >= 2 ? targetChord : undefined,
        expectedChord: targetChord,
        confidence: latestConfidence.current,
      });
      setSessionId('');
      setScore(Math.round((latestConfidence.current * 100 + detectedNotesRef.current.filter((item) => chord.notes.includes(item)).length / chord.notes.length * 100) / 2));
      } catch {
        setError('Practice was measured locally but could not be saved.');
      }
    }
    setCompleted(true);
  };

  const fingerSteps = chord.fingers.map((finger, index) => finger ? { finger, string: stringNames[index], fret: chord.positions[index], index } : null).filter((step): step is { finger: string; string: string; fret: string; index: number } => Boolean(step));
  const currentStep = fingerSteps[Math.min(activeFinger, fingerSteps.length - 1)];
  const isTargetTone = note ? chord.notes.includes(note.replace(/[0-9]/g, '')) : false;

  return (
    <div className="min-h-screen bg-charcoal-950">
      <header className="glass-effect border-b border-charcoal-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to={`/lesson/${exerciseId}`} className="text-cream-200/70 hover:text-cream-100">← Lesson</Link>
          <span className="text-orange-400 text-sm font-semibold tracking-wide">GUIDED PRACTICE · {targetChord}</span>
        </div>
      </header>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-6xl mx-auto px-4 sm:px-6 py-8"
      >
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-6">
          <section className="card">
            <div className="flex items-start justify-between gap-4 mb-7"><div><p className="text-orange-400 text-sm font-semibold mb-2">BUILD THE SHAPE</p><h1 className="text-4xl font-display font-bold text-cream-100">{targetChord} chord</h1><p className="text-cream-200/70 mt-2">Follow the moving cue. Place one finger, then check the sound.</p></div><div className="text-right"><div className="text-5xl font-display font-bold text-orange-400">{fingerSteps.length}</div><div className="text-xs text-cream-200/50 uppercase tracking-wide">fingers</div></div></div>
            <div className="relative bg-wood-800 border-4 border-wood-900 rounded-lg p-4 sm:p-6 overflow-hidden"><div className="absolute left-0 right-0 top-0 h-2 bg-orange-500/70" /><div className="grid grid-cols-6 gap-2 min-h-[260px]">{stringNames.map((stringName, index) => { const finger = chord.fingers[index]; const fret = chord.positions[index]; const isCurrent = currentStep?.index === index; const isPlayed = fret !== 'x'; return <div key={stringName} className="relative flex flex-col items-center justify-end pb-2"><div className={`absolute inset-y-0 w-1 ${isPlayed ? 'bg-cream-200/70' : 'bg-red-400/50'}`} />{[1, 2, 3].map((fretNumber) => <div key={fretNumber} className="absolute left-0 right-0 border-t border-cream-100/15" style={{ top: `${fretNumber * 25}%` }} />)}{finger && <motion.div animate={isCurrent && isListening ? { y: [0, -8, 0], scale: [1, 1.08, 1] } : { y: 0, scale: 1 }} transition={{ repeat: isCurrent && isListening ? Infinity : 0, duration: 1.4 }} className={`z-10 mb-20 w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg ${isCurrent ? 'bg-orange-400 text-charcoal-950 ring-4 ring-orange-300/30' : 'bg-cream-100 text-charcoal-950'}`}>{finger}</motion.div>}<span className={`z-10 text-xs font-semibold uppercase ${isPlayed ? 'text-cream-100' : 'text-red-300'}`}>{stringName}</span><span className="z-10 text-sm text-cream-200/70 mt-1">{fret === 'x' ? 'mute' : fret === '0' ? 'open' : `fret ${fret}`}</span></div>; })}</div></div>
            <div className="mt-5 flex items-end gap-1 h-12" aria-label="Live microphone waveform">{waveform.map((amplitude, index) => <motion.div key={index} animate={{ height: `${Math.max(amplitude * 100, isListening ? 5 : 2)}%` }} className="flex-1 rounded-full bg-orange-400/80" />)}</div><div className="mt-2 flex items-center gap-3"><div className="flex-1 h-2 bg-charcoal-700 rounded-full overflow-hidden"><motion.div animate={{ width: `${isListening ? Math.max(confidence * 100, 8) : 0}%` }} className="h-full bg-teal-400 rounded-full" /></div><span className="text-sm text-cream-200/70">{isListening ? 'Listening' : 'Mic off'}</span></div>
            <div className="mt-5 rounded-lg bg-charcoal-800 p-4 min-h-[76px]"><p className={`font-semibold ${isTargetTone ? 'text-green-400' : 'text-cream-100'}`}>{completed ? 'Practice complete. Nice work.' : currentStep ? `Finger ${currentStep.finger}: place it on the ${currentStep.string} string, ${currentStep.fret}${currentStep.fret === '1' ? 'st' : currentStep.fret === '2' ? 'nd' : 'rd'} fret.` : 'Place your fingers and get ready to strum.'}</p><p className="text-sm text-cream-200/60 mt-1">{isListening ? (note ? `${note} heard ${isTargetTone ? '• chord tone' : '• listen for a cleaner ring'}` : 'Play one string at a time for a clearer reading.') : 'Start the microphone when you are ready.'}</p></div>
            <div className="flex gap-2 mt-5">{fingerSteps.map((step, index) => <button key={step.finger} onClick={() => setActiveFinger(index)} aria-label={`Show finger ${step.finger}`} className={`h-2 flex-1 rounded-full transition-colors ${index <= activeFinger ? 'bg-orange-400' : 'bg-charcoal-700'}`} />)}</div>
          </section>
          <aside className="space-y-6"><div className="card"><p className="text-orange-400 text-sm font-semibold mb-2">SOUND CHECK</p><h2 className="text-2xl font-display font-bold text-cream-100 mb-5">Is it the right chord?</h2><div className="grid grid-cols-3 gap-2 mb-5">{chord.notes.map((chordNote) => <div key={chordNote} className={`rounded-lg p-3 text-center border ${detectedNotes.includes(chordNote) ? 'border-green-400 bg-green-400/10' : 'border-charcoal-700 bg-charcoal-800'}`}><div className="text-xl font-bold text-cream-100">{chordNote}</div><div className="text-[10px] uppercase text-cream-200/50">{detectedNotes.includes(chordNote) ? 'heard' : 'listen'}</div></div>)}</div><p className="text-sm text-cream-200/70">{detectedNotes.length ? `Heard: ${detectedNotes.join(', ')}. ${detectedNotes.some((item) => !chord.notes.includes(item)) ? 'One note does not belong to this chord.' : 'These notes belong to the chord.'}` : 'We will show each note as the microphone hears it.'}</p></div><div className="card"><div className="flex justify-between items-center mb-4"><h2 className="text-xl font-display font-bold text-cream-100">{note || '--'}</h2><span className="text-sm text-cream-200/60">confidence {confidence ? `${(confidence * 100).toFixed(0)}%` : '--'}</span></div><p className="text-sm text-cream-200/70">For the clearest reading, mute unused strings and strum slowly across the strings marked open or fretted.</p></div><button onClick={isListening ? stopPractice : startPractice} className="btn-primary w-full">{isListening ? 'Finish Sound Check' : completed ? 'Try Again' : 'Start Guided Practice'}</button></aside>
        </div>
        {completed && <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card mt-6 text-center border-orange-500/40"><p className="text-orange-400 text-sm font-semibold tracking-widest">SESSION COMPLETE</p><div className="text-6xl font-display font-bold text-cream-100 mt-2">{score}%</div><p className="text-cream-200/70 mt-2">Measured from pitch confidence and chord tones heard.</p></motion.div>}
        {completed && <Link to="/learning-path" className="btn-primary w-full text-center block mt-3">Continue Learning</Link>}
        {error && <p className="text-red-400 text-sm text-center mt-3">{error}</p>}
      </motion.div>
    </div>
  );
}
