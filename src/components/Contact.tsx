import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { profile } from "../data/portfolio";
import "./styles/Contact.css";
import { handleInternalLink } from "./utils/navigation";

const Contact = () => {
  return (
    <footer className="portfolio-footer" id="footer">
      <span className="footer-credit">
        <MdCopyright aria-hidden="true" /> {new Date().getFullYear()} {profile.name}
      </span>
      <a href="/contact" onClick={handleInternalLink} data-cursor="disable">
        Contact us <MdArrowOutward aria-hidden="true" />
      </a>
      <div className="footer-socials" aria-label="Social links">
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.links.x} target="_blank" rel="noreferrer">X</a>
      </div>
    </footer>
  );
};

export default Contact;
