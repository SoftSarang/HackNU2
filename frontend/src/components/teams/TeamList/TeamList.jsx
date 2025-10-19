import React, { useContext } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { TeamContext } from '../TeamContext';// Adjusted import path

const TeamList = () => {
  const navigate = useNavigate();
  // Get teams from the context
  const { teams } = useContext(TeamContext); 

  const handleCreateTeam = () => {
    navigate('/teams/create');
  };

  const handleTeamClick = (teamId) => {
    navigate(`/teams/${teamId}`);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Teams
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTeam}
          >
            Create Team
          </Button>
        </Box>

        <Grid container spacing={3}>
          {teams.length === 0 ? (
            <Typography variant="body1" sx={{ ml: 3 }}>No teams found. Create one!</Typography>
          ) : (
            teams.map((team) => (
              <Grid item xs={12} sm={6} md={4} key={team.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {team.name}
                    </Typography>
                    <Typography color="text.secondary">
                      {team.description}
                    </Typography>
                    <Typography variant="body2">
                      Members: {team.memberCount}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleTeamClick(team.id)}
                    >
                      View Team
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default TeamList;