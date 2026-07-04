import React, { useMemo } from "react";
import { getContent } from "../data/siteContent";

function hasValidLink(link) {
  return (
    link &&
    String(link).trim() !== "" &&
    String(link).trim() !== "#" &&
    !String(link).startsWith("data:")
  );
}

export default function Downloads() {
  const content = useMemo(() => getContent(), []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="kicker">Downloads</p>
          <h1>Documents & brochures</h1>
          <p className="muted">
            Download company profiles, service documents and policy files.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container download-list">
          {content.downloads.map((doc) => {
            const canOpen = hasValidLink(doc.link);

            return (
              <article className="download-item" key={doc.id}>
                <div>
                  <span>{doc.title}</span>
                </div>

                {canOpen ? (
                  <div className="download-actions">
                    <a
                      className="download-btn"
                      href={doc.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View PDF
                    </a>

                    <a
                      className="download-btn download-btn--light"
                      href={doc.link}
                      download
                    >
                      Download
                    </a>
                  </div>
                ) : (
                  <button
                    className="download-btn is-disabled"
                    type="button"
                    disabled
                  >
                    Fix PDF Link
                  </button>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}