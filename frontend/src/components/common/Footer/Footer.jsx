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
  margin-top: 60px;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0 20px;
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
  
  a { 
    color: var(--primary-color);
    text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -4px;
      left: 0;
      background-color: var(--secondary-color);
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: var(--secondary-color);
      text-shadow: 0 0 8px var(--secondary-color);
      
      &::after {
        width: 100%;
      }
    }
  }
`;

const Social = styled.div`
  display: flex;
  gap: 12px;
  
  a { 
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    background: rgba(197, 250, 80, 0.1);
    color: var(--primary-color);
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    
    &:hover {
      transform: translateY(-2px);
      background: rgba(197, 250, 80, 0.2);
      border-color: var(--secondary-color);
      box-shadow: 0 0 15px rgba(197, 250, 80, 0.3);
    }
  }
  
  svg { 
    width: 18px;
    height: 18px;
    fill: currentColor;
    transition: all 0.3s ease;
    
    &:hover {
      fill: var(--secondary-color);
    }
  }
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

// Smooth scroll helper that finds the target element by id and scrolls into view
const scrollToSection = (event, id) => {
  event.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    // if the element isn't found, fallback to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
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
          <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')}>Home</a></li>
          <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>About</a></li>
          <li><a href="#second" onClick={(e) => scrollToSection(e, 'second')}>Video</a></li>
          <li><a href="#banner" onClick={(e) => scrollToSection(e, 'banner')}>Included</a></li>
          <li><a href="#faq" onClick={(e) => scrollToSection(e, 'faq')}>FAQ</a></li>
        </Links>

        <Social aria-label="social-links">
          <a href="https://t.me/soft_sarang" title="Telegram" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.43 7.13l-1.8 8.5c-.14.64-.51.79-1.03.49l-2.85-2.1-1.38 1.33c-.15.15-.28.28-.57.28l.2-2.89 5.26-4.75c.23-.2-.05-.31-.35-.12l-6.5 4.09-2.8-.87c-.61-.19-.62-.61.13-.9l10.93-4.21c.51-.19.96.12.76 1.15z"/></svg>
          </a>
          <a href="https://github.com/kuznargi" title="GitHub" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
          <a href="https://www.instagram.com/kuznargi/" title="Instagram" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
          </a>
        </Social>
      </FooterInner>

      <Copy>© {new Date().getFullYear()} EdgeMap — All rights reserved.</Copy>
    </FooterContainer>
  );
};

export default Footer;
