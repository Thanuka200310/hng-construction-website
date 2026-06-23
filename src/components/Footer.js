import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/hng-logo.png";
import { getContent } from "../data/siteContent";

export default function Footer() {
  const { siteSettings } = useMemo(() => getContent(), []);
  const phoneLink = siteSettings.phone.replace(/\s+/g, "");

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <div className="footer__brand">
            <img src={logo} alt={siteSettings.companyName} />
            <div>
              <strong>{siteSettings.companyName}</strong>
              <small>{siteSettings.tagline}</small>
            </div>
          </div>
          <p className="muted">
            HNG Construction provides reliable building construction, renovation, civil work and finishing services
            with careful planning, safe work practices and a strong focus on quality.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/service-request">Request Service</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h4>Contact</h4>
          <p className="muted">
            Phone: <a href={`tel:${phoneLink}`}>{siteSettings.phone}</a><br />
            Email: <a href={`mailto:${siteSettings.email}`}>{siteSettings.email}</a><br />
            Location: {siteSettings.location}
          </p>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} {siteSettings.companyName}. All rights reserved.</span>
        <span>{siteSettings.footerNote}</span>
      </div>
    </footer>
  );
}
