import React, { useState } from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const AppBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleTeamsClick = () => {
    navigate('/teams');
  };

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleProfile = () => {
    handleMenuClose();
    navigate('/profile');
  };

  const handleHistory = () => {
    handleMenuClose();
    navigate('/history');
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/');
  };

  return (
    <MuiAppBar 
      position="fixed" 
      sx={{ 
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/" 
            sx={{ 
              color: 'primary.main',
              textDecoration: 'none',
              fontFamily: 'Lora, serif',
              fontWeight: 600,
              letterSpacing: '0.02em',
              '&:hover': {
                color: '#b3e546',
              },
            }}
          >
            EdgeMap
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              onClick={handleTeamsClick}
              sx={{
                color: 'white',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Teams
            </Button>
            <Button 
              onClick={() => navigate('/prompt')}
              sx={{
                color: 'white',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              Prompt
            </Button>
          </Box>
        </Box>

        {!user ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              component={RouterLink} 
              to="/signin"
              sx={{
                color: 'white',
                borderColor: 'primary.main',
                '&:hover': {
                  color: 'primary.main',
                  borderColor: '#b3e546',
                },
              }}
            >
              Sign In
            </Button>
            <Button 
              component={RouterLink} 
              to="/signup"
              variant="contained"
              sx={{
                bgcolor: 'primary.main',
                color: 'black',
                '&:hover': {
                  bgcolor: '#b3e546',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        ) : (
          <>
            <IconButton 
              onClick={handleMenuOpen} 
              size="small" 
              sx={{ 
                ml: 2,
                border: '2px solid',
                borderColor: 'primary.main',
                p: 0.5,
                '&:hover': {
                  borderColor: '#b3e546',
                },
              }}
            >
              {user.avatar ? (
                <Avatar 
                  src={user.avatar} 
                  alt={user.name}
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: 'primary.main',
                  }}
                />
              ) : (
                <AccountCircle 
                  sx={{ 
                    fontSize: 32,
                    color: 'primary.main',
                  }} 
                />
              )}
            </IconButton>
            <Menu 
              anchorEl={anchorEl} 
              open={Boolean(anchorEl)} 
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  bgcolor: 'rgba(18, 18, 18, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  mt: 1.5,
                  '& .MuiMenuItem-root': {
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'rgba(197, 250, 80, 0.1)',
                      color: 'primary.main',
                    },
                  },
                },
              }}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleHistory}>History</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;