import React, { useMemo } from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getContent } from "../data/siteContent";

export default function Layout() {
  const { siteSettings } = useMemo(() => getContent(), []);

  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Link
        className="request-float"
        to="/service-request"
        aria-label="Request HNG Construction service"
      >
        <span>＋</span>
        Request Service
      </Link>

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