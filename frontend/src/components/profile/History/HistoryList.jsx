import React, { useState, useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, CircularProgress, Alert } from '@mui/material';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';

const HistoryList = () => {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      if (!user) {
        console.log('No user found, skipping fetchPrompts');
        return;
      }
      console.log('Sending GET /prompts with user:', user);
      setLoading(true);
      try {
        const response = await api.get('/prompts'); // Исправлено с /api/prompts на /prompts
        console.log('Fetched prompts:', response.data);
        setPrompts(response.data);
      } catch (err) {
        console.error('Error fetching prompts:', err);
        console.error('Error details:', err.response?.data); // Добавлено
        setError(err.response?.data?.detail || 'Failed to load prompts');
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, [user]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Prompt History
      </Typography>
      {prompts.length === 0 ? (
        <Typography color="text.secondary">No prompts found.</Typography>
      ) : (
        <List>
          {prompts.map((prompt) => (
            <ListItem key={prompt.id} divider>
              <ListItemText
                primary={prompt.text}
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      Created: {new Date(prompt.created_at).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Parameters: {prompt.parameters || 'None'}
                    </Typography>
                    {prompt.team_id && (
                      <Typography variant="body2" color="text.secondary">
                        Team ID: {prompt.team_id}
                      </Typography>
                    )}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default HistoryList;