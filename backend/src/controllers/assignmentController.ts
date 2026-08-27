import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAssignments = async (req: any, res: Response) => {
  try {
    const assignments = await prisma.assignment.findMany({
      where: req.user.role === 'teacher' 
        ? { teacherId: req.user.id }
        : { class: { members: { some: { studentId: req.user.id } } } },
      include: {
        class: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch assignments' });
  }
};

export const createAssignment = async (req: any, res: Response) => {
  try {
    const assignment = await prisma.assignment.create({
      data: {
        ...req.body,
        teacherId: req.user.id,
      },
    });
    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create assignment' });
  }
};

export const updateAssignment = async (req: Request, res: Response) => {
  try {
    const assignment = await prisma.assignment.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: assignment });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update assignment' });
  }
};

export const deleteAssignment = async (req: Request, res: Response) => {
  try {
    await prisma.assignment.delete({
      where: { id: req.params.id },
    });
    res.json({ success: true, message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete assignment' });
  }
};
