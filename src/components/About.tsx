import "./styles/About.css";
import { profile } from "../data/portfolio";
import { MdArrowOutward } from "react-icons/md";
import { handleInternalLink } from "./utils/navigation";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">A little about me</h3>
        <a className="about-availability" href="/contact" onClick={handleInternalLink}>
          <span aria-hidden="true" /> {profile.availability} <MdArrowOutward aria-hidden="true" />
        </a>
        <p className="about-lead">I build practical software for real-world problems.</p>
        <p className="para">{profile.about}</p>
      </div>
    </div>
  );
};

export default About;
