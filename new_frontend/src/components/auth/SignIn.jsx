// Adapting from frontend/components/SignIn.jsx
import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign in logic
  };

  return (
    <Container maxWidth="sm">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mt: 8,
          background: 'rgba(18, 18, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ 
            color: 'primary.main',
            fontFamily: 'Lora, serif',
            fontWeight: 600,
          }}
        >
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(197, 250, 80, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(197, 250, 80, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                  color: 'primary.main',
                },
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(197, 250, 80, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(197, 250, 80, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-focused': {
                  color: 'primary.main',
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ 
              mt: 3, 
              mb: 2,
              bgcolor: 'primary.main',
              color: 'black',
              fontWeight: 600,
              '&:hover': {
                bgcolor: '#b3e546',
              },
            }}
          >
            Sign In
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link 
              href="/signup" 
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                fontFamily: 'Monda, sans-serif',
                '&:hover': {
                  color: '#b3e546',
                  textDecoration: 'none',
                },
              }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;