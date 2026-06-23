import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/hng-logo.png";
import { getContent } from "../data/siteContent";

export default function Home() {
  const content = useMemo(() => getContent(), []);

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content fade-up">
            <p className="kicker">Welcome to {content.siteSettings.companyName}</p>
            <h1>Strong buildings, clean finishing and trusted project delivery.</h1>
            <p className="hero__text">
              HNG Construction delivers professional construction solutions for homes, businesses and property
              development projects. We combine practical planning, skilled workmanship and quality materials to create
              spaces that are safe, durable and visually impressive.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--primary" to="/services">Explore Services</Link>
              <Link className="btn btn--light" to="/service-request">Request a Service</Link>
            </div>
            <div className="hero__badges">
              <span>Modern Construction</span>
              <span>Reliable Team</span>
              <span>Premium Finishing</span>
            </div>
          </div>

          <div className="hero__visual fade-up delay-1">
            <div className="logo-card float-card">
              <img src={logo} alt={content.siteSettings.companyName} />
            </div>
            <div className="mini-card mini-card--one">Project Planning</div>
            <div className="mini-card mini-card--two">Site Supervision</div>
          </div>
        </div>
      </section>

      <section className="stats section--compact">
        <div className="container stats__grid">
          {content.homeHighlights.map((item) => (
            <div className="stat" key={item.id}>
              <strong>{item.title}</strong>
              <span>{item.subtitle}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container section__head">
          <p className="kicker">Our Main Services</p>
          <h2>Construction solutions from foundation to final finish</h2>
          <p className="muted">Start with site planning and finish with a professional handover ready for use.</p>
        </div>
        <div className="container cards">
          {content.homeServices.map((service, index) => (
            <article className="card service-card" key={service.id}>
              <div className="card__icon">{String(index + 1).padStart(2, "0")}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to="/services">View Details →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--accent">
        <div className="container split">
          <div>
            <p className="kicker">Why Choose HNG</p>
            <h2>Built with planning, quality and responsibility</h2>
            <p>
              Every project is managed with clear communication, proper material handling, site supervision and clean
              finishing standards so clients can complete work with confidence.
            </p>
          </div>
          <div className="checklist-card">
            <ul>
              <li>Professional site visits and project planning</li>
              <li>Clean workmanship with attention to detail</li>
              <li>Safety-focused construction process</li>
              <li>Transparent quotation and progress updates</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
