import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getContent, getContentOnline } from "../data/siteContent";

function splitGallery(value) {
  if (!value) return [];

  return String(value)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function ProjectDetails() {
  const { projectId } = useParams();
  const [content, setContent] = useState(() => getContent());

  useEffect(() => {
    getContentOnline().then(setContent);
  }, []);

  const project = content.projects.find((item) => item.id === projectId);

  if (!project) {
    return (
      <section className="section">
        <div className="container">
          <h1>Project not found</h1>
          <Link className="btn btn--primary" to="/projects">
            Back to Projects
          </Link>
        </div>
      </section>
    );
  }

  const galleryImages = [
    project.image,
    ...splitGallery(project.gallery),
  ].filter(Boolean);

  const uniqueImages = [...new Set(galleryImages)];

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="kicker">{project.type}</p>
          <h1>{project.title}</h1>
          <p className="muted">{project.description}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Link className="small-link" to="/projects">
            ← Back to Projects
          </Link>

          {uniqueImages.length ? (
            <div className="project-details-gallery">
              {uniqueImages.map((image, index) => (
                <a
                  key={`${index}-${image.slice(0, 50)}`}
                  href={image}
                  target="_blank"
                  rel="noreferrer"
                  className="project-details-gallery__item"
                >
                  <img
                    src={image}
                    alt={`${project.title} ${index + 1}`}
                  />
                </a>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              No project images added yet.
            </div>
          )}
        </div>
      </section>
    </>
  );
}