import styled from 'styled-components'; 
import "./banner.css";
import SLIDE from '../../../assets/images/3.jpeg';
import SLIDE1 from '../../../assets/images/4.png';
import SLIDE2 from '../../../assets/images/5.jpeg';
import SLIDE3 from '../../../assets/images/6.jpeg';
import SLIDE4 from '../../../assets/images/7.jpeg';
import SLIDE5 from '../../../assets/images/8.jpeg';
import SLIDE6 from '../../../assets/images/9.jpeg';
import SLIDE7 from '../../../assets/images/10.jpeg';
const SectionWrapper = styled.section`
  min-height: 100vh;
  width: 100vw;
  position: relative; 
  display: flex;
  margin: 0 auto;
  color: white;
  font-family: 'Albert Sans', sans-serif;

`;

const LeftContainer = styled.div`
    position: absolute;
    left: -18%;
    top: 50%;
`; 

const Container = styled.div`
  top: 10%;
  left: 5%;
  position: absolute;
  text-transform:uppercase; 
  font-family: boldgod;
`; 

 

const Banner = () => {
  return (
    <SectionWrapper id="banner" className="banner">
      <Container
        data-scroll
        data-scroll-delay=".15"
        data-scroll-speed="1"
      >
       <p className="how-work">whats included</p>
       <p className="more-thn">Teams<br />
       <span className="gen-yell">Collaboration</span>
       </p> 
       <p className="meta-des">
        <span className="ten-yell">Teams</span> provides a collaborative space for creating and sharing AI-generated content. Work together to manage prompts, track results, <br /> and streamline content creation workflows with ease. All content is organized and easily accessible for team collaboration.<br />
        </p>
      </Container> 
      <LeftContainer
       data-scroll
       data-scroll-delay=".15"
       data-scroll-speed="2">
        <div className="items">
        <div className="entry">
            <img src={SLIDE} alt="" className="slide" />
        </div>
        <div className="entry">
            <img src={SLIDE1} alt="" className="slide" />
        </div>
        <div className="entry">
            <img src={SLIDE2} alt="" className="slide" />
        </div>
        <div className="entry">
            <img src={SLIDE3} alt="" className="slide" />
        </div>
        <div className="entry">
            <img src={SLIDE4} alt="" className="slide" />
        </div>
        <div className="entry">
            <img src={SLIDE5} alt="" className="slide" />
        </div>
        <div className="entry">
            <img src={SLIDE6} alt="" className="slide" />
        </div>
        <div className="entry">
            <img src={SLIDE7} alt="" className="slide" />
        </div>
    </div>
      </LeftContainer>
    </SectionWrapper>
  );
};

export default Banner;
