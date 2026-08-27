import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createFeedback = async (req: any, res: Response) => {
  try {
    const feedback = await prisma.teacherFeedback.create({
      data: {
        ...req.body,
        teacherId: req.user.id,
      },
    });
    res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create feedback' });
  }
};

export const getStudentFeedback = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const feedback = await prisma.teacherFeedback.findMany({
      where: { studentId },
      include: {
        teacher: {
          include: { user: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    res.json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch student feedback' });
  }
};

export const getTeacherFeedback = async (req: Request, res: Response) => {
  try {
    const { teacherId } = req.params;
    const feedback = await prisma.teacherFeedback.findMany({
      where: { teacherId },
      include: {
        student: {
          include: { user: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    res.json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch teacher feedback' });
  }
};
