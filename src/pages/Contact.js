import React, { useMemo, useState } from "react";
import { getContent, saveContactMessage } from "../data/siteContent";

export default function Contact() {
  const content = useMemo(() => getContent(), []);
  const { siteSettings } = content;
  const [message, setMessage] = useState("");
  const phoneLink = siteSettings.phone.replace(/\s+/g, "");

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    saveContactMessage({
      name,
      phone: String(form.get("phone") || "").trim(),
      email: String(form.get("email") || "").trim(),
      details: String(form.get("details") || "").trim(),
    });
    setMessage(`Thanks ${name || "there"}. Your message has been saved. Admin can view it in the admin panel.`);
    event.currentTarget.reset();
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="kicker">Contact</p>
          <h1>Request a quotation</h1>
          <p className="muted">Send your project details and HNG Construction will contact you with the next steps.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="panel contact-info">
            <h2>Contact Details</h2>
            <p>
              <strong>Phone:</strong> <a href={`tel:${phoneLink}`}>{siteSettings.phone}</a><br />
              <strong>Email:</strong> <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a><br />
              <strong>Location:</strong> {siteSettings.location}
            </p>
            <div className="value-list">
              {content.contactBadges.map((badge) => <span key={badge.id}>{badge.title}</span>)}
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form__row">
              <label>
                Name
                <input name="name" type="text" placeholder="Your name" required />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" placeholder="Your phone number" required />
              </label>
            </div>
            <label>
              Email
              <input name="email" type="email" placeholder="your@email.com" />
            </label>
            <label>
              Project Details
              <textarea name="details" rows="5" placeholder="Tell us about your construction work" required />
            </label>
            <button className="btn btn--primary" type="submit">Send Message</button>
            {message ? <p className="success-message">{message}</p> : null}
          </form>
        </div>
      </section>
    </>
  );
}
