import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const startPractice = async (req: any, res: Response) => {
  try {
    const { lessonId, exerciseId } = req.body;
    const student = await prisma.studentProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!student) {
      return res.status(404).json({ success: false, error: 'Student profile not found' });
    }

    const session = await prisma.practiceSession.create({
      data: {
        studentId: student.id,
        lessonId,
        exerciseId,
        startTime: new Date(),
        duration: 0,
        accuracy: 0,
        pitchScore: 0,
        timingScore: 0,
        rhythmScore: 0,
        chordScore: 0,
        overallScore: 0,
        detectedNotes: [],
        expectedNotes: [],
        confidence: 0,
      },
    });
    res.status(201).json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to start practice' });
  }
};

export const submitPracticeResult = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const result = req.body;
    const student = await prisma.studentProfile.findUnique({
      where: { userId: req.user.id },
    });

    if (!student) {
      return res.status(404).json({ success: false, error: 'Student profile not found' });
    }

    const existingSession = await prisma.practiceSession.findFirst({
      where: { id, studentId: student.id },
    });

    if (!existingSession) {
      return res.status(404).json({ success: false, error: 'Practice session not found' });
    }
    
    const session = await prisma.practiceSession.update({
      where: { id },
      data: {
        endTime: new Date(),
        duration: Math.floor((new Date().getTime() - existingSession.startTime.getTime()) / 1000),
        accuracy: result.accuracy,
        pitchScore: result.pitchScore,
        timingScore: result.timingScore,
        rhythmScore: result.rhythmScore,
        chordScore: result.chordScore,
        overallScore: result.overallScore,
        detectedNotes: result.detectedNotes,
        expectedNotes: result.expectedNotes,
        detectedChord: result.detectedChord,
        expectedChord: result.expectedChord,
        confidence: result.confidence,
      },
    });
    
    // Update student XP
    const xpGained = Math.floor(result.overallScore);
    await prisma.studentProfile.update({
      where: { userId: req.user.id },
      data: {
        xp: { increment: xpGained },
        totalPracticeMinutes: { increment: Math.floor(session.duration / 60) },
      },
    });
    
    res.json({ success: true, data: session });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to submit practice result' });
  }
};

export const getPracticeHistory = async (req: any, res: Response) => {
  try {
    const history = await prisma.practiceSession.findMany({
      where: { studentId: req.user.id },
      orderBy: { startTime: 'desc' },
      take: 20,
    });
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch practice history' });
  }
};
