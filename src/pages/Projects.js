import React, { useMemo } from "react";
import { getContent } from "../data/siteContent";

export default function Projects() {
  const content = useMemo(() => getContent(), []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="kicker">Projects</p>
          <h1>Project showcase</h1>
          <p className="muted">Admin can update project titles, categories and descriptions from the admin panel.</p>
        </div>
      </section>

      <section className="section">
        <div className="container project-grid">
          {content.projects.map((project) => (
            <article className="project-card" key={project.id}>
              <div className="project-card__image">
                <span>{project.type}</span>
              </div>
              <div className="project-card__body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
