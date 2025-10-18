import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Avatar, Tabs, Tab } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import HistoryList from './History/HistoryList';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                src={user?.avatar || '/assets/images/avatar-placeholder.png'}
                alt={user?.email}
                sx={{ width: 200, height: 200, margin: '0 auto' }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h1" gutterBottom>
                Profile
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {user?.email}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab label="Profile" />
              <Tab label="History" />
            </Tabs>
          </Box>

          <Box sx={{ mt: 3 }}>
            {activeTab === 0 ? (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Email
                </Typography>
                <Typography color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            ) : (
              <HistoryList />
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;