import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getStudentProgress = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const progress = await prisma.studentProgress.findMany({
      where: { studentId: id },
      include: { lesson: true },
    });
    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch student progress' });
  }
};

export const getStudentAnalytics = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: id },
    });
    
    const practiceSessions = await prisma.practiceSession.findMany({
      where: { studentId: id },
      orderBy: { startTime: 'desc' },
      take: 50,
    });
    
    const averageScore = practiceSessions.length > 0
      ? practiceSessions.reduce((sum, session) => sum + session.overallScore, 0) / practiceSessions.length
      : 0;
    
    res.json({
      success: true,
      data: {
        profile,
        averageScore,
        totalSessions: practiceSessions.length,
        recentSessions: practiceSessions.slice(0, 10),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch student analytics' });
  }
};

export const updateStudentProfile = async (req: any, res: Response) => {
  try {
    const profile = await prisma.studentProfile.update({
      where: { userId: req.user.id },
      data: req.body,
    });
    res.json({ success: true, data: profile });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
};
