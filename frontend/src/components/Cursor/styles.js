import styled, { css } from 'styled-components';

export const StyledCursor = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 36px;
  height: 36px;
  margin: -18px 0 0 -18px;
  border-radius: 100%;
  background: ${({ theme }) => theme.text};
  border: 0 solid transparent;
  transform: translate3d(-100%, -100%, 0);
  transition: all 0.1s ease-out;
  transition-property: width, height, border;
  will-change: width, height, transform, border;
  pointer-events: none;
  z-index: ${({ theme }) => theme.zIndex.cursor};

  ${({ color }) => {
    // overrides default theme color
    return (
      color &&
      css`
        background: ${color};
      `
    );
  }};

  ${({ bordered, color, theme }) => {
    // create a bordered style when hovering elements
    return (
      bordered &&
      css`
        width: 64px;
        height: 64px;
        margin: -32px 0 0 -32px;
        background: transparent;
        border: 8px solid ${color || theme.text};
      `
    );
  }};

  @media (hover: none) and (pointer: coarse) {
    display: none;
  }
`;
