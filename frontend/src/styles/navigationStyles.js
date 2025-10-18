import styled from 'styled-components';

export const Nav = styled.nav`
  position: fixed;
  top: 10px;
  left: 0;
  width: 100%;
  z-index: 99;
  pointer-events: auto;
`;

export const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
`;

export const LogoLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
  font-weight: 800;
`;

export const NavList = styled.ul`
  display: flex;
  gap: 12px;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
`;

export const NavItem = styled.li`
  display: inline-block;
`;

// default export for compatibility with various import styles
export default Nav;