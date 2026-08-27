import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-charcoal-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-950 to-wood-900/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-cream-100 mb-6">
              Learn Guitar. One Step at a Time.
            </h1>
            <p className="text-xl md:text-2xl text-cream-200/80 mb-8 max-w-3xl mx-auto">
              Learn guitar through guided lessons, interactive practice, intelligent feedback, and real teacher support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/learning-path" className="btn-primary text-lg">
                Start Learning
              </Link>
              <Link to="/learning-path" className="btn-secondary text-lg">
                Explore Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold text-center text-cream-100 mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-5 gap-8">
            {[
              { step: '01', title: 'Learn', desc: 'Follow structured lessons.' },
              { step: '02', title: 'Practice', desc: 'Play directly with your guitar.' },
              { step: '03', title: 'Listen', desc: 'GuitarPath analyzes your playing.' },
              { step: '04', title: 'Improve', desc: 'Get instant feedback.' },
              { step: '05', title: 'Master', desc: 'Track progress with AI and teacher guidance.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-orange-500 text-2xl font-bold mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-cream-100 mb-2">{item.title}</h3>
                <p className="text-cream-200/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-charcoal-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-display font-bold text-center text-cream-100 mb-16">
            Why GuitarPath?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎸',
                title: 'Real Audio Analysis',
                desc: 'Our AI listens to your playing and provides instant, accurate feedback on pitch, timing, and technique.',
              },
              {
                icon: '👨‍🏫',
                title: 'Real Teachers',
                desc: 'Get personalized guidance from professional guitar teachers who track your progress and provide tailored feedback.',
              },
              {
                icon: '📊',
                title: 'Smart Progress',
                desc: 'Visual analytics show exactly where you improve and what needs more practice, adapting to your learning pace.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-cream-100 mb-2">{feature.title}</h3>
                <p className="text-cream-200/70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-6">
            Ready to Start Your Guitar Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students learning guitar the smart way.
          </p>
          <Link to="/learning-path" className="bg-white text-orange-600 font-semibold py-4 px-8 rounded-lg hover:bg-cream-100 transition-all duration-200 transform hover:scale-105">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal-900 border-t border-charcoal-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-cream-100 font-display text-2xl mb-4 md:mb-0">
              GuitarPath
            </div>
            <div className="text-cream-200/60 text-sm">
              © 2024 GuitarPath. Learn. Play. Improve.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
