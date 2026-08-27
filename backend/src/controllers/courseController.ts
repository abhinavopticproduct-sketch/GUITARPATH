import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      where: { published: true },
      include: { lessons: true },
    });
    res.json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch courses' });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: { lessons: true },
    });
    if (!course) {
      return res.status(404).json({ success: false, error: 'Course not found' });
    }
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch course' });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.create({
      data: req.body,
    });
    res.status(201).json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create course' });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update course' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    await prisma.course.delete({
      where: { id: req.params.id },
    });
    res.json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete course' });
  }
};
