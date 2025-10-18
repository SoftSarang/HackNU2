import api from './higgsfield';

export const promptsApi = {
  createPrompt: async (promptData) => {
    const response = await api.post('/prompts', promptData);
    return response.data;
  },

  getPrompts: async (filters = {}) => {
    const response = await api.get('/prompts', { params: filters });
    return response.data;
  },

  getPromptById: async (promptId) => {
    const response = await api.get(`/prompts/${promptId}`);
    return response.data;
  },

  updatePrompt: async (promptId, promptData) => {
    const response = await api.put(`/prompts/${promptId}`, promptData);
    return response.data;
  },

  deletePrompt: async (promptId) => {
    const response = await api.delete(`/prompts/${promptId}`);
    return response.data;
  },

  sharePrompt: async (promptId, teamId) => {
    const response = await api.post(`/prompts/${promptId}/share`, { teamId });
    return response.data;
  },

  executePrompt: async (promptId, parameters = {}) => {
    const response = await api.post(`/prompts/${promptId}/execute`, parameters);
    return response.data;
  },
};
