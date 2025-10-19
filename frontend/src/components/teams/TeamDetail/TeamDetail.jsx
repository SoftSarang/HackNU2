import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { TeamContext } from '../context/TeamContext'; // Adjusted import path
import TeamMembers from '../TeamMembers/TeamMembers';


// This component now receives a team object that is live-updated via context
const TeamDetail = ({ team: initialTeam }) => { 
  const { getTeamById, fetchUserPrompts, addPromptToTeam, getTeamPrompts } = useContext(TeamContext);

  // Use state to hold the team data, which will be updated from context
  const [team, setTeam] = useState(initialTeam); 
  const [prompts, setPrompts] = useState([]);
  const [userPrompts, setUserPrompts] = useState([]);
  const [selectedPrompt, setSelectedPrompt] = useState('');
  const [openPromptDialog, setOpenPromptDialog] = useState(false);
  const [openMembersDialog, setOpenMembersDialog] = useState(false);
  const [error, setError] = useState(null);
 

  const refreshData = () => {
    // Re-fetch the team to get the latest members/prompts from the context
    const updatedTeam = getTeamById(team.id); 
    if(updatedTeam) setTeam(updatedTeam);

    // Re-fetch prompts
    getTeamPrompts(team.id).then(setPrompts).catch(err => setError(err.message));
  };


  useEffect(() => {
    // Initial data fetch
    fetchUserPrompts().then(setUserPrompts).catch(err => setError(err.message));
    refreshData();
  }, [team.id]); // eslint-disable-line react-hooks/exhaustive-deps


  const handleAddPrompt = async () => {
    try {
      await addPromptToTeam(team.id, selectedPrompt); // Use context function
      refreshData();
      setOpenPromptDialog(false);
      setSelectedPrompt('');
    } catch (err) {
      setError(err.message || 'Failed to add prompt');
    }
  };

  // Helper function for TeamMembers to trigger a data refresh in TeamDetail
  const handleMemberAction = () => {
    refreshData();
  };


  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {team.name}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {team.description || 'No description'}
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          sx={{ bgcolor: 'primary.main', color: 'black', fontWeight: 600 }}
          onClick={() => setOpenMembersDialog(true)}
        >
          Team Members
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: 'primary.main', color: 'black', fontWeight: 600 }}
          onClick={() => setOpenPromptDialog(true)}
        >
          Add Prompt
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Typography variant="h6" gutterBottom>
        Team Prompts
      </Typography>
      <Grid container spacing={3}>
        {prompts.length === 0 ? (
          <Typography color="text.secondary" sx={{ml: 3}}>No prompts found.</Typography>
        ) : (
          prompts.map((prompt) => (
            <Grid item xs={12} sm={6} md={4} key={prompt.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{prompt.text}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Created: {new Date(prompt.created_at).toLocaleString()}
                  </Typography>
                  {prompt.parameters && (
                    <Typography variant="body2" color="text.secondary">
                      Result: <a href={JSON.parse(prompt.parameters).result.raw.url} target="_blank" rel="noopener noreferrer">View Image</a>
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      <Dialog open={openPromptDialog} onClose={() => setOpenPromptDialog(false)}>
        <DialogTitle>Add Prompt to Team</DialogTitle>
        <DialogContent>
          <Select
            value={selectedPrompt}
            onChange={(e) => setSelectedPrompt(e.target.value)}
            fullWidth
            displayEmpty
          >
            <MenuItem value="" disabled>
              Select a prompt
            </MenuItem>
            {userPrompts.map((prompt) => (
              <MenuItem key={prompt.id} value={prompt.id}>
                {prompt.text} ({new Date(prompt.created_at).toLocaleString()})
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPromptDialog(false)}>Cancel</Button>
          <Button onClick={handleAddPrompt} disabled={!selectedPrompt}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openMembersDialog} onClose={() => setOpenMembersDialog(false)}>
        <DialogTitle>Team Members</DialogTitle>
        <DialogContent>
          {/* Pass the team's live members and a callback for when an action occurs */}
          <TeamMembers 
            teamId={team.id}
            members={team.members} 
            isAdmin={true} // Simulate being admin for full CRUD access
            onMemberAction={handleMemberAction} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMembersDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamDetail;