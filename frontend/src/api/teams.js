// Copy and adapt from frontend/api/teams.js
import api from './higgsfield';

export const teamsApi = {
  createTeam: async (teamData) => {
    const response = await api.post('/teams', teamData);
    return response.data;
  },

  getTeams: async () => {
    const response = await api.get('/teams');
    return response.data;
  },

  getTeamById: async (teamId) => {
    const response = await api.get(`/teams/${teamId}`);
    return response.data;
  },

  joinTeam: async (teamId) => {
    const response = await api.post(`/teams/${teamId}/join`);
    return response.data;
  },

  leaveTeam: async (teamId) => {
    const response = await api.post(`/teams/${teamId}/leave`);
    return response.data;
  },

  updateTeam: async (teamId, teamData) => {
    const response = await api.put(`/teams/${teamId}`, teamData);
    return response.data;
  },

  deleteTeam: async (teamId) => {
    const response = await api.delete(`/teams/${teamId}`);
    return response.data;
  },
};