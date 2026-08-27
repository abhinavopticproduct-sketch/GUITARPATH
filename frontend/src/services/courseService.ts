import api from './api';

export const courseService = {
  async getCourses() {
    const response = await api.get('/courses');
    return response.data.data;
  },

  async getCourseById(id: string) {
    const response = await api.get(`/courses/${id}`);
    return response.data.data;
  },

  async createCourse(data: any) {
    const response = await api.post('/courses', data);
    return response.data.data;
  },

  async updateCourse(id: string, data: any) {
    const response = await api.put(`/courses/${id}`, data);
    return response.data.data;
  },

  async deleteCourse(id: string) {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
  },
};
