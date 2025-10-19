import styled from 'styled-components'; 
import "./new.css";
import ATR01 from '../../../assets/images/30.jpeg';
import ATR02 from '../../../assets/images/22.png';
import ATR03 from '../../../assets/images/23.png';
import ATR04 from '../../../assets/images/1.jpeg';

const SectionWrapper = styled.section`
  min-height: 100vh;
  width: 100vw;
  position: relative; 
  display: flex;
  margin: 0 auto;
  color: white;
  font-family: 'Albert Sans', sans-serif;

`;

const Container = styled.div`
  position: absolute; 
  top: 43%;
`; 
 

const LeftContainer = styled.div`
  top: 5%;
  left: 5%;
  position: absolute;
  text-transform:uppercase; 
  font-family: boldgod;
`; 
 
const Third = () => {
  return (
    <SectionWrapper id="fixed-target" className="about">
      

      <LeftContainer
        data-scroll
        data-scroll-delay=".15"
        data-scroll-speed="1"
      >
       <p className="more-thn">Our<br />
       <span className="our-yell">solution</span>
       </p> 
       <p className="meta-des">
        We're building a platform to empower teams and individuals to create and manage AI-generated content. Our goal is to make collaborative content creation seamless and give users complete control over their assets and history.
       </p>
      </LeftContainer> 
      <Container
       data-scroll
       data-scroll-delay=".15"
       data-scroll-speed="1">
        
        <div class="row">
        <div class="col col1">
        <img className="mint-vr" src={ATR01} alt="" />
        <p className="fut-des">
          With <span className="q-yell">Teams</span>, users can collaborate <br />
          on AI-generated content, creating, sharing, and managing <br />
          prompts efficiently.
        </p>
        </div>

        <div class="col col2">
        <img className="mint-vr" src={ATR02} alt="" />        

        <p className="fut-des">
          <span className="q-yell">History</span> tracks all your generated content, from prompts to final results, in a simple and organized way for easy access and management.<br />
        </p>
        </div>

        <div class="col col3">
        <img className="mint-vr" src={ATR03} alt="" />        
        <p className="fut-des">
          Improving <span className="q-yell">collaboration</span> tools for teams, allowing easier access to shared content and streamlined workflows for team AI content creation.<br />
        </p>
        </div>

        <div class="col col4">
        <img className="mint-vr" src={ATR04} alt="" />        
        <p className="fut-des">
          <span className="q-yell">Our goal</span> is to introduce advanced features like personalized recommendations, analytics, and deeper AI integration to enhance the user experience.<br />
        </p>
        </div>
        </div>
      </Container>
      
    </SectionWrapper>
  );
};

export default Third;
