import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { profile } from "../data/portfolio";
import { setSmoother, smoother } from "./utils/smoother";
import { handleInternalLink } from "./utils/navigation";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    const activeSmoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    setSmoother(activeSmoother);
    activeSmoother.scrollTop(0);
    activeSmoother.paused(true);

    // Hide nav links after scrolling past hero
    const headerUl = document.querySelector(".header ul") as HTMLElement | null;
    let navST: ScrollTrigger | null = null;
    if (headerUl) {
      navST = ScrollTrigger.create({
        start: "120px top",
        onEnter: () => headerUl.classList.add("nav-links-hidden"),
        onLeaveBack: () => headerUl.classList.remove("nav-links-hidden"),
      });
    }

    const links = document.querySelectorAll(".header ul a");
    const linkHandlers = new Map<HTMLAnchorElement, (event: MouseEvent) => void>();
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      const handleClick = (e: MouseEvent) => {
        const section = element.getAttribute("data-href");
        if (section) {
          e.preventDefault();
          activeSmoother.scrollTo(section, true, "top top");
        }
      };
      element.addEventListener("click", handleClick);
      linkHandlers.set(element, handleClick);
    });

    const handleResize = () => {
      ScrollSmoother.refresh(true);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      linkHandlers.forEach((handler, element) =>
        element.removeEventListener("click", handler)
      );
      window.removeEventListener("resize", handleResize);
      navST?.kill();
      activeSmoother.kill();
      if (smoother === activeSmoother) setSmoother(undefined);
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {profile.brand}
        </a>
        <a
          href={profile.links.linkedin}
          className="navbar-connect"
          data-cursor="disable"
        >
          Full-Stack · AI · DevOps
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a href="/contact" onClick={handleInternalLink}>
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
