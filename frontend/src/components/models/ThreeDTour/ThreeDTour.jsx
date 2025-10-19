import React from 'react';
import { Container, Typography, Box, Paper, Button } from '@mui/material';

const ThreeDTour = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h3" gutterBottom>
          AI Virtual Tour Creator
        </Typography>
        <Paper sx={{ p: 4 }}>
          <Typography variant="body1" gutterBottom>
            This is a placeholder for the 3D Tour creator. Here users will be able to
            upload photos, provide descriptions, and generate an interactive virtual
            tour using AI.
          </Typography>
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            Start Creating
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default ThreeDTour;