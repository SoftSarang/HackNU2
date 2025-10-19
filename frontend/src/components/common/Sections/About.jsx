import styled from 'styled-components';
import purp01 from '../../../assets/images/67.png';
import "./about.css";
const SectionWrapper = styled.section`
  min-height: 100vh;
  width: 100vw;
  position: relative; 
  display: flex;
  margin-left: 100px;
  color: white;
  font-family: 'Albert Sans', sans-serif;

`;


const LeftContainer = styled.div`
  top: 10%;
  left: 5%;
  position: absolute;
  text-transform:uppercase; 
  font-family: boldgod;
`; 

const BannerComponent = styled.div`
 
`;
const Container = styled.div`
 
`;

const About = () => {
  return (
    <SectionWrapper id="about" className="about">
      

      <LeftContainer
        data-scroll
        data-scroll-delay=".15"
        data-scroll-speed="1"
      >
       <p className="how-work">How it works</p>
       <p className="more-thn"><span className="more-yell">More </span>than a <br />
       AI platform 
       </p> 
       <p className="meta-des">
        <span className="nft-yell">Teams</span> allows users to collaborate and manage AI-generated content, <br />
          creating, sharing, and tracking prompts and results with ease. <br />
          It's a platform built to help teams work together on creative AI projects, <br />
          providing seamless content creation and management.
       </p>
      </LeftContainer>
      <Container id="up">
      <BannerComponent>
          <img src={purp01} className="purp-pic"
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="8"
            data-scroll-target="#up"
          >
          </img>
      </BannerComponent>
      </Container>
      
      
    </SectionWrapper>
  );
};

export default About;
