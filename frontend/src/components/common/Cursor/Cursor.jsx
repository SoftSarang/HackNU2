import React, { useRef, useEffect, memo } from 'react';
import { useCursor } from '../../../contexts/CursorContext';
import { StyledCursor } from './styles';

const Cursor = () => {
  const cursorRef = useRef();
  const [{ cursorStyle, position }] = useCursor();

  useEffect(() => {
    if (cursorRef.current) {
      const onMouseMove = event => {
        const x = position ? position.x : event.clientX;
        const y = position ? position.y : event.clientY;
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };

      document.addEventListener('mousemove', onMouseMove);
      return () => document.removeEventListener('mousemove', onMouseMove);
    }
  }, [position]);

  return (
    <StyledCursor
      ref={cursorRef}
      color={cursorStyle.color}
      bordered={cursorStyle.bordered}
    />
  );
};

export default memo(Cursor);