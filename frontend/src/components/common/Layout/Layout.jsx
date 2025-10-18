import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import AppBar from '../AppBar/AppBar';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children || <Outlet />}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;