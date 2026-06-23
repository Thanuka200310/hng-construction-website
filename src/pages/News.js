import React, { useMemo } from "react";
import { getContent } from "../data/siteContent";

export default function News() {
  const content = useMemo(() => getContent(), []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="kicker">Latest News</p>
          <h1>Company updates</h1>
          <p className="muted">Admin can add, edit and delete company news from the admin panel.</p>
        </div>
      </section>

      <section className="section">
        <div className="container cards cards--three">
          {content.news.map((item, index) => (
            <article className="card" key={item.id}>
              <div className="card__icon">N{index + 1}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className="small">Company update</span>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
