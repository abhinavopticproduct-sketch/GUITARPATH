# GuitarPath Development Guide

This document contains important information for developers working on the GuitarPath project.

## Project Overview

GuitarPath is an AI-powered guitar learning platform built with:
- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL (Neon) with Prisma ORM
- **Audio Processing**: Web Audio API, pitch detection, chord recognition

## Development Commands

### Root Commands
```bash
npm install                    # Install all dependencies
npm run dev                    # Start both frontend and backend
npm run build                  # Build both frontend and backend
npm run start                  # Start production server
```

### Database Commands
```bash
npm run db:generate            # Generate Prisma client
npm run db:migrate             # Run database migrations
npm run db:seed                # Seed database with demo data
npm run db:push                # Push schema changes to database
npm run db:studio              # Open Prisma Studio
```

### Frontend Commands
```bash
cd frontend
npm run dev                    # Start development server (http://localhost:5173)
npm run build                  # Build for production
npm run preview                # Preview production build
```

### Backend Commands
```bash
cd backend
npm run dev                    # Start development server (http://localhost:3001)
npm run build                  # Build for production
npm run start                  # Start production server
```

## Environment Setup

### 1. Create `.env` file in root directory
```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
JWT_SECRET=your-secret-key-here
VITE_API_URL=http://localhost:3001
```

### 2. Create `.env` file in frontend directory
```env
VITE_API_URL=http://localhost:3001/api
```

### 3. Create `.env` file in backend directory
```env
DATABASE_URL=postgresql://user:password@host/database?sslmode=require
JWT_SECRET=your-secret-key-here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Database Setup with Neon

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new PostgreSQL database
3. Copy the connection string
4. Add it to your `.env` file as `DATABASE_URL`
5. Run `npm run db:generate`
6. Run `npm run db:migrate`
7. Run `npm run db:seed`

## Project Structure

```
guitarpath/
├── frontend/                 # React application
│   ├── src/
│   │   ├── audio/           # Audio processing modules
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── store/           # State management
│   │   ├── types/           # TypeScript types
│   │   └── utils/           # Utility functions
│   └── package.json
│
├── backend/                  # Express API
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API routes
│   │   └── services/        # Business logic
│   └── package.json
│
├── prisma/                   # Database schema
│   ├── schema.prisma
│   └── seed.ts
│
├── shared/                   # Shared types
│   └── types/
│
└── package.json
```

## Key Features Implemented

### Student Features
- ✅ Registration and authentication
- ✅ Student onboarding flow
- ✅ Student dashboard with progress tracking
- ✅ Learning path with 16 beginner lessons
- ✅ Interactive chord diagrams and chord library
- ✅ Guitar tuner using Web Audio API
- ✅ Metronome functionality
- ✅ Microphone permission and access
- ✅ Audio processing module (pitch detection, chord detection)
- ✅ Practice system with performance scoring
- ✅ Progress analytics
- ✅ Gamification (XP, levels, badges, achievements)

### Teacher Features
- ✅ Teacher dashboard with student overview
- ✅ Student list and performance tracking
- ✅ Practice history review
- ✅ Assignment creation and management
- ✅ Teacher feedback system
- ✅ Class management

### Admin Features
- ✅ Admin dashboard
- ✅ User management interfaces
- ✅ Course and lesson management

### Audio Processing
- ✅ Microphone access and audio capture
- ✅ Audio processing (noise reduction, filtering)
- ✅ Pitch detection (autocorrelation and YIN algorithms)
- ✅ Note detection and analysis
- ✅ Chord detection (basic implementation)
- ✅ Rhythm detection and timing analysis
- ✅ Performance scoring system
- ✅ AI feedback engine

## Deployment

### Vercel Deployment

1. Push code to GitHub
2. Import repository to Vercel
3. Add environment variables:
   - `DATABASE_URL` - Neon PostgreSQL connection string
   - `JWT_SECRET` - Secure random string
4. Deploy

### Environment Variables for Production
- `DATABASE_URL` - Neon PostgreSQL connection string
- `JWT_SECRET` - Secure random string
- `NODE_ENV` - `production`
- `FRONTEND_URL` - Production frontend URL

## Audio Processing Notes

The audio processing system is designed to work entirely in the browser:

1. **Microphone Access**: Uses Web Audio API with proper permission handling
2. **Pitch Detection**: Implements autocorrelation and YIN algorithms
3. **Chord Detection**: Basic pattern matching for common guitar chords
4. **Performance Scoring**: Multi-metric scoring system with weighted components
5. **Feedback Engine**: Context-aware feedback based on performance analysis

## Important Constraints

- **No Credit Card Required**: All services used are free tier or open-source
- **No Fake Scores**: The system uses actual audio analysis, not random values
- **Privacy-First**: Audio is processed locally, not stored
- **Browser-Based**: All audio processing happens in the user's browser

## Testing

### Manual Testing Checklist

1. **Authentication**
   - [ ] User registration works
   - [ ] Login/logout functions correctly
   - [ ] Role-based access control works

2. **Student Features**
   - [ ] Onboarding flow completes
   - [ ] Dashboard displays correctly
   - [ ] Learning path navigation works
   - [ ] Lesson pages load with content
   - [ ] Practice mode starts and stops

3. **Audio Features**
   - [ ] Microphone permission requested
   - [ ] Guitar tuner detects pitch
   - [ ] Metronome keeps accurate time
   - [ ] Pitch detection works for guitar notes
   - [ ] Chord detection identifies basic chords

4. **Teacher Features**
   - [ ] Teacher dashboard loads
   - [ ] Student list displays
   - [ ] Assignments can be created
   - [ ] Feedback can be submitted

## Common Issues

### Microphone Access Denied
- Ensure browser permissions allow microphone access
- Check that the site is served over HTTPS (or localhost)
- Verify that no other application is using the microphone

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Ensure Neon database is active
- Check network connectivity

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist && npm run build`

## Future Enhancements

- Advanced chord detection with machine learning
- Real-time song mode with backing tracks
- Video integration for live classes
- Mobile app (React Native)
- Advanced analytics and reporting
- Community features and forums

## Support

For issues or questions:
1. Check this documentation
2. Review code comments
3. Test with different browsers (Chrome recommended for audio features)
4. Check GitHub issues for known problems

---

**Remember**: This is a complete, functional application designed for free deployment. Focus on the user journey from "I don't know how to play guitar" to "I can actually play guitar."
