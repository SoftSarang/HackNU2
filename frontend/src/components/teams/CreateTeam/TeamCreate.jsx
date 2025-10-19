import React, { useState } from 'react';
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

const TeamCreate = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleCreate = async () => {
    try {
      // Clear previous error and set loading state
      setError(null);
      setLoading(true);

      console.log('Creating team with data:', { name, description });
      const response = await api.post('/api/teams', { name, description });

      console.log('Team created successfully:', response.data); // Log the response
      navigate('/teams'); // Navigate only on success
    } catch (err) {
      console.error('Team creation error:', err.response || err);
      // Set error message based on response, if available
      setError(err.response?.data?.detail || 'Failed to create team');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Team
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Team Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            sx={{ bgcolor: 'primary.main', color: 'black', fontWeight: 600 }}
            onClick={handleCreate}
            disabled={!name || loading} // Disable button when loading or name is empty
          >
            {loading ? 'Creating...' : 'Create Team'} 
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TeamCreate;
