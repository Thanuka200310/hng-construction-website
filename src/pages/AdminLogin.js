import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAdmin } from "../utils/authStore";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const submitLogin = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const admin = loginAdmin(email, password);

    if (!admin) {
      setError("Invalid admin email or password.");
      return;
    }

    navigate("/admin/dashboard", { replace: true });
  };

  return (
    <section className="auth-page admin-login-bg">
      <div className="auth-card auth-card--wide">
        <div>
          <p className="kicker">Admin Login</p>
          <h1>Manage website content</h1>
          <p className="muted">
            Admins can add, edit and delete services, projects, news, downloads, career roles, contact details and customer
            service requests.
          </p>
          <div className="notice-box">
            Demo admin: <strong>admin@hngconstruction.lk</strong><br />Password: <strong>Admin@123</strong>
          </div>
        </div>
        <div className="panel">
          <form className="form form--compact" onSubmit={submitLogin}>
            <label>
              Email
              <input name="email" type="email" defaultValue="admin@hngconstruction.lk" required />
            </label>
            <label>
              Password
              <input name="password" type="password" defaultValue="Admin@123" required />
            </label>
            <button className="btn btn--primary" type="submit">Login to Admin Panel</button>
            {error ? <p className="error-message">{error}</p> : null}
          </form>
          <Link className="small-link" to="/customer/login">Customer Login</Link>
          <Link className="small-link" to="/">← Back to website</Link>
        </div>
      </div>
    </section>
  );
}
