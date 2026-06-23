import React, { useMemo } from "react";
import { getContent } from "../data/siteContent";

export default function Downloads() {
  const content = useMemo(() => getContent(), []);

  const preventEmptyLink = (event, link) => {
    if (!link || link === "#") event.preventDefault();
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="kicker">Downloads</p>
          <h1>Documents & brochures</h1>
          <p className="muted">Admin can update document names, notes and links from the admin panel.</p>
        </div>
      </section>

      <section className="section">
        <div className="container download-list">
          {content.downloads.map((doc) => (
            <a href={doc.link || "#"} onClick={(event) => preventEmptyLink(event, doc.link)} className="download-item" key={doc.id}>
              <span>{doc.title}</span>
              <em>{doc.note}</em>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
