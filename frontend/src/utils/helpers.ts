// Utility functions for the application

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

export const calculateLevel = (xp: number): number => {
  let level = 1;
  let xpNeeded = 100;
  
  while (xp >= xpNeeded && level < 10) {
    xp -= xpNeeded;
    level++;
    xpNeeded = Math.floor(xpNeeded * 1.5);
  }
  
  return level;
};

export const getXpForNextLevel = (currentLevel: number): number => {
  if (currentLevel >= 10) return 0;
  return Math.floor(100 * Math.pow(1.5, currentLevel - 1));
};

export const getProgressPercentage = (current: number, total: number): number => {
  if (total === 0) return 0;
  return Math.min(100, Math.max(0, (current / total) * 100));
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const getGradeColor = (grade: string): string => {
  const colors: { [key: string]: string } = {
    'A+': 'text-green-400',
    'A': 'text-green-400',
    'A-': 'text-green-300',
    'B+': 'text-blue-400',
    'B': 'text-blue-400',
    'B-': 'text-blue-300',
    'C+': 'text-yellow-400',
    'C': 'text-yellow-400',
    'C-': 'text-yellow-300',
    'D': 'text-orange-400',
    'F': 'text-red-400',
  };
  return colors[grade] || 'text-gray-400';
};

export const getScoreColor = (score: number): string => {
  if (score >= 90) return 'text-green-400';
  if (score >= 75) return 'text-blue-400';
  if (score >= 60) return 'text-yellow-400';
  if (score >= 50) return 'text-orange-400';
  return 'text-red-400';
};

export const getProgressBarColor = (percentage: number): string => {
  if (percentage >= 90) return 'bg-green-500';
  if (percentage >= 75) return 'bg-blue-500';
  if (percentage >= 60) return 'bg-yellow-500';
  if (percentage >= 50) return 'bg-orange-500';
  return 'bg-red-500';
};

export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return d.toLocaleDateString();
};

export const formatDateTime = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const calculateStreak = (practiceDates: Date[]): number => {
  if (practiceDates.length === 0) return 0;
  
  const sortedDates = [...practiceDates].sort((a, b) => b.getTime() - a.getTime());
  let streak = 0;
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  
  for (const date of sortedDates) {
    const practiceDate = new Date(date);
    practiceDate.setHours(0, 0, 0, 0);
    
    const diffDays = Math.floor((currentDate.getTime() - practiceDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === streak) {
      streak++;
      currentDate = new Date(practiceDate.getTime() - 24 * 60 * 60 * 1000);
    } else {
      break;
    }
  }
  
  return streak;
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  return { valid: true };
};

export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

export const getRandomTip = (): string => {
  const tips = [
    'Practice for at least 10 minutes every day for best results.',
    'Start slow and gradually increase speed as you improve.',
    'Focus on accuracy first, speed will come naturally.',
    'Record yourself playing to track your progress.',
    'Take breaks to avoid fatigue and maintain focus.',
    'Learn the basics thoroughly before moving to advanced techniques.',
    'Play along with songs you enjoy to stay motivated.',
    'Use a metronome to develop solid timing skills.',
    'Don\'t compare your progress to others - everyone learns at their own pace.',
    'Celebrate small victories to stay motivated on your guitar journey.',
  ];
  return tips[Math.floor(Math.random() * tips.length)];
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

export const downloadFile = (content: string, filename: string, mimeType: string = 'text/plain'): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const isMobile = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const getErrorMessage = (error: any): string => {
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  if (error?.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
