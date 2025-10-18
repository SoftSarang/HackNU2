import { ThemeProvider } from "styled-components";
import { useRef, useState, useEffect } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import { dark } from "./styles/Themes";
import Home from "./components/sections/Home";
import Teams from "./components/sections/teams/TeamPage";
import About from "./components/sections/About";
import Second from "./components/sections/Second";
import ScrollTriggerProxy from "./components/ScrollTriggerProxy";
import Banner from "./components/sections/Banner";
import Third from "./components/sections/Third";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Faq from "./components/sections/Faq";
import Our from "./components/sections/Our";
import Suite from "./components/sections/Suite";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Logo from "./components/Logo";
import Cursor from "./components/Cursor/Cursor";
import { CursorContextProvider } from "./context/cursor";
import TeamPage from "./components/sections/teams/TeamPage";

function ScrollRoutes() {
  const containerRef = useRef(null);
  const location = useLocation();

  // Determine if current page uses LocomotiveScroll
  const isScrollPage = location.pathname === "/";

  return (
    <LocomotiveScrollProvider
      options={{
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true },
      }}
      containerRef={containerRef}
      watch={[location.pathname]}
    >
      {isScrollPage && <ScrollTriggerProxy />}
      <main className="App" data-scroll-container ref={containerRef}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <About />
                  <Second />
                  <Banner />
                  <Third />
                  <Faq />
                  <Our />
                  <Suite />
                  <Footer />
                </>
              }
            />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/teams" element={<TeamPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </LocomotiveScrollProvider>
  );
}

const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <CursorContextProvider>
          <Router>
            <AnimatePresence>{loaded ? null : <Loader />}</AnimatePresence>
            <Logo />
            <ScrollRoutes />
            <Cursor />
          </Router>
        </CursorContextProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
