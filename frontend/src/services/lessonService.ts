import api from './api';

export const lessonService = {
  async getLessons(courseId?: string) {
    const params = courseId ? { courseId } : {};
    const response = await api.get('/lessons', { params });
    return response.data.data;
  },

  async getLessonById(id: string) {
    const response = await api.get(`/lessons/${id}`);
    return response.data.data;
  },

  async createLesson(data: any) {
    const response = await api.post('/lessons', data);
    return response.data.data;
  },

  async updateLesson(id: string, data: any) {
    const response = await api.put(`/lessons/${id}`, data);
    return response.data.data;
  },

  async deleteLesson(id: string) {
    const response = await api.delete(`/lessons/${id}`);
    return response.data;
  },

  async completeLesson(id: string) {
    const response = await api.post(`/lessons/${id}/complete`);
    return response.data.data;
  },
};
