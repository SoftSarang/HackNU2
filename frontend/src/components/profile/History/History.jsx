import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';

const History = () => {
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
      console.log('User authenticated:', user);
      setLoading(true);
      try {
        console.log('Sending GET /api/prompts');
        const response = await api.get('/api/prompts'); // Исправлено с /prompts на /api/prompts
        console.log('Fetched prompts:', response.data);
        setPrompts(response.data);
      } catch (err) {
        console.error('Error fetching prompts:', err);
        console.error('Error details:', err.response?.data);
        setError(err.response?.data?.detail || 'Failed to load prompts');
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/prompts/${id}`); // Исправлено с /prompts на /api/prompts
      setPrompts(prompts.filter((prompt) => prompt.id !== id));
    } catch (err) {
      console.error('Error deleting prompt:', err);
      console.error('Error details:', err.response?.data);
      setError(err.response?.data?.detail || 'Failed to delete prompt');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          History
        </Typography>
        <Paper>
          <List>
            {prompts.length === 0 ? (
              <Typography sx={{ p: 2 }} color="text.secondary">
                No prompts found.
              </Typography>
            ) : (
              prompts.map((prompt, index) => (
                <React.Fragment key={prompt.id}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={prompt.text}
                      secondary={new Date(prompt.created_at).toLocaleString()}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDelete(prompt.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </React.Fragment>
              ))
            )}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default History;