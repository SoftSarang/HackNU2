import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const LoaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',
  position: 'fixed',
  top: 0,
  left: 0,
  background: 'rgba(255, 255, 255, 0.8)',
  zIndex: theme.zIndex.modal + 1,
}));

const LoaderContent = styled('div')({
  width: '48px',
  height: '48px',
  border: '5px solid #2196F3',
  borderRadius: '50%',
  display: 'inline-block',
  boxSizing: 'border-box',
  position: 'relative',
  animation: 'pulse 1s linear infinite',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '48px',
    height: '48px',
    border: '5px solid #2196F3',
    borderRadius: '50%',
    display: 'inline-block',
    boxSizing: 'border-box',
    left: '-5px',
    top: '-5px',
    animation: 'pulsate 1s linear infinite',
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(0.8)', opacity: 1 },
    '100%': { transform: 'scale(1)', opacity: 0 },
  },
  '@keyframes pulsate': {
    '0%': { transform: 'scale(1)', opacity: 1 },
    '100%': { transform: 'scale(1.4)', opacity: 0 },
  },
});

const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderContent />
    </LoaderWrapper>
  );
};

export default Loader;