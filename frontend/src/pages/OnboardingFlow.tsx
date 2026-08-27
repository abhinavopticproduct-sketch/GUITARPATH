import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { studentService } from '@services/studentService';
import { useAuthStore } from '@store/authStore';

type OnboardingData = {
  hasGuitar: boolean;
  guitarType: 'acoustic' | 'electric' | 'classical';
  experienceLevel: 'never' | 'little' | 'beginner' | 'intermediate';
  learningGoal: string;
  practiceGoal: number;
};

export default function OnboardingFlow() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    hasGuitar: false,
    guitarType: 'acoustic',
    experienceLevel: 'never',
    learningGoal: '',
    practiceGoal: 10,
  });
  const navigate = useNavigate();
  const { setStudentProfile } = useAuthStore();

  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      try {
        const profile = await studentService.updateStudentProfile({
          guitarType: data.guitarType,
          experienceLevel: data.experienceLevel,
          learningGoal: data.learningGoal,
          practiceGoal: data.practiceGoal,
          completedOnboarding: true,
        });
        setStudentProfile(profile);
        navigate('/dashboard');
      } catch {
        navigate('/dashboard');
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const steps = [
    {
      title: 'Do you own a guitar?',
      content: (
        <div className="space-y-4">
          <button
            onClick={() => setData({ ...data, hasGuitar: true })}
            className={`w-full p-6 rounded-lg border-2 transition-all ${
              data.hasGuitar ? 'border-orange-500 bg-orange-500/10' : 'border-charcoal-700 hover:border-charcoal-600'
            }`}
          >
            <div className="text-2xl mb-2">🎸</div>
            <div className="text-xl font-medium text-cream-100">Yes</div>
          </button>
          <button
            onClick={() => setData({ ...data, hasGuitar: false })}
            className={`w-full p-6 rounded-lg border-2 transition-all ${
              !data.hasGuitar ? 'border-orange-500 bg-orange-500/10' : 'border-charcoal-700 hover:border-charcoal-600'
            }`}
          >
            <div className="text-2xl mb-2">🤔</div>
            <div className="text-xl font-medium text-cream-100">No</div>
          </button>
        </div>
      ),
    },
    {
      title: 'What guitar do you use?',
      content: (
        <div className="space-y-4">
          {(['acoustic', 'electric', 'classical'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setData({ ...data, guitarType: type })}
              className={`w-full p-6 rounded-lg border-2 transition-all ${
                data.guitarType === type ? 'border-orange-500 bg-orange-500/10' : 'border-charcoal-700 hover:border-charcoal-600'
              }`}
            >
              <div className="text-2xl mb-2">{type === 'acoustic' ? '🎸' : type === 'electric' ? '⚡' : '🎻'}</div>
              <div className="text-xl font-medium text-cream-100 capitalize">{type}</div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'Have you played before?',
      content: (
        <div className="space-y-4">
          {(['never', 'little', 'beginner', 'intermediate'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setData({ ...data, experienceLevel: level })}
              className={`w-full p-6 rounded-lg border-2 transition-all ${
                data.experienceLevel === level ? 'border-orange-500 bg-orange-500/10' : 'border-charcoal-700 hover:border-charcoal-600'
              }`}
            >
              <div className="text-xl font-medium text-cream-100 capitalize">{level}</div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'What do you want to achieve?',
      content: (
        <div className="space-y-4">
          {['Play songs', 'Learn chords', 'Learn fingerstyle', 'Learn lead guitar', 'Improve rhythm', 'Become a guitarist'].map((goal) => (
            <button
              key={goal}
              onClick={() => setData({ ...data, learningGoal: goal })}
              className={`w-full p-6 rounded-lg border-2 transition-all ${
                data.learningGoal === goal ? 'border-orange-500 bg-orange-500/10' : 'border-charcoal-700 hover:border-charcoal-600'
              }`}
            >
              <div className="text-xl font-medium text-cream-100">{goal}</div>
            </button>
          ))}
        </div>
      ),
    },
    {
      title: 'How much can you practice?',
      content: (
        <div className="space-y-4">
          {[
            { minutes: 5, label: '5 minutes' },
            { minutes: 10, label: '10 minutes' },
            { minutes: 20, label: '20 minutes' },
            { minutes: 30, label: '30+ minutes' },
          ].map((option) => (
            <button
              key={option.minutes}
              onClick={() => setData({ ...data, practiceGoal: option.minutes })}
              className={`w-full p-6 rounded-lg border-2 transition-all ${
                data.practiceGoal === option.minutes ? 'border-orange-500 bg-orange-500/10' : 'border-charcoal-700 hover:border-charcoal-600'
              }`}
            >
              <div className="text-xl font-medium text-cream-100">{option.label}</div>
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <div className="card">
          {/* Progress indicator */}
          <div className="flex justify-between mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 mx-1 rounded-full ${
                  index < step ? 'bg-orange-500' : 'bg-charcoal-700'
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-display font-bold text-cream-100 mb-6 text-center">
                {steps[step - 1].title}
              </h2>
              {steps[step - 1].content}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button onClick={handleNext} className="btn-primary">
              {step === 5 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
