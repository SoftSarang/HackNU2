import React from 'react';
import { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cursor from './components/common/Cursor/Cursor';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { GlobalStyles } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { CursorProvider } from './contexts/CursorContext';
import { AuthProvider } from './contexts/AuthContext';
import { TeamProvider } from './contexts/TeamContext';
import Layout from './components/common/Layout/Layout';
import { AnimatePresence } from "framer-motion";
import Loader from "./components/common/Loader/Loader";
import About from "./components/common/Sections/About";
import Second from "./components/common/Sections/Second";
import Banner from "./components/common/Sections/Banner";
import Third from "./components/common/Sections/Third";
import Faq from "./components/common/Sections/Faq";
import Footer from "./components/common/Footer/Footer";
// Components
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Profile from './components/profile/Profile';
import History from './components/profile/History/History';
import TeamList from './components/teams/TeamList/TeamList';
import CreateTeam from './components/teams/CreateTeam/TeamCreate';
import TeamPage from './components/teams/TeamPage/TeamPage';
import ModelsGrid from './components/home/ModelsGrid/ModelsGrid';
import Home from './components/home/Home';
import ThreeDTour from './components/models/ThreeDTour/ThreeDTour';
import PromptPage from './components/prompt/PromptPage';

import { useAuth } from './contexts/AuthContext';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to="/signin" />;
};

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

    
  return (
    <ThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CursorProvider>
          <div style={{
            width: '100%',
            maxWidth: '100vw',
            overflowX: 'hidden',
            position: 'relative'
          }}>
            <Cursor />
            <CssBaseline />
            <GlobalStyles
            styles={{
              ':root': {
                '--primary-color': '#c5fa50',
                '--secondary-color': '#f7cc2e',
                '--background-dark': '#000000',
                '--background-light': '#121212',
              },
              'body': {
                backgroundColor: 'var(--background-dark)',
                color: '#ffffff',
                cursor: 'none', /* hide native cursor */
              },
              'a, button, [role="button"]': {
                cursor: 'none',
                color: 'var(--primary-color)',
                textDecoration: 'none',
                '&:hover': {
                  color: '#b3e546',
                },
              },
            }}
          />
          <AuthProvider>
            <TeamProvider>
              <Router>
            <AnimatePresence>{loaded ? null : <Loader />}</AnimatePresence>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Layout><Home /><About />
                  <Second />
                  <Banner />
                  <Third />
                  <Faq /></Layout>} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
             <Route
                path="/prompt"
                element={<ProtectedRoute><Layout><PromptPage /></Layout></ProtectedRoute>}
              /> 
              <Route
                path="/profile"
                element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>}
              /> 
              <Route
                path="/history"
                element={<ProtectedRoute><Layout><History /></Layout></ProtectedRoute>}
              />
              <Route
                path="/teams"
                element={<ProtectedRoute><Layout><TeamList /></Layout></ProtectedRoute>}
              />
              <Route
                path="/teams/create"
                element={<ProtectedRoute><Layout><CreateTeam /></Layout></ProtectedRoute>}
              />
              <Route
                path="/teams/:teamId"
                element={<ProtectedRoute><Layout><TeamPage /></Layout></ProtectedRoute>}
              />
            </Routes>
          </Router>
        </TeamProvider>
      </AuthProvider>
          </div>
        </CursorProvider>
      </StyledThemeProvider>
    </ThemeProvider>
  );
}

export default App;
