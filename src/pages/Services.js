import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { getContent } from "../data/siteContent";

export default function Services() {
  const content = useMemo(() => getContent(), []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="kicker">Services</p>
          <h1>Professional construction services for quality results.</h1>
          <p className="muted">
            Everyone can browse our services freely. When you need to request a service, login with phone or email
            verification and submit your project details.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container cards cards--three">
          {content.services.map((service, index) => (
            <article className="card service-card" key={service.id}>
              <div className="card__icon">{String(index + 1).padStart(2, "0")}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to={`/service-request?service=${encodeURIComponent(service.id)}`}>
  Request Service →
</Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
