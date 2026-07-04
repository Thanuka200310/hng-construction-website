import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  getCurrentAdmin,
  getCurrentCustomer,
  logoutAdmin,
  logoutCustomer,
  setCurrentAdmin,
  setCurrentCustomer,
} from "../utils/authStore";


export default function CustomerLogin() {
  const navigate = useNavigate();

  const existingCustomer = useMemo(() => getCurrentCustomer(), []);
  const existingAdmin = useMemo(() => getCurrentAdmin(), []);

  const [customer, setCustomer] = useState(existingCustomer);
  const [admin, setAdmin] = useState(existingAdmin);
  const [mode, setMode] = useState("login");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

 const handleLogin = async (event) => {
  event.preventDefault();
  setMessage("");
  setError("");
  setLoading(true);

  const form = new FormData(event.currentTarget);
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");

  if (!email || !password) {
    setError("Please enter email and password.");
    setLoading(false);
    return;
  }

  const { data, error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    setError(loginError.message);
    setLoading(false);
    return;
  }

  const user = data.user;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, name, email, phone, role, status")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    setError("Profile not found. Please contact admin.");
    setLoading(false);
    return;
  }

  if (profile.status === "deleted") {
    setError("This account has been disabled by admin.");
    await supabase.auth.signOut();
    setLoading(false);
    return;
  }

  await supabase
    .from("profiles")
    .update({
      last_login_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (profile.role === "admin") {
    const safeAdmin = {
      id: user.id,
      name: profile.name || "Admin",
      email: profile.email || user.email,
      phone: profile.phone || "",
      role: "admin",
    };

    logoutCustomer();
    setCurrentAdmin(safeAdmin);
    setAdmin(safeAdmin);
    setCustomer(null);
    navigate("/admin/dashboard", { replace: true });
    return;
  }

  const safeCustomer = {
    id: user.id,
    name: profile.name || "Customer",
    email: profile.email || user.email,
    phone: profile.phone || "",
    role: "customer",
    loginAt: new Date().toISOString(),
  };

  logoutAdmin();
  setCurrentCustomer(safeCustomer);
  setCustomer(safeCustomer);
  setAdmin(null);
  navigate("/service-request", { replace: true });
};

 const handleRegister = async (event) => {
  event.preventDefault();
  setMessage("");
  setError("");
  setLoading(true);

  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  const phone = String(form.get("phone") || "").trim();
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  const confirmPassword = String(form.get("confirmPassword") || "");

  if (!name || !phone || !email || !password) {
    setError("Please fill all required fields.");
    setLoading(false);
    return;
  }

  if (password.length < 6) {
    setError("Password must be at least 6 characters.");
    setLoading(false);
    return;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match.");
    setLoading(false);
    return;
  }

  const { error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        phone,
        role: "customer",
      },
    },
  });

  if (signupError) {
    setError(signupError.message);
    setLoading(false);
    return;
  }

  setMessage("Account created successfully. Please login.");
  setMode("login");
  setLoading(false);
};

  const handleLogout = () => {
    logoutCustomer();
    logoutAdmin();

    setCustomer(null);
    setAdmin(null);
    setMessage("Logged out successfully.");
    setError("");
  };

  if (admin) {
    return (
      <section className="auth-page">
        <div className="auth-card">
          <p className="kicker">Admin Profile</p>
          <h1>You are logged in</h1>
          <p className="muted">
            You can manage website content from the admin dashboard.
          </p>

          <div className="account-box">
            <strong>{admin.name}</strong>
            <span>{admin.email}</span>
          </div>

          <div className="auth-actions">
            <Link className="btn btn--primary" to="/admin/dashboard">
              Admin Dashboard
            </Link>

            <button className="btn btn--light" type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (customer) {
    return (
      <section className="auth-page">
        <div className="auth-card">
          <p className="kicker">Customer Profile</p>
          <h1>You are logged in</h1>
          <p className="muted">
            You can request HNG Construction services using this account.
          </p>

          <div className="account-box">
            <strong>{customer.name}</strong>
            <span>{customer.email || customer.phone}</span>
          </div>

          <div className="auth-actions">
            <Link className="btn btn--primary" to="/service-request">
              Request Service
            </Link>

            <button className="btn btn--light" type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <div className="auth-card auth-card--wide">
        <div>
          <p className="kicker">Account Access</p>
          <h1>Login or create an account</h1>

          <p className="muted">
            Customers can create an account to request services. Admin users can
            login from the same login form using their admin email and password.
          </p>
        </div>

        <div className="panel">
          <div className="auth-tabs">
            <button
              className={mode === "login" ? "active" : ""}
              type="button"
              onClick={() => {
                setMode("login");
                setMessage("");
                setError("");
              }}
            >
              Login
            </button>

            <button
              className={mode === "register" ? "active" : ""}
              type="button"
              onClick={() => {
                setMode("register");
                setMessage("");
                setError("");
              }}
            >
              Register
            </button>
          </div>

          {mode === "login" ? (
            <form className="form form--compact" onSubmit={handleLogin}>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </label>

              <label>
                Password
                <input
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </label>

              <button className="btn btn--primary" type="submit" disabled={loading}>
  {loading ? "Please wait..." : "Login"}
</button>
            </form>
          ) : (
            <form className="form form--compact" onSubmit={handleRegister}>
              <label>
                Name
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </label>

              <label>
                Phone Number
                <input
                  name="phone"
                  type="tel"
                  placeholder="+94 77 000 0000"
                  required
                />
              </label>

              <label>
                Email
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </label>

              <label>
                Password
                <input
                  name="password"
                  type="password"
                  placeholder="Create password"
                  required
                />
              </label>

              <label>
                Confirm Password
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  required
                />
              </label>

              <button className="btn btn--primary" type="submit" disabled={loading}>
  {loading ? "Please wait..." : "Register"}
</button>
            </form>
          )}

          {message ? <p className="success-message">{message}</p> : null}
          {error ? <p className="error-message">{error}</p> : null}
        </div>
      </div>
    </section>
  );
}