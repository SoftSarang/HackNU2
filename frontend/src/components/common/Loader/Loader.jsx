import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import  "./loader.css";
const Container = styled(motion.div)`
  position: absolute;
  touch-action: none;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: black; 
 
`;

const Text = styled(motion.span)`
    font-family: 'Noto Sans', sans-serif;
    color: whitesmoke;
`;

const containerVariants = {
  initial: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: [0, 1, 1, 0],
    scale: [0.8, 1.1, 1, 0.9],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "loop",
      times: [0, 0.2, 0.8, 1],
      ease: "easeInOut",
    },
  },
};
 
const Loader = () => {
  return (
    <Container
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      
      <Text
      
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
       <p className='load-head'>EdgeMap</p><br />
       
      </Text>
       
    </Container>
  );
};

export default Loader;
