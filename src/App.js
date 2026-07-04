import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { AdminRoute, CustomerRoute } from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Downloads from "./pages/Downloads";
import News from "./pages/News";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import CustomerLogin from "./pages/CustomerLogin";
import ServiceRequest from "./pages/ServiceRequest";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/news" element={<News />} />
        <Route path="/career" element={<Career />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route
          path="/service-request"
          element={
            <CustomerRoute>
              <ServiceRequest />
            </CustomerRoute>
          }
        />
      </Route>

      <Route
  path="/admin/login"
  element={<Navigate to="/customer/login" replace state={{ loginMode: "admin" }} />}
/>
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
