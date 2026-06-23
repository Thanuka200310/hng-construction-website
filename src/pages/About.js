import React from "react";

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="kicker">About HNG</p>
          <h1>Construction service built on trust, quality and responsibility.</h1>
          <p className="muted">
            HNG Construction is focused on delivering reliable construction work for residential, commercial and
            development projects with careful planning and strong finishing standards.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>Who we are</h2>
            <p className="muted">
              We support clients with building construction, renovation, civil work, maintenance and interior finishing.
              Our process is designed to make construction easier by giving clients clear communication, organized work
              schedules and professional project handling.
            </p>
            <p className="muted">
              From small upgrades to complete building projects, HNG Construction focuses on dependable workmanship,
              clean site management, quality materials and a final finish that reflects the client's expectations.
            </p>
          </div>
          <div className="panel soft-panel">
            <h3>Our Values</h3>
            <div className="value-list">
              <span>Quality</span>
              <span>Safety</span>
              <span>Trust</span>
              <span>Timely Delivery</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--light">
        <div className="container cards cards--three">
          <article className="card">
            <div className="card__icon">01</div>
            <h3>Vision</h3>
            <p>To become a trusted construction partner known for quality, modern work standards and professional service.</p>
          </article>
          <article className="card">
            <div className="card__icon">02</div>
            <h3>Mission</h3>
            <p>To deliver construction projects through skilled labour, careful planning and honest client communication.</p>
          </article>
          <article className="card">
            <div className="card__icon">03</div>
            <h3>Promise</h3>
            <p>We respect every client requirement and complete work with clean finishing, safety and responsibility.</p>
          </article>
        </div>
      </section>
    </>
  );
}
