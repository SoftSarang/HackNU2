import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TeamList = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]); // Replace with actual teams data
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleCreateTeam = () => {
    setCreateDialogOpen(true);
  };

  const handleJoinTeam = () => {
    setJoinDialogOpen(true);
  };

  const handleTeamClick = (teamId) => {
    navigate(`/teams/${teamId}`);
  };

  const showMessage = (message, severity = 'success') => {
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleCreateSubmit = async () => {
    try {
      // Add API call to create team
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newTeamName,
          description: newTeamDescription
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        if (response.status === 409) {
          throw new Error('Team with this name already exists');
        }
        throw new Error(error.message || 'Failed to create team');
      }

      showMessage('Team created successfully!');
      setCreateDialogOpen(false);
      setNewTeamName('');
      setNewTeamDescription('');
      // Refresh teams list here
    } catch (error) {
      showMessage(error.message, 'error');
    }
  };

  const handleJoinSubmit = async () => {
    try {
      // Add API call to search and join team
      const response = await fetch(`/api/teams/join?query=${encodeURIComponent(searchQuery)}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        if (response.status === 404) {
          throw new Error('Team not found');
        }
        throw new Error(error.message || 'Failed to join team');
      }

      showMessage('Successfully joined the team!');
      setJoinDialogOpen(false);
      setSearchQuery('');
      // Refresh teams list here
    } catch (error) {
      showMessage(error.message, 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Teams
          </Typography>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateTeam}
              sx={{ mr: 2 }}
            >
              Create Team
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleJoinTeam}
            >
              Join Team
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          {teams.map((team) => (
            <Grid item xs={12} sm={6} md={4} key={team.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {team.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {team.memberCount} members
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleTeamClick(team.id)}>
                    View Team
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Create Team Dialog */}
      <Dialog 
        open={createDialogOpen} 
        onClose={() => setCreateDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Create New Team</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Team Name"
            type="text"
            fullWidth
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={newTeamDescription}
            onChange={(e) => setNewTeamDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setCreateDialogOpen(false);
            setNewTeamName('');
            setNewTeamDescription('');
          }}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreateSubmit} 
            variant="contained" 
            color="primary"
            disabled={!newTeamName.trim() || !newTeamDescription.trim()}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* Join Team Dialog */}
      <Dialog 
        open={joinDialogOpen} 
        onClose={() => setJoinDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Join Team</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search Teams"
            type="text"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Add search results list here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setJoinDialogOpen(false);
            setSearchQuery('');
          }}>
            Cancel
          </Button>
          <Button 
            onClick={handleJoinSubmit} 
            variant="contained" 
            color="primary"
            disabled={!searchQuery.trim()}
          >
            Join
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TeamList;