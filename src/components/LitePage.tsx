import { useEffect, useRef } from "react";
import { profile, experiences, projects } from "../data/portfolio";
import { MdArrowOutward, MdMailOutline } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaGlobe } from "react-icons/fa6";
import "./styles/LitePage.css";

const LitePage = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  /* subtle parallax on hero text */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onScroll = () => {
      const y = window.scrollY;
      hero.style.setProperty("--scroll-y", `${y * 0.25}px`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="lite-root">

      {/* ── NAV ── */}
      <nav className="lite-nav">
        <a href="/" className="lite-nav-brand">{profile.brand}</a>
        <div className="lite-nav-links">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="/" className="lite-nav-full">
          Full site <MdArrowOutward />
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="lite-hero" ref={heroRef} id="hero">
        <div className="lite-hero-inner">
          <div className="lite-hero-left">
            <div className="lite-availability">
              <span className="lite-dot" />
              {profile.availability}
            </div>
            <h1 className="lite-hero-name">
              {profile.name.split(" ").map((w, i) => (
                <span key={i}>{w}</span>
              ))}
            </h1>
            <div className="lite-roles">
              {profile.roles.map((r) => (
                <span key={r} className="lite-role-pill">{r}</span>
              ))}
            </div>
            <p className="lite-hero-bio">{profile.about}</p>
            <div className="lite-hero-ctas">
              <a href="/contact" className="lite-cta-primary">
                <MdMailOutline /> Get in touch
              </a>
              <a href="/" className="lite-cta-secondary">
                3D Portfolio <MdArrowOutward />
              </a>
            </div>
          </div>

          <div className="lite-hero-right">
            <div className="lite-card lite-hero-card">
              <div className="lite-hcard-label">CURRENTLY</div>
              <div className="lite-hcard-role">{experiences[0].role}</div>
              <div className="lite-hcard-org">{experiences[0].organization}</div>
              <p className="lite-hcard-desc">{experiences[0].description}</p>
              <div className="lite-hcard-year">{experiences[0].year}</div>
            </div>

            <div className="lite-hero-socials">
              <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href={profile.links.x} target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter /></a>
              <a href={profile.links.website} target="_blank" rel="noreferrer" aria-label="Website"><FaGlobe /></a>
            </div>
          </div>
        </div>

        {/* decorative grid lines */}
        <div className="lite-hero-grid" aria-hidden="true" />
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="lite-section" id="experience">
        <div className="lite-section-inner">
          <div className="lite-section-header">
            <span className="lite-eyebrow">Career</span>
            <h2 className="lite-section-title">Experience</h2>
          </div>

          <div className="lite-timeline">
            {experiences.map((exp, i) => (
              <div className="lite-timeline-item" key={exp.role}>
                <div className="lite-timeline-year">
                  <span>{exp.year}</span>
                </div>
                <div className="lite-timeline-connector">
                  <div className="lite-timeline-dot" data-current={i === 0 ? "true" : undefined} />
                  {i < experiences.length - 1 && <div className="lite-timeline-line" />}
                </div>
                <div className="lite-card lite-timeline-card">
                  <div className="lite-tcard-top">
                    <div>
                      <div className="lite-tcard-role">{exp.role}</div>
                      <div className="lite-tcard-org">{exp.organization}</div>
                    </div>
                    {i === 0 && <span className="lite-badge-now">NOW</span>}
                  </div>
                  <p className="lite-tcard-desc">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section className="lite-section lite-section-alt" id="projects">
        <div className="lite-section-inner">
          <div className="lite-section-header">
            <span className="lite-eyebrow">Work</span>
            <h2 className="lite-section-title">Projects</h2>
          </div>

          <div className="lite-projects-grid">
            {projects.map((p) => (
              <div className="lite-card lite-project-card" key={p.name}>
                <div className="lite-pcard-top">
                  <span className="lite-pcard-category">{p.category}</span>
                  <span className="lite-pcard-domain">{p.domain}</span>
                </div>
                <h3 className="lite-pcard-name">{p.name}</h3>
                <p className="lite-pcard-desc">{p.description}</p>
                <div className="lite-pcard-features">
                  {p.features.map((f) => (
                    <span key={f} className="lite-feature-chip">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / FOOTER ── */}
      <footer className="lite-footer" id="contact">
        <div className="lite-section-inner">
          <div className="lite-footer-content">
            <div className="lite-footer-left">
              <span className="lite-eyebrow">Say hello</span>
              <h2 className="lite-footer-title">Let's build<br /><em>something useful.</em></h2>
              <p className="lite-footer-sub">{profile.availability}</p>
            </div>
            <div className="lite-footer-right">
              <a href={`mailto:${profile.links.email}`} className="lite-cta-primary lite-cta-large">
                <MdMailOutline /> {profile.links.email}
              </a>
              <a href="/contact" className="lite-cta-secondary lite-cta-large">
                Open contact form <MdArrowOutward />
              </a>
              <div className="lite-footer-socials">
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <MdArrowOutward /></a>
                <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub <MdArrowOutward /></a>
                <a href={profile.links.x} target="_blank" rel="noreferrer">X <MdArrowOutward /></a>
                <a href={profile.links.website} target="_blank" rel="noreferrer">WeDevit <MdArrowOutward /></a>
              </div>
            </div>
          </div>
          <div className="lite-footer-bar">
            <span>© {new Date().getFullYear()} {profile.name}</span>
            <span className="lite-footer-mode">
              <span className="lite-dot lite-dot-sm" /> Lite version · <a href="/">Switch to full 3D site</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LitePage;
