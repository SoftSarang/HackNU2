import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Avatar, Tabs, Tab, Button } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import History from './History/History'; // Изменили с HistoryList на History
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

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
                <Typography color="text.secondary">{user?.email}</Typography>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Status
                </Typography>
                <Typography color="text.secondary">
                  {user?.is_active ? 'Active' : 'Inactive'}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    bgcolor: 'primary.main',
                    color: 'black',
                    fontWeight: 600,
                    '&:hover': { bgcolor: '#b3e546' },
                  }}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <History /> // Изменили с HistoryList на History
            )}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;