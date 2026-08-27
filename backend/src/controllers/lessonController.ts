import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getLessons = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.query;
    const lessons = await prisma.lesson.findMany({
      where: courseId ? { courseId: courseId as string } : { published: true },
      orderBy: { order: 'asc' },
    });
    res.json({ success: true, data: lessons });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch lessons' });
  }
};

export const getLessonById = async (req: Request, res: Response) => {
  try {
    const lesson = await prisma.lesson.findUnique({
      where: { id: req.params.id },
    });
    if (!lesson) {
      return res.status(404).json({ success: false, error: 'Lesson not found' });
    }
    res.json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch lesson' });
  }
};

export const createLesson = async (req: Request, res: Response) => {
  try {
    const lesson = await prisma.lesson.create({
      data: req.body,
    });
    res.status(201).json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create lesson' });
  }
};

export const updateLesson = async (req: Request, res: Response) => {
  try {
    const lesson = await prisma.lesson.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: lesson });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update lesson' });
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  try {
    await prisma.lesson.delete({
      where: { id: req.params.id },
    });
    res.json({ success: true, message: 'Lesson deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete lesson' });
  }
};

export const completeLesson = async (req: any, res: Response) => {
  try {
    const { lessonId } = req.params;
    const progress = await prisma.studentProgress.upsert({
      where: {
        studentId_lessonId: {
          studentId: req.user.id,
          lessonId,
        },
      },
      update: {
        completed: true,
        progress: 100,
        completedAt: new Date(),
      },
      create: {
        studentId: req.user.id,
        lessonId,
        completed: true,
        progress: 100,
        completedAt: new Date(),
      },
    });
    res.json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to complete lesson' });
  }
};
