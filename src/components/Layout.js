import React, { useMemo } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getContent } from "../data/siteContent";

export default function Layout() {
  const { siteSettings } = useMemo(() => getContent(), []);
  const phoneLink = siteSettings.phone.replace(/\s+/g, "");

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <span>Building Construction • Renovation • Civil Works • Interior Finishing</span>
          <span>Call: <a href={`tel:${phoneLink}`}>{siteSettings.phone}</a></span>
        </div>
      </div>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <a
        className="whatsapp-float"
        href={`https://wa.me/${siteSettings.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact HNG Construction on WhatsApp"
      >
        <span>✆</span>
        WhatsApp
      </a>
      <Footer />
    </>
  );
}
