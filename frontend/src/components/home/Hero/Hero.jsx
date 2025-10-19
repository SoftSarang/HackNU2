import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import CanvasEraser from './CanvasEraser/CanvasEraser';
import video from '../../../assets/videos/higgsfield.mp4';
import { useCursor } from '../../../contexts/CursorContext';
import './cover.css';


const SectionWrapper = styled.section`
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0;
`;

const CanvasWrapper = styled.div`
  position: absolute;  /* Позиционируем относительно секции, чтобы канвас двигался вместе со скроллом */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: auto;
`;

const BannerTitle = styled(motion.h1)`
  position: absolute;
  bottom: 120px;
  left: 20px;
  font-size: 10rem;
  pointer-events: none;
  line-height: 1;
  z-index: 9998;
  color: var(--primary-color);
  text-shadow: 0 0 5px var(--primary-color),
               0 0 10px var(--primary-color);

  & span { 
    display: block;
    transition: color 0.3s ease;
    &:hover {
      color: var(--secondary-color);
      text-shadow: 0 0 5px var(--secondary-color),
                  0 0 10px var(--secondary-color);
    }
  }
`;

const Hero = () => {
  const [cursorState, dispatch] = useCursor();
  const canvasRef = React.useRef(null);

    React.useEffect(() => {
      const el = canvasRef.current && canvasRef.current;
      if (!el) return;

      const handleEnter = () => {
        dispatch({ type: 'ADD_CURSOR_BORDER' });
        dispatch({ type: 'ADD_CURSOR_COLOR', payload: '#c5fa50' });
      };

      const handleLeave = () => {
        dispatch({ type: 'REMOVE_CURSOR_BORDER' });
        dispatch({ type: 'RESET_CURSOR_COLOR' });
      };

      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);

      return () => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      };
    }, [dispatch]);

  return (
    <SectionWrapper id="home">
      <video
          className="background-video"
          src={video}
          autoPlay
          loop
          muted
          playsInline
        />
      {/* Canvas eraser overlays the section to reveal content underneath */}
      <CanvasWrapper>
        <CanvasEraser
          ref={canvasRef}
          size={200}
          background="rgba(0,0,0,0.95)"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 20,
            touchAction: 'none',
          }}
        />
        <BannerTitle>
          <motion.span>Edge</motion.span>
          <motion.span>Map</motion.span>
        </BannerTitle>
      </CanvasWrapper>
    </SectionWrapper>
  );
};
export default Hero;