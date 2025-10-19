import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import { AuthContext } from '../../../contexts/AuthContext';

const TeamsPage = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      if (!user) return;
      try {
        const response = await api.get('/teams');
        console.log('Teams response:', response.data);
        setTeams(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to fetch teams');
        console.error('Teams fetch error:', err.response || err);
      }
    };
    if (!loading) fetchTeams();
  }, [user, loading]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6" align="center">
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (!user) {
    navigate('/signin');
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: 'primary.main', fontFamily: 'Lora, serif', fontWeight: 600 }}
        >
          Your Teams
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3, background: 'rgba(18, 18, 18, 0.8)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Button
                variant="contained"
                sx={{
                  mb: 2,
                  bgcolor: 'primary.main',
                  color: 'black',
                  fontWeight: 600,
                  '&:hover': { bgcolor: '#b3e546' },
                }}
                onClick={() => navigate('/teams/create')}
              >
                Create New Team
              </Button>
              {teams.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                  You are not a member of any teams yet.
                </Typography>
              ) : (
                <List>
                  {teams.map((team) => (
                    <ListItem
                      key={team.id}
                      sx={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', cursor: 'pointer' }}
                      onClick={() => navigate(`/teams/${team.id}`)}
                    >
                      <ListItemText
                        primary={team.name}
                        secondary={team.description || 'No description'}
                        primaryTypographyProps={{ color: 'primary.main' }}
                        secondaryTypographyProps={{ color: 'text.secondary' }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TeamsPage;
