import api from './api';

export const practiceService = {
  async startPractice(data: { lessonId: string; exerciseId: string }) {
    const response = await api.post('/practice/start', data);
    return response.data.data;
  },

  async submitPracticeResult(sessionId: string, data: any) {
    const response = await api.post(`/practice/${sessionId}/result`, data);
    return response.data.data;
  },

  async getPracticeHistory() {
    const response = await api.get('/practice/history');
    return response.data.data;
  },
};
