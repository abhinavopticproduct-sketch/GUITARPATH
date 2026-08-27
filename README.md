# GuitarPath 🎸

**Learn. Play. Improve.**

A modern, AI-powered guitar learning platform that combines structured lessons, interactive practice, intelligent audio analysis, and real teacher support.

## 🌟 Features

### For Students
- **Structured Learning Path**: 16 beginner lessons from guitar basics to first songs
- **Interactive Practice**: Real-time microphone analysis of your playing
- **Smart Feedback**: AI-powered performance scoring and personalized recommendations
- **Practice Tools**: Built-in guitar tuner and metronome
- **Progress Tracking**: Visual charts showing improvement over time
- **Teacher Support**: Assignments, feedback, and live classes

### For Teachers
- **Student Dashboard**: Monitor all students and their progress
- **Performance Analytics**: Detailed charts and practice history
- **Assignments**: Create and track student exercises
- **Feedback System**: Provide personalized guidance
- **Class Management**: Organize students into learning groups

### For Admin
- **Content Management**: Manage courses, lessons, and exercises
- **User Management**: oversee students, teachers, and admin accounts
- **Platform Control**: Full administrative oversight

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Framer Motion** - Animations
- **TanStack Query** - Data fetching
- **Zustand** - State management
- **Recharts** - Data visualization

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **PostgreSQL** - Database (Neon)

### Audio Processing
- **Web Audio API** - Audio processing
- **AudioWorklet** - Real-time audio analysis
- **FFT Analysis** - Frequency detection
- **Pitch Detection** - Note recognition
- **Chord Detection** - Pattern recognition

### Deployment
- **Vercel** - Frontend & API hosting
- **Neon PostgreSQL** - Database
- **GitHub** - Source control

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git account
- Neon PostgreSQL account (free tier available)
- Vercel account (free tier available)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd guitarpath
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install root dependencies
cd ..
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
JWT_SECRET=your-secret-key-here
VITE_API_URL=http://localhost:3001
```

### 4. Set Up Neon PostgreSQL

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new PostgreSQL database
3. Copy the connection string
4. Add it to your `.env` file as `DATABASE_URL`

### 5. Run Database Migrations

```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### 6. Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`
The backend API will be available at `http://localhost:3001`

## 🏗️ Project Structure

```
guitarpath/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── layouts/         # Layout components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API services
│   │   ├── store/           # State management
│   │   ├── audio/           # Audio processing modules
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   └── package.json
│
├── backend/                  # Express API
│   ├── src/
│   │   ├── routes/          # API routes
│   │   ├── controllers/     # Request handlers
│   │   ├── services/        # Business logic
│   │   ├── middleware/      # Express middleware
│   │   ├── ai/              # AI feedback engine
│   │   └── utils/           # Utility functions
│   └── package.json
│
├── prisma/                   # Database schema
│   └── schema.prisma
│
├── shared/                   # Shared types
│   └── types/
│
└── README.md
```

## 🎯 Development Commands

```bash
# Frontend
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Backend
cd backend
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma generate  # Generate Prisma client
npx prisma migrate dev  # Run migrations
npx prisma db seed   # Seed database
npx prisma studio    # Open Prisma Studio
```

## 🚢 Deployment

### Vercel Deployment

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy on Vercel**

- Import your GitHub repository to Vercel
- Set environment variables in Vercel dashboard:
  - `DATABASE_URL` - Your Neon PostgreSQL connection string
  - `JWT_SECRET` - Your JWT secret key
- Deploy

3. **Configure Vercel**

Vercel will automatically detect both frontend and backend. Configure:
- Root directory: `./`
- Build command: `npm run build`
- Output directory: `frontend/dist`

### Environment Variables for Production

Add these in Vercel:
- `DATABASE_URL` - Neon PostgreSQL connection string
- `JWT_SECRET` - Secure random string
- `NODE_ENV` - `production`

## 🎵 Demo Data

The application includes realistic seed data:
- 5 demo students
- 2 demo teachers  
- Complete beginner course with 16 lessons
- Practice sessions and performance data
- Assignments and classes

## 🔐 Security

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Role-based access control (Student, Teacher, Admin)
- Input validation and sanitization
- CORS configured for production domains
- Environment variables for sensitive data

**Never commit `.env` file or sensitive credentials to GitHub.**

## 🎤 Audio Processing

The application uses the Web Audio API for:
- Real-time microphone input
- Pitch detection using autocorrelation
- Note identification
- Basic chord recognition
- Timing and rhythm analysis

Audio is processed locally in the browser for privacy and performance.

## 📱 Responsive Design

GuitarPath works seamlessly on:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (320px+)

## ♿ Accessibility

- Keyboard navigation support
- ARIA labels for screen readers
- High contrast ratios
- Large touch targets
- Semantic HTML structure

## 🎮 Gamification

Students earn:
- **XP** - Experience points for completing lessons
- **Levels** - Unlock as you progress
- **Streaks** - Consistent practice rewards
- **Badges** - Achievement milestones
- **Achievements** - Special accomplishments

## 📊 Analytics

- Practice time tracking
- Accuracy metrics
- Performance charts
- Progress visualization
- Weak area identification

## 🤝 Contributing

This is a complete application built as specified. For modifications:

1. Follow the existing code patterns
2. Maintain TypeScript type safety
3. Test audio features thoroughly
4. Update documentation as needed

## 📄 License

This project is created as a complete guitar learning platform.

## 🎸 Learning Path

The beginner course covers:

1. Meet Your Guitar
2. Guitar Parts
3. How to Hold the Guitar
4. Using a Guitar Pick
5. Understanding Guitar Strings
6. Tune Your Guitar
7. Playing Your First Note
8. Your First Chord — Em
9. A Minor
10. C Major
11. G Major
12. D Major
13. Chord Switching
14. Basic Downstroke
15. Down-Up Strumming
16. Your First Song

## 🆘 Support

For issues or questions:
- Check the documentation
- Review the code comments
- Test with different browsers (Chrome recommended for audio features)

---

**Built with ❤️ for guitar learners everywhere**

*Learn. Play. Improve.* 🎸
