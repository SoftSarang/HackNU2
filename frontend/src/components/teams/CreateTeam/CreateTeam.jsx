import React, { useState, useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

const CreateTeam = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Если пользователь не авторизован, перенаправляем на логин
  if (!loading && !user) {
    navigate('/signin');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      const response = await api.post('/teams', {
        name: formData.name,
        description: formData.description,
      });
      setSuccess(`Team "${response.data.name}" created successfully!`);
      setFormData({ name: '', description: '' });
      setTimeout(() => navigate('/teams'), 2000); // Перенаправление через 2 секунды
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create team');
      console.error('Team creation error:', err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 4, background: 'rgba(18, 18, 18, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: 'primary.main', fontFamily: 'Lora, serif', fontWeight: 600 }}
        >
          Create a New Team
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Team Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(197, 250, 80, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(197, 250, 80, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': { color: 'primary.main' },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(197, 250, 80, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(197, 250, 80, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&.Mui-focused': { color: 'primary.main' },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  mt: 2,
                  bgcolor: 'primary.main',
                  color: 'black',
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#b3e546' },
                }}
              >
                Create Team
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateTeam;