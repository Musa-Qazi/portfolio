import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/portfolio";
import WorkImage from "./WorkImage";
import { smoother } from "./utils/smoother";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let context: gsap.Context | null = null;
    let animationFrame = 0;
    let cancelled = false;

    // Mobile: skip GSAP horizontal scroll entirely — CSS handles vertical stack
    if (window.innerWidth <= 1024) return;

    const createScrollAnimation = () => {
      if (cancelled) return;
      const section = sectionRef.current;
      const container = containerRef.current;
      const track = trackRef.current;
      if (!section || !container || !track || !smoother) {
        animationFrame = requestAnimationFrame(createScrollAnimation);
        return;
      }

      context = gsap.context(() => {
        const getTravelDistance = () => {
          const cards = Array.from(track.children) as HTMLElement[];
          const styles = window.getComputedStyle(track);
          const gap = parseFloat(styles.columnGap) || 0;
          const padding =
            (parseFloat(styles.paddingLeft) || 0) +
            (parseFloat(styles.paddingRight) || 0);
          const cardsWidth = cards.reduce(
            (width, card) => width + card.offsetWidth,
            0
          );
          const gapsWidth = Math.max(0, cards.length - 1) * gap;

          return Math.max(
            0,
            cardsWidth + gapsWidth + padding - container.clientWidth
          );
        };

        gsap.to(track, {
          x: () => -getTravelDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getTravelDistance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
            id: "work",
          },
        });
      });

      ScrollTrigger.refresh();
    };

    animationFrame = requestAnimationFrame(createScrollAnimation);
    return () => {
      cancelled = true;
      cancelAnimationFrame(animationFrame);
      context?.revert();
    };
  }, []);

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container" ref={containerRef}>
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex" ref={trackRef}>
          {projects.map((project, index) => (
            <div className="work-box" key={project.name}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{String(index + 1).padStart(2, "0")}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.domain}</p>
                  </div>
                </div>
                <p>{project.description}</p>
                <h4>Tools and features</h4>
                <p>{project.features.join(" · ")}</p>
              </div>
              <WorkImage project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
