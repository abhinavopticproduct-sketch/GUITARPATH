import api from './api';

export const teacherService = {
  async getTeacherStudents(teacherId: string) {
    const response = await api.get(`/teachers/${teacherId}/students`);
    return response.data.data;
  },

  async getTeacherClasses(teacherId: string) {
    const response = await api.get(`/teachers/${teacherId}/classes`);
    return response.data.data;
  },
};
