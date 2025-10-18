import React from 'react';
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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const History = () => {
  const historyItems = []; // Replace with actual history data

  const handleDelete = (id) => {
    // Handle deletion of history item
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          History
        </Typography>
        <Paper>
          <List>
            {historyItems.map((item, index) => (
              <React.Fragment key={item.id}>
                {index > 0 && <Divider />}
                <ListItem>
                  <ListItemText
                    primary={item.action}
                    secondary={new Date(item.timestamp).toLocaleString()}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default History;