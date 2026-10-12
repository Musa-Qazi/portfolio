import { useEffect, useRef } from "react";
import { profile, experiences, projects } from "../data/portfolio";
import { MdArrowOutward, MdMailOutline } from "react-icons/md";
import { FaGithub, FaLinkedinIn, FaXTwitter, FaGlobe } from "react-icons/fa6";
import "./styles/LitePage.css";

const LitePage = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  /* ── unlock scroll (body has overflow:hidden globally) */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "auto";
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => { document.body.style.overflow = prev; };
  }, []);

  /* ── scroll progress bar */
  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── scroll-reveal via IntersectionObserver */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <div className="lite-root">
      {/* scroll progress */}
      <div className="lite-progress" ref={progressRef} aria-hidden="true" />

      {/* ── NAV */}
      <nav className="lite-nav">
        <a href="/" className="lite-nav-brand">{profile.brand}</a>
        <div className="lite-nav-links">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="/" className="lite-nav-full">
          3D Site <MdArrowOutward />
        </a>
      </nav>

      {/* ── HERO */}
      <section className="lite-hero" id="hero">
        {/* decorative orbs */}
        <div className="lite-orb lite-orb-1" aria-hidden="true" />
        <div className="lite-orb lite-orb-2" aria-hidden="true" />
        <div className="lite-hero-noise" aria-hidden="true" />

        <div className="lite-hero-inner">
          <div className="lite-hero-left">
            <div className="lite-availability reveal">
              <span className="lite-dot" />
              {profile.availability}
            </div>

            <h1 className="lite-hero-name reveal">
              <span className="lite-name-line">QAZI</span>
              <span className="lite-name-line lite-name-accent">MUSA</span>
            </h1>

            <div className="lite-roles reveal">
              {profile.roles.map((r) => (
                <span key={r} className="lite-role-pill">{r}</span>
              ))}
            </div>

            <p className="lite-hero-bio reveal">{profile.about}</p>

            <div className="lite-hero-ctas reveal">
              <a href="/contact" className="lite-cta-primary">
                <MdMailOutline /> Get in touch
              </a>
              <a href="/" className="lite-cta-ghost">
                View 3D portfolio <MdArrowOutward />
              </a>
            </div>
          </div>

          <div className="lite-hero-right reveal">
            {/* current role card */}
            <div className="lite-glass-card lite-role-card">
              <div className="lite-role-card-glow" aria-hidden="true" />
              <span className="lite-label-tag">Currently</span>
              <div className="lite-role-big">{experiences[0].role}</div>
              <div className="lite-role-org">{experiences[0].organization}</div>
              <p className="lite-role-desc">{experiences[0].description}</p>
              <span className="lite-year-badge">{experiences[0].year}</span>
            </div>

            {/* social strip */}
            <div className="lite-social-strip">
              <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
              <a href={profile.links.x} target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter /></a>
              <a href={profile.links.website} target="_blank" rel="noreferrer" aria-label="Website"><FaGlobe /></a>
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="lite-scroll-hint reveal" aria-hidden="true">
          <div className="lite-scroll-mouse"><div className="lite-scroll-wheel" /></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ── EXPERIENCE */}
      <section className="lite-section" id="experience">
        <div className="lite-section-inner">
          <div className="lite-section-head reveal">
            <span className="lite-eyebrow">Career</span>
            <h2 className="lite-section-title">Experience</h2>
          </div>

          <div className="lite-timeline">
            {experiences.map((exp, i) => (
              <div className="lite-timeline-item reveal" key={exp.role} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="lite-tl-year">{exp.year}</div>
                <div className="lite-tl-track">
                  <div className={`lite-tl-dot ${i === 0 ? "is-current" : ""}`} />
                  {i < experiences.length - 1 && <div className="lite-tl-line" />}
                </div>
                <div className="lite-glass-card lite-tl-card">
                  <div className="lite-tl-head">
                    <div>
                      <div className="lite-tl-role">{exp.role}</div>
                      <div className="lite-tl-org">{exp.organization}</div>
                    </div>
                    {i === 0 && <span className="lite-now-badge">NOW</span>}
                  </div>
                  <p className="lite-tl-desc">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS */}
      <section className="lite-section lite-projects-section" id="projects">
        <div className="lite-section-inner">
          <div className="lite-section-head reveal">
            <span className="lite-eyebrow">Selected work</span>
            <h2 className="lite-section-title">Projects</h2>
          </div>

          {/* featured */}
          <div className="lite-featured-card reveal">
            <div className="lite-featured-glow" aria-hidden="true" />
            <div className="lite-featured-inner">
              <div className="lite-featured-meta">
                <span className="lite-cat-pill">{featuredProject.category}</span>
                <span className="lite-domain-tag">{featuredProject.domain}</span>
              </div>
              <h3 className="lite-featured-name">{featuredProject.name}</h3>
              <p className="lite-featured-desc">{featuredProject.description}</p>
              <div className="lite-chips">
                {featuredProject.features.map((f) => (
                  <span key={f} className="lite-chip">{f}</span>
                ))}
              </div>
            </div>
          </div>

          {/* grid */}
          <div className="lite-projects-grid">
            {otherProjects.map((p, i) => (
              <div
                className="lite-glass-card lite-project-card reveal"
                key={p.name}
                style={{ animationDelay: `${(i % 3) * 60}ms` }}
              >
                <div className="lite-pc-top">
                  <span className="lite-cat-pill lite-cat-sm">{p.category}</span>
                  <span className="lite-domain-tag">{p.domain}</span>
                </div>
                <h3 className="lite-pc-name">{p.name}</h3>
                <p className="lite-pc-desc">{p.description}</p>
                <div className="lite-chips">
                  {p.features.map((f) => (
                    <span key={f} className="lite-chip">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT / FOOTER */}
      <footer className="lite-footer" id="contact">
        <div className="lite-footer-orb" aria-hidden="true" />
        <div className="lite-section-inner">
          <div className="lite-footer-content">
            <div className="lite-footer-left reveal">
              <span className="lite-eyebrow">Say hello</span>
              <h2 className="lite-footer-title">
                Let's build<br />
                <em>something useful.</em>
              </h2>
              <p className="lite-footer-sub">{profile.availability}</p>
            </div>

            <div className="lite-footer-right reveal">
              <a href={`mailto:${profile.links.email}`} className="lite-cta-primary lite-cta-lg">
                <MdMailOutline /> {profile.links.email}
              </a>
              <a href="/contact" className="lite-cta-ghost lite-cta-lg">
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
              <span className="lite-dot lite-dot-sm" />
              Lite version ·&nbsp;<a href="/">Switch to full 3D site</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LitePage;
