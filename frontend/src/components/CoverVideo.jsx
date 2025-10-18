import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import car01 from "../assets/images/24.png";
import video from "../assets/videos/higgsfield.mp4";
import car02 from "../assets/images/24.png";
import car03 from "../assets/images/24.png";
import ric01 from "../assets/images/25.png";
import ric02 from "../assets/images/26.png";
import ric03 from "../assets/images/27.png";
import hvr01 from "../assets/images/28.png";
import hvr02 from "../assets/images/18a.png";
import hvr03 from "../assets/images/18b.png";
import waterm from "../assets/images/29.png";
import "./cover.css";
import "./carousel.css";
import "./carousel-two.css";

const BannerSection = () => {
  return (
    <div>
      {/* Banner Section Content */}
      <h1>Banner Section</h1>
      <p>This is a placeholder for the banner section.</p>
    </div>
  );
};

const SectionWrapper = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
              url(${video}) center center/cover no-repeat;
  color: #fff;
  padding: 5rem 0;
`;

const TitleWrapper = styled(motion.div)`
  position: absolute;
  top: 15%;
  left: 10%;
  z-index: 8;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
  font-family: 'Roboto', sans-serif;
  
  h1 {
    font-size: 3.5rem;
    margin: 0;
    font-weight: bold;
    letter-spacing: 0.1em;
  }

  p {
    font-size: 1.2rem;
    margin-top: 1rem;
  }

  .meta-yell {
    color: #f7cc2e;
  }
  
  .suit-yell {
    color: #f7cc2e;
  }
`;

const LeftTitleWrapper = styled(motion.div)`
  position: absolute;
  z-index: 8;
  top: 45%;
  left: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;

  .scan-me {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.8rem;
  }

  .arrn {
    font-size: 2.5rem;
    margin-top: 0.5rem;
  }

  img.water {
    margin-top: 1rem;
    width: 80px;
    opacity: 0.7;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const CarouselContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 2rem 0;
`;

const carouselVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay: 0.5, staggerChildren: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const CoverVideo = () => {
  return (
    <SectionWrapper>
      <TitleWrapper
        initial="hidden"
        animate="show"
        variants={carouselVariants}
      >
        <motion.h1 variants={itemVariants}>
          <p className="welcome">Welcome to <span className="meta-yell">Edgemap</span></p>
          <p className="cover-head-vid">Choose <span className="suit-yell">Your Suit</span></p>
        </motion.h1>
      </TitleWrapper>

      <LeftTitleWrapper
        initial="hidden"
        animate="show"
        variants={carouselVariants}
      >
        <motion.h1 variants={itemVariants}>
          <p className="scan-me">Scan to Launch <br /> Augmented Reality Suit <span className="arrn">&#x2193;</span></p>
          <img className="water" src={waterm} alt="Water Effect" />
        </motion.h1>
      </LeftTitleWrapper>

      <Container>
        <div className="carousel">
          <img className="rot-pic-one" src={car01} alt="Car 1" />
          <img className="rot-pic-two" src={car02} alt="Car 2" />
          <img className="rot-pic-three" src={car03} alt="Car 3" />
        </div>
        <video
    className="background-video"
    src={video}
    autoPlay
    loop
    muted
    playsInline
  />
      </Container>

      <CarouselContainer>
        <div className="carousel-two">
          <img className="ric" src={ric01} alt="Ric 1" />
          <img className="ric" src={ric02} alt="Ric 2" />
          <img className="ric" src={ric03} alt="Ric 3" />
        </div>
      </CarouselContainer>

      <Container>
        <img src={hvr01} alt="Hover 1" className="hover-pic-one" />
        <img src={hvr02} alt="Hover 2" className="hover-pic-two" />
        <img src={hvr03} alt="Hover 3" className="hover-pic-three" />
      </Container>

      <BannerSection />
    </SectionWrapper>
  );
};

export default CoverVideo;
