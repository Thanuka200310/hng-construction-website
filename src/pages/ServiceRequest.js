import React, { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getContent, saveServiceRequest } from "../data/siteContent";
import { getCurrentCustomer, logoutCustomer } from "../utils/authStore";

export default function ServiceRequest() {
  const content = useMemo(() => getContent(), []);
  const [searchParams] = useSearchParams();
const selectedServiceId = searchParams.get("service");

const selectedService = content.services.find(
  (service) => service.id === selectedServiceId
);
  const [customer, setCustomer] = useState(() => getCurrentCustomer());
  const [message, setMessage] = useState("");

  const submitRequest = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    saveServiceRequest({
      customerName: customer?.name || String(form.get("name") || "Customer"),
      customerEmail: customer?.email || String(form.get("email") || ""),
      customerPhone: customer?.phone || String(form.get("phone") || ""),
      service: String(form.get("service") || ""),
      location: String(form.get("location") || ""),
      details: String(form.get("details") || ""),
    });
    event.currentTarget.reset();
    setMessage("Your service request has been saved. Admin can view it in the admin panel.");
  };

  const handleLogout = () => {
    logoutCustomer();
    setCustomer(null);
  };

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="kicker">Service Request</p>
          <h1>Tell us what service you need</h1>
          <p className="muted">This page is only for logged-in customers. Public pages still remain visible to everyone.</p>
        </div>
      </section>

      <section className="section">
        <div className="container contact-grid">
          <div className="panel contact-info">
            <h2>Customer Account</h2>
            <p>
              <strong>Name:</strong> {customer?.name}<br />
              <strong>Contact:</strong> {customer?.email || customer?.phone}
            </p>
            <button className="btn btn--light" type="button" onClick={handleLogout}>Customer Logout</button>
            {!customer ? <p className="success-message"><Link to="/customer/login">Login again</Link> to submit a request.</p> : null}
          </div>

          <form className="form" onSubmit={submitRequest}>
            <label>
              Service Type
              <select name="service" required defaultValue={selectedService?.title || ""}>
  <option value="" disabled>Select service</option>

  {content.services.map((service) => (
    <option key={service.id} value={service.title}>
      {service.title}
    </option>
  ))}
</select>
            </label>
            <label>
              Project Location
              <input name="location" type="text" placeholder="Project location" required />
            </label>
            <label>
              Project Details
              <textarea name="details" rows="5" placeholder="Explain your construction requirement" required />
            </label>
            <button className="btn btn--primary" type="submit" disabled={!customer}>Submit Service Request</button>
            {message ? <p className="success-message">{message}</p> : null}
          </form>
        </div>
      </section>
    </>
  );
}
