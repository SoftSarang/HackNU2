import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      maxWidth: '100vw',
      overflow: 'hidden'
    }}>
      <AppBar />
      <Box component="main" sx={{ 
        flexGrow: 1,
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        position: 'relative',
        marginTop: '64px' // Add margin equal to AppBar height
      }}>
        {children || <Outlet />}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;