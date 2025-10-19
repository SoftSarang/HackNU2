import api from './higgsfield';

export const assetsApi = {
  uploadAsset: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/assets/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getAssets: async (filters = {}) => {
    const response = await api.get('/assets', { params: filters });
    return response.data;
  },

  getAssetById: async (assetId) => {
    const response = await api.get(`/assets/${assetId}`);
    return response.data;
  },

  deleteAsset: async (assetId) => {
    const response = await api.delete(`/assets/${assetId}`);
    return response.data;
  },

  updateAsset: async (assetId, data) => {
    const response = await api.put(`/assets/${assetId}`, data);
    return response.data;
  },
};
