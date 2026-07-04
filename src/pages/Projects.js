import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { getContent } from "../data/siteContent";

export default function Projects() {
  const content = useMemo(() => getContent(), []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="kicker">Projects</p>
          <h1>Project showcase</h1>
          <p className="muted">
            View our completed and ongoing construction projects.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container project-grid">
          {content.projects.map((project) => (
            <article className="project-card" key={project.id}>
              <Link className="project-card__link" to={`/projects/${project.id}`}>
                <div className="project-card__image">
                  {project.image ? (
                    <img src={project.image} alt={project.title} />
                  ) : null}

                  <span>{project.type}</span>
                </div>

                <div className="project-card__body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <span className="project-view-btn">
                    View Project Gallery
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}