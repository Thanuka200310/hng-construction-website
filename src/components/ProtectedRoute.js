import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentAdmin, getCurrentCustomer } from "../utils/authStore";

export function CustomerRoute({ children }) {
  const location = useLocation();
  const customer = getCurrentCustomer();

  if (!customer) {
    return (
      <Navigate
        to="/customer/login"
        replace
        state={{ from: location, loginMode: "customer" }}
      />
    );
  }

  return children;
}

export function AdminRoute({ children }) {
  const admin = getCurrentAdmin();

  if (!admin) {
    return (
      <Navigate
        to="/customer/login"
        replace
        state={{ loginMode: "admin" }}
      />
    );
  }

  return children;
}