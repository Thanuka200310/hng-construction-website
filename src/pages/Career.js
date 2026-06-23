import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { getContent } from "../data/siteContent";

export default function Career() {
  const content = useMemo(() => getContent(), []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="kicker">Career</p>
          <h1>Join the HNG Construction team</h1>
          <p className="muted">This page can be used for job vacancies, skilled worker applications and site staff recruitment.</p>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="panel soft-panel">
            <h2>Available Roles</h2>
            <ul className="clean-list">
              {content.careerRoles.map((role) => <li key={role.id}>{role.title}</li>)}
            </ul>
          </div>
          <div>
            <h2>Send your details</h2>
            <p className="muted">
              Interested workers can contact HNG Construction with experience details, location and phone number.
            </p>
            <Link className="btn btn--primary" to="/contact">Apply Now</Link>
          </div>
        </div>
      </section>
    </>
  );
}
