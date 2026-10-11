import { FormEvent, useEffect, useState } from "react";
import { MdArrowBack, MdArrowOutward, MdCheck, MdSend } from "react-icons/md";
import { profile } from "../data/portfolio";
import { handleInternalLink } from "./utils/navigation";
import "./styles/ContactPage.css";

const ContactPage = () => {
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "auto";
    window.scrollTo({ top: 0, behavior: "instant" });
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const inquiry = String(formData.get("inquiry") ?? "message");

    form.reset();
    setFormStatus(
      `Thanks${name ? `, ${name}` : ""}. Your ${inquiry.toLowerCase()} request was submitted in this browser. Message delivery is not connected yet.`
    );
  };

  return (
    <main className="contact-page">
      <div className="contact-page-noise" aria-hidden="true" />
      <header className="contact-page-header">
        <a className="contact-page-brand" href="/" onClick={handleInternalLink}>
          {profile.brand}
        </a>
        <a className="contact-back-link" href="/" onClick={handleInternalLink}>
          <MdArrowBack aria-hidden="true" /> Back to portfolio
        </a>
      </header>

      <section className="contact-page-content">
        <div className="contact-page-copy">
          <p className="contact-eyebrow"><span /> OPEN TO GOOD WORK</p>
          <h1>Let’s make<br /><em>something useful.</em></h1>
          <p className="contact-page-intro">
            Have a product to shape, a workflow to improve, or a tricky idea to explore? Tell me what you’re working on.
          </p>

          <div className="contact-page-note">
            <span className="contact-note-mark">01</span>
            <div>
              <strong>Open to working together</strong>
              <p>Project collaborations, client work, and company opportunities are welcome.</p>
            </div>
          </div>

          <div className="contact-page-socials">
            <span>FIND ME ONLINE</span>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn <MdArrowOutward /></a>
            <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub <MdArrowOutward /></a>
            <a href={profile.links.x} target="_blank" rel="noreferrer">X <MdArrowOutward /></a>
          </div>
        </div>

        <div className="contact-form-card">
          <div className="contact-form-card-heading">
            <div>
              <span className="contact-form-index">A NOTE TO MUSA</span>
              <h2>Start a conversation</h2>
            </div>
            <span className="contact-form-spark" aria-hidden="true">✳</span>
          </div>
          <p className="contact-form-description">A few details are all I need to understand how I can help.</p>

          <form className="contact-page-form" onSubmit={handleSubmit}>
            <div className="contact-page-fields">
              <label>
                <span>Your name</span>
                <input autoComplete="name" name="name" placeholder="Jane Smith" required />
              </label>
              <label>
                <span>Email address</span>
                <input autoComplete="email" name="email" placeholder="jane@company.com" required type="email" />
              </label>
            </div>
            <label>
              <span>What brings you here?</span>
              <select defaultValue="" name="inquiry" required>
                <option disabled value="">Choose an inquiry type</option>
                <option value="Project collaboration">Project collaboration</option>
                <option value="Client project">Client project</option>
                <option value="Company opportunity">Company opportunity</option>
                <option value="Other">Something else</option>
              </select>
            </label>
            <label>
              <span>What are you thinking about?</span>
              <textarea name="message" placeholder="A little about the project, timeline, or challenge…" required rows={5} />
            </label>
            <button type="submit">
              Submit message <MdSend aria-hidden="true" />
            </button>
            <p className="contact-submit-status" role="status" aria-live="polite">
              {formStatus && <><MdCheck aria-hidden="true" /> {formStatus}</>}
            </p>
          </form>
          <div className="contact-form-footnote">
            <span className="contact-status-dot" />
            <span>This form is a preview. Message delivery will be connected later.</span>
          </div>
        </div>
      </section>

      <footer className="contact-page-footer">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>Built with intention.</span>
        <a href="/" onClick={handleInternalLink}>Back to home <MdArrowOutward /></a>
      </footer>
    </main>
  );
};

export default ContactPage;
