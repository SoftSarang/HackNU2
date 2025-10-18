import React, { useContext } from 'react';
import { Container, Box, Paper, Grid, Avatar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts//AuthContext';

const Profile = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Если данные загружаются
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

  // Если пользователь не авторизован
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
                src={user.avatar || '/assets/images/default-avatar.jpg'} // Заглушка для аватара
                alt={user.email}
                sx={{ width: 200, height: 200, margin: '0 auto' }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" component="h1" gutterBottom>
                {user.email} {/* Имя не в модели, используем email */}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Email: {user.email}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                Status: {user.is_active ? 'Active' : 'Inactive'}
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
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;