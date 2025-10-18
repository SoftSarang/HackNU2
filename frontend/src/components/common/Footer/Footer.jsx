import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import logo from '../../../assets/images/logo.png'; // добавлен импорт логотипа

const FooterContainer = styled.footer`
  background: rgba(18,18,18,0.6);
  color: #e6e6e6;
  padding: 32px 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  margin-top: 60px; /* leave space under fixed nav */
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 1.05rem;
  color: #fff;
  .logo-img { width: 40px; height: 40px; object-fit: cover; border-radius: 8px; }
`;

const Links = styled.ul`
  display: flex;
  gap: 18px;
  list-style: none;
  padding: 0;
  margin: 0;
  a { color: #ddd; text-decoration: none; font-size: 0.95rem; transition: color .15s; }
  a:hover { color: #fff; }
`;

const Social = styled.div`
  display: flex;
  gap: 12px;
  a { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.04); color: #fff; text-decoration: none; transition: transform .12s; }
  a:hover { transform: translateY(-2px); }
  svg { width: 18px; height: 18px; fill: currentColor; }
`;

const Copy = styled.div`
  width: 100%;
  margin-top: 14px;
  text-align: center;
  font-size: 0.85rem;
  color: #bdbdbd;
`;

const motionVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Footer = () => {
  return (
    <FooterContainer as={motion.footer} initial="hidden" animate="visible" variants={motionVariants}>
      <FooterInner>
        <Brand>
          {/* Использовать импортированный файл вместо строкового пути */}
          <img className="logo-img" src={logo} alt="EdgeMap logo" />
          <div>EdgeMap</div>
        </Brand>

        <Links>
          <li><a href="/collection">Collection</a></li>
          <li><a href="/roadmap">Roadmap</a></li>
          <li><a href="/teams">Team</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li><a href="/about">About</a></li>
        </Links>

        <Social aria-label="social-links">
          <a href="https://instagram.com/" title="Instagram" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.4.5.6.3 1 .6 1.5 1.1.5.5.8 1 .1.5.3 1.1.4 1.8.5 3 .1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.4-.3.6-.6 1-1.1 1.5-.5.5-1 .8-1.5 1.1-.5.2-1.2.4-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.4-.5-.6-.3-1-.6-1.5-1.1-.5-.5-.8-1-1.1-1.5-.2-.5-.4-1.2-.5-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.4.3-.6.6-1 1.1-1.5.5-.5 1-.8 1.5-1.1.5-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 5.6.2 4.6.5 3.8.9 3 .4 2.3 1 1.6 1.7.9 2.4.4 3.1-.1 3.9c-.4.8-.8 1.8-.9 3.2C-1 9.8-1 10.2-1 13.5s0 3.7.1 5c.1 1.4.5 2.4.9 3.2.5.8 1 1.5 1.7 2.2.7.7 1.4 1.2 2.2 1.7.8.4 1.8.8 3.2.9 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.4-.1 2.4-.5 3.2-.9.8-.5 1.5-1 2.2-1.7.7-.7 1.2-1.4 1.7-2.2.4-.8.8-1.8.9-3.2.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.4-.5-2.4-.9-3.2-.5-.8-1-1.5-1.7-2.2C20.3 1 19.6.4 18.8-.1c-.8-.4-1.8-.8-3.2-.9C15.7 0 15.3 0 12 0z"/></svg>
          </a>
          <a href="https://twitter.com/" title="Twitter" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23 4.6c-.7.3-1.4.6-2.2.7.8-.5 1.4-1.3 1.7-2.2-.7.4-1.5.7-2.4.9C19.8 3 18.6 2.4 17.3 2.4c-2.3 0-4.1 2-3.6 4.2C9.8 6.3 6.6 4.6 4.5 2.2c-.9 1.6-.5 3.6 1 4.6-.6 0-1.3-.2-1.9-.6v.1c0 2.1 1.5 3.9 3.5 4.3-.6.2-1.3.2-2 .1.6 2 2.3 3.5 4.4 3.6C9.9 17 7.4 17.8 4.8 17.2c2 1.3 4.3 2 6.9 2 8.3 0 12.8-6.8 12.8-12.8v-.6c.9-.6 1.6-1.4 2.2-2.3-.8.4-1.6.7-2.4.8z"/></svg>
          </a>
          <a href="https://discord.com/" title="Discord" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.6 3s-1.8-1.2-4.1-1.2c0 0-.4.5-.7 1.1C14.3 3 13.2 3 12 3s-2.3 0-3.8-.1c-.3-.6-.7-1.1-.7-1.1-2.3 0-4.1 1.2-4.1 1.2C0 7.2 0 11.1 0 11.1c0 0 1 1.1 1.8 2.1 0 0 .9 1.7 3.2 3.1 0 0 1.3.7 2.5 1 0 0 .4-.6.8-1.1-2.1-.6-2.9-1.9-2.9-1.9 0 0 .2 0 .5.1 1.1.3 2.1.6 3.5.6 1.4 0 2.4-.2 3.5-.6.3 0 .5-.1.5-.1 0 0-.8 1.3-2.9 1.9.4.5.8 1.1.8 1.1 1.2-.3 2.5-1 2.5-1 2.3-1.4 3.2-3.1 3.2-3.1C23 12.2 24 11.1 24 11.1c0 0 0-3.9-3.4-8.1z"/></svg>
          </a>
        </Social>
      </FooterInner>

      <Copy>© {new Date().getFullYear()} EdgeMap — All rights reserved.</Copy>
    </FooterContainer>
  );
};

export default Footer;