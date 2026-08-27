import api from './api';

export const studentService = {
  async getStudentProgress(studentId: string) {
    const response = await api.get(`/students/${studentId}/progress`);
    return response.data.data;
  },

  async getStudentAnalytics(studentId: string) {
    const response = await api.get(`/students/${studentId}/analytics`);
    return response.data.data;
  },

  async updateStudentProfile(data: any) {
    const response = await api.put('/students/profile', data);
    return response.data.data;
  },
};
