import { PropsWithChildren } from "react";
import { profile } from "../data/portfolio";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const [fullStackRole, freelancerRole, devOpsRole, solopreneurRole] =
    profile.roles;
  const developerRole = fullStackRole.replace("Full-Stack ", "");

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              QAZI
              <br />
              <span>MUSA</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3>{fullStackRole.replace(` ${developerRole}`, "")}</h3>
            <h2 className="landing-info-h2">
              <div className="landing-h2-1">{developerRole}</div>
              <div className="landing-h2-2">{freelancerRole}</div>
            </h2>
            <h2>
              <div className="landing-h2-info">{devOpsRole}</div>
              <div className="landing-h2-info-1">{solopreneurRole}</div>
            </h2>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
