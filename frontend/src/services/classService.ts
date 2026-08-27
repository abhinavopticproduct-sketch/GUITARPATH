import api from './api';

export const classService = {
  async getClasses() {
    const response = await api.get('/classes');
    return response.data.data;
  },

  async getClassById(id: string) {
    const response = await api.get(`/classes/${id}`);
    return response.data.data;
  },

  async createClass(data: any) {
    const response = await api.post('/classes', data);
    return response.data.data;
  },

  async updateClass(id: string, data: any) {
    const response = await api.put(`/classes/${id}`, data);
    return response.data.data;
  },

  async deleteClass(id: string) {
    const response = await api.delete(`/classes/${id}`);
    return response.data;
  },
};
