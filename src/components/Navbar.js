import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/hng-logo.png";
import {
  getCurrentAdmin,
  getCurrentCustomer,
  logoutAdmin,
  logoutCustomer,
} from "../utils/authStore";

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
  const [customer, setCustomer] = useState(() => getCurrentCustomer());
  const [admin, setAdmin] = useState(() => getCurrentAdmin());

  const closeMenu = () => setOpen(false);
  const isLoggedIn = Boolean(customer || admin);
  const profilePath = admin ? "/admin/dashboard" : "/customer/login";

  const handleLogout = () => {
    logoutCustomer();
    logoutAdmin();
    setCustomer(null);
    setAdmin(null);
    closeMenu();
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Link className="brand" to="/" onClick={closeMenu}>
          <img className="brand__logo" src={logo} alt="HNG Construction logo" />

          <span className="brand__copy">
            <strong>HNG CONSTRUCTION</strong>
            <small>BUILDING BETTER SPACES</small>
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

          {isLoggedIn ? (
            <>
              <NavLink to={profilePath} onClick={closeMenu}>
                Profile
              </NavLink>

              <button className="nav__logout" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/customer/login" onClick={closeMenu}>
              Login / Register
            </NavLink>
          )}

        </nav>
      </div>
    </header>
  );
}