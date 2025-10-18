// Adapted from frontend/components/sections/teams/TeamPage.jsx members section
import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

const TeamMembers = ({ members, onRemoveMember, isAdmin }) => {
  return (
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
                  onClick={() => onRemoveMember(member.id)}
                >
                  <PersonRemoveIcon />
                </IconButton>
              </Tooltip>
            )
          }
        >
          <ListItemAvatar>
            <Avatar src={member.avatar}>{member.name[0]}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={member.name}
            secondary={member.role || 'Member'}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TeamMembers;