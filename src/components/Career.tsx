import "./styles/Career.css";
import { experiences } from "../data/portfolio";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          {experiences.map((experience) => (
            <div className="career-info-box" key={experience.role}>
              <div className="career-info-in">
                <div className="career-role">
                  <h4>{experience.role}</h4>
                  <h5>{experience.organization}</h5>
                </div>
                <h3>{experience.year}</h3>
              </div>
              <p>{experience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Career;
