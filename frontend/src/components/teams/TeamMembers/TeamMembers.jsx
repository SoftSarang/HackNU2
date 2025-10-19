import React, { useState, useContext } from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Tooltip,
  TextField,
  Button,
  Box,
  Alert,
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { TeamContext } from '../TeamContext';

const TeamMembers = ({ members, onMemberAction, isAdmin, teamId }) => {
  const { removeMember, inviteMember } = useContext(TeamContext);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleAddMember = async () => {
    try {
      setError(null);
      await inviteMember(teamId, email); // Use context function
      setEmail('');
      // Notify parent component to update its state if necessary
      onMemberAction(); 
    } catch (err) {
      setError(err.message || 'Failed to invite user');
    }
  };

  const handleRemove = async (memberId) => {
    try {
      await removeMember(teamId, memberId); // Use context function
      onMemberAction(); 
    } catch (err) {
      setError(err.message || 'Failed to remove member');
    }
  };

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {isAdmin && (
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Invite by Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={handleAddMember}
            disabled={!email}
          >
            Invite
          </Button>
        </Box>
      )}
      <List>
        {members.map((member) => (
          <ListItem
            key={member.id}
            secondaryAction={
              isAdmin && (
                <Tooltip title="Remove member">
                  <IconButton
                    edge="end"
                    aria-label="remove"
                    onClick={() => handleRemove(member.id)}
                  >
                    <PersonRemoveIcon />
                  </IconButton>
                </Tooltip>
              )
            }
          >
            <ListItemAvatar>
              <Avatar src={member.avatar}>{member.name?.[0] || member.email[0]}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={member.name || member.email}
              secondary={member.role || 'Member'}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TeamMembers;