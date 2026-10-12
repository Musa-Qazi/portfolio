import {
  FaGithub,
  FaGlobe,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { MdArrowOutward } from "react-icons/md";
import { HiChatAlt2 } from "react-icons/hi";
import { useEffect, useRef } from "react";
import { profile } from "../data/portfolio";
import { handleInternalLink } from "./utils/navigation";
import { gsap } from "gsap";

const SocialIcons = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    const cleanups: Array<() => void> = [];

    /* ── magnetic social icons ── */
    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;
      let frameId = 0;
      let active = true;

      const updatePosition = () => {
        if (!active) return;
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);
        frameId = requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      cleanups.push(() => {
        active = false;
        cancelAnimationFrame(frameId);
        document.removeEventListener("mousemove", onMouseMove);
      });
    });

    /* ── hide icons when footer is on-screen ──
       Uses gsap.ticker so it works with ScrollSmoother's CSS-transform-based scroll.
       getBoundingClientRect() always returns the real rendered position. */
    const footer = document.getElementById("footer");
    const section = sectionRef.current;

    const checkFooter = () => {
      if (!footer || !section) return;
      const top = footer.getBoundingClientRect().top;
      if (top < window.innerHeight) {
        section.classList.add("icons-hidden");
      } else {
        section.classList.remove("icons-hidden");
      }
    };

    gsap.ticker.add(checkFooter);

    return () => {
      gsap.ticker.remove(checkFooter);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div className="icons-section" ref={sectionRef}>
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
        </span>
        <span>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <FaLinkedinIn />
          </a>
        </span>
        <span>
          <a href={profile.links.x} target="_blank" rel="noreferrer" aria-label="X">
            <FaXTwitter />
          </a>
        </span>
        <span>
          <a href={profile.links.website} target="_blank" rel="noreferrer" aria-label="WeDevit Technologies">
            <FaGlobe />
          </a>
        </span>
      </div>

      {/* Floating neon CTA — chatbot-style */}
      <a
        className="contact-cta"
        href="/contact"
        onClick={handleInternalLink}
        data-cursor="disable"
        aria-label="Contact"
      >
        <span className="cta-label">
          LET'S TALK <MdArrowOutward />
        </span>
        <span className="cta-icon" aria-hidden="true">
          <HiChatAlt2 />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
