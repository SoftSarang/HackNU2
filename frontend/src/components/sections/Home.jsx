import styled from 'styled-components';
import CoverVideo from '../CoverVideo';
import Logo from '../Logo';
import React from 'react';
import CanvasEraser from '../CanvasEraser';
import { useCursorContext } from '../../context/cursor';
import colors from '../../styles/colors';
import { motion } from 'framer-motion';


const SectionWrapper = styled.section`
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
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
  bottom: 400px;
  left: -20px;
  font-size: 26.25rem;
  pointer-events: none;
  line-height: 1;
  z-index: 99999;
  color: #fff;

  & span { display: block; }
`;

const Home = () => {
  const [state, dispatch] = useCursorContext();
  const canvasRef = React.useRef(null);

    React.useEffect(() => {
      const el = canvasRef.current && canvasRef.current;
      if (!el) return;

      const handleEnter = () => {
        dispatch({ type: 'ADD_CURSOR_BORDER' });
        dispatch({ type: 'ADD_CURSOR_COLOR', payload: colors.red });
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
      <CoverVideo />
      <Logo />
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

export default Home;
