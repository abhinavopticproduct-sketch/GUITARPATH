import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getClasses = async (req: any, res: Response) => {
  try {
    const classes = await prisma.class.findMany({
      where: req.user.role === 'teacher'
        ? { teacherId: req.user.id }
        : { members: { some: { studentId: req.user.id } } },
      include: {
        teacher: {
          include: { user: true },
        },
        _count: {
          select: { members: true },
        },
      },
    });
    res.json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch classes' });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    const classData = await prisma.class.findUnique({
      where: { id: req.params.id },
      include: {
        teacher: {
          include: { user: true },
        },
        members: {
          include: {
            student: {
              include: { user: true },
            },
          },
        },
      },
    });
    if (!classData) {
      return res.status(404).json({ success: false, error: 'Class not found' });
    }
    res.json({ success: true, data: classData });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch class' });
  }
};

export const createClass = async (req: any, res: Response) => {
  try {
    const classData = await prisma.class.create({
      data: {
        ...req.body,
        teacherId: req.user.id,
      },
    });
    res.status(201).json({ success: true, data: classData });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create class' });
  }
};

export const updateClass = async (req: Request, res: Response) => {
  try {
    const classData = await prisma.class.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: classData });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update class' });
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    await prisma.class.delete({
      where: { id: req.params.id },
    });
    res.json({ success: true, message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete class' });
  }
};
