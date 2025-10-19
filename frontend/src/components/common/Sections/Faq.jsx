import styled from 'styled-components'; 
import black01 from '../../../assets/images/2.png';
import "./faq.css";

const SectionWrapper = styled.section`
  min-height: 100vh;
  width: 100vw;
  position: relative; 
  display: flex;
  margin-top: 40px;
  color: white; 
  margin-left: 50px;
`;

const LeftContainer = styled.div`
  top: 10%;
  left: 5%;
  position: absolute;
  text-transform:uppercase; 
  font-family: boldgod;
`; 

const BannerComponent = styled.div`
  white-space: nowrap;
`;

const Container = styled.div` 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
`;

const Faq = () => {
  return (
    <SectionWrapper id="faq" className="faq">
      <Container id="up">
        <BannerComponent>
          <img src={black01} className="rick-pic"
            data-scroll
            data-scroll-speed="-2"
            data-scroll-direction="horizontal"
          />
        </BannerComponent>
      </Container>

      <LeftContainer
        data-scroll
        data-scroll-delay=".15"
        data-scroll-speed="1"
      > 
        <section className="accordion">
          <input type="checkbox" name="collapse" id="handle1" />
          <h2 className="handle">
            <label htmlFor="handle1">What is Teams?</label>
          </h2>
          <div className="content">
            <p>
              Teams is a collaborative platform where users can create, share, and manage AI prompts together, making team-based content creation seamless and efficient.
            </p>
          </div>
        </section>

        <section className="accordion">
          <input type="checkbox" name="collapse2" id="handle2" />
          <h2 className="handle">
            <label htmlFor="handle2">How does History work?</label>
          </h2>
          <div className="content">
            <p>
              History tracks all of your AI-generated content, from prompts to final results, in a simple and organized way. This allows easy access and management of all assets created.
            </p>
          </div>
        </section> 

        <section className="accordion">
          <input type="checkbox" name="collapse2" id="handle3" />
          <h2 className="handle">
            <label htmlFor="handle3">How can I collaborate with my team?</label>
          </h2>
          <div className="content">
            <p>
              Collaboration in Teams is easy—create prompts, share them with your team, and manage results all in one place. Teams can work together on AI-generated content, sharing assets and ideas in real time.
            </p>
          </div>
        </section> 

        <section className="accordion">
          <input type="checkbox" name="collapse2" id="handle4" />
          <h2 className="handle">
            <label htmlFor="handle4">How do I join or create a team?</label>
          </h2>
          <div className="content">
            <p>
              You can search for an existing team to join or create a new one. Once you’re part of a team, you’ll have access to shared prompts and results, allowing you to collaborate effectively.
            </p>
          </div>
        </section> 

        <section className="accordion">
          <input type="checkbox" name="collapse2" id="handle5" />
          <h2 className="handle">
            <label htmlFor="handle5">How do I view my History?</label>
          </h2>
          <div className="content">
            <p>
              After joining or creating a team, you can view your History to see all the prompts you’ve created and the corresponding results. It's easy to track and manage your past AI-generated content.
            </p>
          </div>
        </section> 
      </LeftContainer>
    </SectionWrapper>
  );
};

export default Faq;
