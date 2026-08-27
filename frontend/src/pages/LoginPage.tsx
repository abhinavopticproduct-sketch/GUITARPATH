import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '@store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Demo login - replace with actual API call
    if (email && password) {
      // Mock user data
      const mockUser = {
        id: '1',
        name: email.split('@')[0],
        email,
        role: 'student' as const,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token';
      
      setAuth(mockUser, mockToken);
      navigate('/dashboard');
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card">
          <h1 className="text-3xl font-display font-bold text-cream-100 mb-2 text-center">
            Welcome Back
          </h1>
          <p className="text-cream-200/70 text-center mb-8">
            Sign in to continue your guitar journey
          </p>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-cream-200 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-cream-200 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-cream-200/70">
              Don't have an account?{' '}
              <Link to="/register" className="text-orange-500 hover:text-orange-400">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
