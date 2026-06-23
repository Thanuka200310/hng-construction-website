import React, { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCurrentCustomer, logoutCustomer, setCurrentCustomer } from "../utils/authStore";

const createCode = () => String(Math.floor(100000 + Math.random() * 900000));

export default function CustomerLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingCustomer = useMemo(() => getCurrentCustomer(), []);
  const [customer, setCustomer] = useState(existingCustomer);
  const [pending, setPending] = useState(null);
  const [message, setMessage] = useState("");

  const fromLocation = location.state?.from;
const returnPath = fromLocation
  ? `${fromLocation.pathname}${fromLocation.search || ""}`
  : "/service-request";

  const startLogin = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();

    if (!email && !phone) {
      setMessage("Please enter phone number or email to receive the verification code.");
      return;
    }

    const code = createCode();
    setPending({ name, email, phone, code });
    setMessage("Verification code generated. In production this code should be sent by SMS or email using backend OTP service.");
  };

  const verifyCode = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const code = String(form.get("code") || "").trim();

    if (code !== pending?.code) {
      setMessage("Invalid verification code. Please check and try again.");
      return;
    }

    const nextCustomer = {
      id: `customer-${Date.now()}`,
      name: pending.name || "Customer",
      email: pending.email,
      phone: pending.phone,
      loginAt: new Date().toISOString(),
    };

    setCurrentCustomer(nextCustomer);
    setCustomer(nextCustomer);
    navigate(returnPath, { replace: true });
  };

  const handleLogout = () => {
    logoutCustomer();
    setCustomer(null);
    setPending(null);
    setMessage("Customer logged out.");
  };

  if (customer) {
    return (
      <section className="auth-page">
        <div className="auth-card">
          <p className="kicker">Customer Account</p>
          <h1>You are logged in</h1>
          <p className="muted">Use your account to request HNG Construction services.</p>
          <div className="account-box">
            <strong>{customer.name}</strong>
            <span>{customer.email || customer.phone}</span>
          </div>
          <div className="auth-actions">
            <Link className="btn btn--primary" to="/service-request">Request Service</Link>
            <button className="btn btn--light" type="button" onClick={handleLogout}>Logout</button>
          </div>
          <Link className="small-link" to="/">← Back to website</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="auth-page">
      <div className="auth-card auth-card--wide">
        <div>
          <p className="kicker">Customer Login</p>
          <h1>Login to request a service</h1>
          <p className="muted">
            Everyone can view the website without login. Customers only need login when they want to request HNG
            Construction services.
          </p>
          <div className="notice-box">
            Demo OTP is shown on screen because this project is static React. Connect Firebase, Supabase, Twilio, or an email
            API for real SMS/email OTP.
          </div>
        </div>

        <div className="panel">
          {!pending ? (
            <form className="form form--compact" onSubmit={startLogin}>
              <label>
                Name
                <input name="name" type="text" placeholder="Your name" />
              </label>
              <label>
                Phone Number
                <input name="phone" type="tel" placeholder="+94 77 000 0000" />
              </label>
              <label>
                Email
                <input name="email" type="email" placeholder="your@email.com" />
              </label>
              <button className="btn btn--primary" type="submit">Send Verification Code</button>
            </form>
          ) : (
            <form className="form form--compact" onSubmit={verifyCode}>
              <div className="otp-demo">
                <span>Demo verification code</span>
                <strong>{pending.code}</strong>
              </div>
              <label>
                Enter Code
                <input name="code" type="text" inputMode="numeric" maxLength="6" placeholder="6 digit code" required />
              </label>
              <button className="btn btn--primary" type="submit">Verify & Login</button>
              <button className="btn btn--light" type="button" onClick={() => setPending(null)}>Change Details</button>
            </form>
          )}
          {message ? <p className="success-message">{message}</p> : null}
          <Link className="small-link" to="/admin/login">Admin Login</Link>
          <Link className="small-link" to="/">← Back to website</Link>
        </div>
      </div>
    </section>
  );
}
