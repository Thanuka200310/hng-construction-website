import React, { useMemo, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/hng-logo.png";
import { getContent } from "../data/siteContent";
import { getCurrentCustomer } from "../utils/authStore";

const links = [
  ["/", "Home", true],
  ["/about", "About"],
  ["/services", "Services"],
  ["/projects", "Projects"],
  ["/downloads", "Downloads"],
  ["/news", "News"],
  ["/career", "Career"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { siteSettings } = useMemo(() => getContent(), []);
  const customer = useMemo(() => getCurrentCustomer(), []);
  const closeMenu = () => setOpen(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link className="brand" to="/" onClick={closeMenu} aria-label={`${siteSettings.companyName} home`}>
          <img className="brand__logo" src={logo} alt={`${siteSettings.companyName} logo`} />
          <span className="brand__copy">
            <strong>{siteSettings.companyName}</strong>
            <small>{siteSettings.tagline}</small>
          </span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Open navigation menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${open ? "is-open" : ""}`}>
          {links.map(([to, label, end]) => (
            <NavLink key={to} to={to} end={Boolean(end)} onClick={closeMenu}>
              {label}
            </NavLink>
          ))}
          <NavLink to="/customer/login" onClick={closeMenu}>
            {customer ? "My Account" : "Customer Login"}
          </NavLink>
          <NavLink className="nav__admin" to="/admin/login" onClick={closeMenu}>
            Admin
          </NavLink>
          <NavLink className="nav__cta" to="/service-request" onClick={closeMenu}>
            Request Service
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
