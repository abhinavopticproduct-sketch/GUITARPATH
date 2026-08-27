import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const chordShapes: Record<string, { positions: string[]; fingers: string[] }> = {
  Em: { positions: ['0', '0', '0', '2', '2', '0'], fingers: ['', '', '', '1', '2', ''] },
  Am: { positions: ['0', '1', '2', '2', '0', 'x'], fingers: ['', '1', '2', '3', '', ''] },
  C: { positions: ['0', '1', '0', '2', '3', 'x'], fingers: ['', '1', '', '2', '3', ''] },
  G: { positions: ['3', '0', '0', '0', '2', '3'], fingers: ['2', '', '', '', '1', '3'] },
  D: { positions: ['2', '3', '2', '0', 'x', 'x'], fingers: ['1', '3', '2', '', '', ''] },
  E: { positions: ['0', '0', '1', '2', '2', '0'], fingers: ['', '', '1', '2', '3', ''] },
  A: { positions: ['0', '2', '2', '2', '0', 'x'], fingers: ['', '1', '2', '3', '', ''] },
};

const lessonDetails: Record<string, { title: string; description: string; steps: string[]; chord?: string }> = {
  'Meet Your Guitar': { title: 'Meet Your Guitar', description: 'Learn the names of the parts you will use in every lesson.', steps: ['Hold the guitar body against your leg.', 'Find the body, neck, headstock, tuning pegs, bridge, and strings.', 'Say each part out loud once.'] },
  'Guitar Parts': { title: 'Guitar Parts', description: 'A quick tour of the guitar, explained one part at a time.', steps: ['Point to the body and sound hole.', 'Trace the neck to the frets.', 'Find the tuning pegs at the headstock.'] },
  'Correct Posture': { title: 'Correct Posture', description: 'A relaxed position makes every note easier to play.', steps: ['Sit tall with both feet supported.', 'Rest the guitar on your leg.', 'Keep your fretting thumb behind the neck.'] },
  'Holding the Pick': { title: 'Holding the Pick', description: 'Use a light grip so the pick can move across the strings.', steps: ['Place the pick on your index finger.', 'Cover it gently with your thumb.', 'Keep only a small tip showing.'] },
  'Guitar Strings': { title: 'Understanding Guitar Strings', description: 'Learn the six strings from thickest to thinnest.', steps: ['Name them: low E, A, D, G, B, high E.', 'Play each open string slowly.', 'Listen for the change in pitch.'] },
  'Standard Tuning': { title: 'Standard Tuning', description: 'Tune each string before you practice so your feedback is accurate.', steps: ['Open the tuner and allow the microphone.', 'Tune low E, A, D, G, B, then high E.', 'Pluck one string at a time.'] },
  'Playing Your First Note': { title: 'Playing Your First Note', description: 'Make one clean note with one fingertip and a gentle pick stroke.', steps: ['Place one fingertip just behind a fret.', 'Press only hard enough to stop the buzz.', 'Pick once and let the note ring.'] },
  'Your First Chord — Em': { title: 'Your First Chord — Em', description: 'Em is your first two-finger chord. Keep the other strings open.', steps: ['Place finger 1 on the A string, 2nd fret.', 'Place finger 2 on the D string, 2nd fret.', 'Strum all six strings slowly.', 'Listen for a clear, ringing sound.'], chord: 'Em' },
  'A Minor': { title: 'A Minor', description: 'A minor uses three fingers close together on the middle strings.', steps: ['Place fingers 1, 2, and 3 on the B, D, and G strings.', 'Keep the high E and A strings open.', 'Strum from the A string down.'], chord: 'Am' },
  'C Major': { title: 'C Major', description: 'C major reaches across three strings. Keep each finger curved.', steps: ['Place one finger on the B string, 1st fret.', 'Place one on D, 2nd fret, and one on A, 3rd fret.', 'Strum from the A string down.'], chord: 'C' },
  'G Major': { title: 'G Major', description: 'G major is a wide shape that sounds bright and open.', steps: ['Place fingers on the low E and high E, 3rd fret.', 'Place one finger on the A string, 2nd fret.', 'Strum all six strings.'], chord: 'G' },
  'D Major': { title: 'D Major', description: 'D major is a small triangle shape on the highest four strings.', steps: ['Place fingers on G, B, and high E strings.', 'Leave the D string open.', 'Strum only the highest four strings.'], chord: 'D' },
};

