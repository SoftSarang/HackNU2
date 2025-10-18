
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import imga from "../assets/images/logo.png";
import React, { useState, useRef, useEffect } from 'react';

const Nav = styled.nav`
  position: fixed;
  top: 10px;
  left: 5px;
  right: 5px;
  z-index: 99;
  background: rgba(24,24,24,0.6);
  border-radius: 14px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 6px 12px;
  display:flex;
  align-items:center;
  gap:12px;
`;

const Brand = styled.div`display:flex;align-items:center;gap:10px;color:#fff;font-weight:700;`;
const Left = styled.div`display:flex;align-items:center;gap:10px;`;
const Right = styled.div`margin-left:auto;display:flex;align-items:center;gap:8px;`;
const NavLink = styled(Link)`color:#fff;padding:8px 10px;border-radius:8px;text-decoration:none;font-size:14px;`;
const ButtonLink = styled.button`background:transparent;border:1px solid transparent;color:#fff;padding:6px 10px;border-radius:8px;cursor:pointer;`;
const Avatar = styled.img`width:36px;height:36px;border-radius:50%;object-fit:cover;cursor:pointer;border:2px solid rgba(255,255,255,0.08);`;

const Dropdown = styled.div`
  position: absolute;
  right: 12px;
  top: 56px;
  background: #111;
  border: 1px solid rgba(255,255,255,0.06);
  padding: 8px; border-radius:8px; min-width:180px; z-index:120;
`;

const Logo = () => {
  const [open, setOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const avatarRef = useRef(null);

  useEffect(()=>{
    function onDoc(e){ if(avatarRef.current && !avatarRef.current.contains(e.target)) setOpen(false)}
    document.addEventListener('click', onDoc);
    return ()=>document.removeEventListener('click', onDoc);
  },[]);

  return (
    <Nav>
      <Left>
        <Brand>
          <img src={imga} alt="logo" style={{width:36,height:36}} />
          <NavLink to="/">EdgeMap</NavLink>
        </Brand>
        <NavLink to="/teams">Teams</NavLink>
      </Left>

      <Right>
        {!isLogged ? (
          <>
            <NavLink to="/sign-in">Sign In</NavLink>
            <NavLink to="/sign-up">Sign Up</NavLink>
          </>
        ) : (
          <div style={{position:'relative'}} ref={avatarRef}>
            <Avatar src={'/assets/images/avatar-placeholder.png'} alt="Profile" onClick={()=>setOpen(!open)} />
            {open && (
              <Dropdown>
                <div style={{padding:'6px 8px'}}><Link to="/profile">Profile</Link></div>
                <div style={{padding:'6px 8px'}}><Link to="/history">History</Link></div>
                <div style={{padding:'6px 8px'}}><button style={{background:'transparent',color:'#fff',border:0}}>Sign Out</button></div>
              </Dropdown>
            )}
          </div>
        )}
      </Right>
    </Nav>
  );
};

export default Logo;
