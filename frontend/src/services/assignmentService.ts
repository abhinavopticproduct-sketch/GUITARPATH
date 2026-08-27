import api from './api';

export const assignmentService = {
  async getAssignments() {
    const response = await api.get('/assignments');
    return response.data.data;
  },

  async createAssignment(data: any) {
    const response = await api.post('/assignments', data);
    return response.data.data;
  },

  async updateAssignment(id: string, data: any) {
    const response = await api.put(`/assignments/${id}`, data);
    return response.data.data;
  },

  async deleteAssignment(id: string) {
    const response = await api.delete(`/assignments/${id}`);
    return response.data;
  },
};
