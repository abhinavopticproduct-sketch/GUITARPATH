import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getTeacherStudents = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const teacher = await prisma.teacherProfile.findUnique({
      where: { userId: id },
    });

    if (!teacher) {
      return res.status(404).json({ success: false, error: 'Teacher profile not found' });
    }

    const classes = await prisma.class.findMany({
      where: { teacherId: teacher.id },
      include: {
        members: {
          include: {
            student: {
              include: {
                user: true,
                profile: true,
              },
            },
          },
        },
      },
    });
    
    const students = classes.flatMap((cls: any) => 
      cls.members.map((member: any) => member.student)
    );
    
    res.json({ success: true, data: students });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch teacher students' });
  }
};

export const getTeacherClasses = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const teacher = await prisma.teacherProfile.findUnique({
      where: { userId: id },
    });

    if (!teacher) {
      return res.status(404).json({ success: false, error: 'Teacher profile not found' });
    }

    const classes = await prisma.class.findMany({
      where: { teacherId: teacher.id },
      include: {
        _count: {
          select: { members: true },
        },
      },
    });
    res.json({ success: true, data: classes });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch teacher classes' });
  }
};
