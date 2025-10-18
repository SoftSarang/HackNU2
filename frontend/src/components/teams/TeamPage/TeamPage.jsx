// Adapted from frontend/components/sections/teams/TeamPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
} from '@mui/material';
import { teamsApi } from '../../../api/teams';

const TeamPage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await teamsApi.getTeamById(teamId);
        setTeam(data);
      } catch (error) {
        console.error('Error fetching team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!team) {
    return <div>Team not found</div>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {team.name}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1">
                {team.description}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Team Members
              </Typography>
              {/* TeamMembers component will be added here */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default TeamPage;