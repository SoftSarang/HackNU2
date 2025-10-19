import React, { useState, useContext } from 'react';
import { Container, Typography, Box, TextField, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TeamContext } from '../TeamContext'; // Adjusted import path

const TeamCreate = () => {
  const navigate = useNavigate();
  const { createTeam } = useContext(TeamContext); // Get createTeam from context
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 

  const handleCreate = async () => {
    try {
      setError(null);
      setLoading(true);

      // Call the context function instead of api.post
      await createTeam({ name, description });

      navigate('/teams'); 
    } catch (err) {
      console.error('Team creation error:', err);
      // Local state error simulation
      setError(err.message || 'Failed to create team due to local state error.');
    } finally {
      setLoading(false); 
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
            disabled={!name || loading} 
          >
            {loading ? 'Creating...' : 'Create Team'} 
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default TeamCreate;