export default function LessonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quizComplete, setQuizComplete] = useState(false);
  const lessonName = decodeURIComponent(id || 'Your First Chord — Em');
  const chordLesson = chordShapes[lessonName] ? {
    title: `${lessonName} chord`,
    description: `Learn the ${lessonName} chord one finger at a time, then listen for a clear ringing sound.`,
    steps: ['Look at the clear chord guide below.', 'Place each finger behind its fret.', 'Strum slowly and check that every played string rings.'],
    chord: lessonName,
  } : undefined;
  const lesson = lessonDetails[lessonName] || chordLesson || { title: lessonName, description: 'Follow this short practice lesson and play at your own pace.', steps: ['Watch the short lesson.', 'Follow the steps slowly.', 'Play the exercise and listen carefully.'] };
  const chord = lesson.chord ? chordShapes[lesson.chord] : undefined;
  const videoSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${lesson.title} beginner guitar shorts`)}`;

  return (
    <div className="min-h-screen bg-charcoal-950">
      <header className="glass-effect border-b border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-display font-bold text-cream-100">Beginner Lesson</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="card overflow-hidden">
            <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-8 items-center mb-8">
              <div>
                <p className="text-orange-400 font-semibold mb-3">STEP 1 · WATCH</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-cream-100 mb-4">{lesson.title}</h2>
                <p className="text-lg text-cream-200/80 leading-relaxed">{lesson.description}</p>
              </div>
              <img src="https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=900&q=85" alt="Acoustic guitar ready for a beginner lesson" className="w-full aspect-[4/3] object-cover rounded-xl border border-charcoal-700" />
            </div>

            <a href={videoSearch} target="_blank" rel="noreferrer" className="block bg-charcoal-800 rounded-xl overflow-hidden mb-8 border border-charcoal-700 hover:border-orange-500 transition-colors">
              <div className="aspect-video bg-gradient-to-br from-charcoal-700 to-charcoal-900 flex items-center justify-center">
                <div className="text-center"><div className="text-5xl mb-3">▶</div><p className="text-cream-100 font-semibold">Watch a {lesson.title} short on YouTube</p><p className="text-cream-200/60 text-sm mt-1">Opens beginner-friendly results in a new tab</p></div>
              </div>
            </a>

            <div className="grid md:grid-cols-[1fr_0.8fr] gap-8 mb-8">
              <div>
                <p className="text-orange-400 font-semibold mb-3">STEP 2 · UNDERSTAND</p>
                <h3 className="text-2xl font-semibold text-cream-100 mb-4">Follow these small steps</h3>
                <ol className="space-y-4">{lesson.steps.map((step, index) => <li key={step} className="flex gap-4 items-start"><span className="flex-none w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">{index + 1}</span><span className="text-cream-200 leading-relaxed pt-1">{step}</span></li>)}</ol>
              </div>
              {chord && <div className="bg-cream-100 rounded-xl p-5 text-charcoal-950"><p className="text-sm font-semibold text-orange-700 mb-1">CLEAR CHORD GUIDE</p><h3 className="text-3xl font-display font-bold mb-4">{lesson.chord}</h3><div className="space-y-2">{['e', 'B', 'G', 'D', 'A', 'E'].map((string, index) => <div key={`${string}-${index}`} className="flex items-center gap-3"><span className="w-5 font-bold">{string}</span><span className="flex-1 h-1 bg-charcoal-700 rounded" /><span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${chord.positions[index] === 'x' ? 'bg-red-200 text-red-700' : chord.fingers[index] ? 'bg-orange-500 text-white' : 'bg-green-200 text-green-800'}`}>{chord.positions[index] === 'x' ? 'X' : chord.positions[index]} </span></div>)}</div><p className="text-xs mt-4 text-charcoal-600">0 = open string · X = do not play</p></div>}
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
              <button onClick={() => setQuizComplete(true)} className="btn-secondary">
                {quizComplete ? 'Quiz Complete' : 'Take Quiz'}
              </button>
              {quizComplete && <p className="text-green-400 text-sm mt-3">Correct. You are ready to practice.</p>}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
