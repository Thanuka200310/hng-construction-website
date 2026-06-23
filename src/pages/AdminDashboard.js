import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createId,
  deleteContactMessage,
  deleteServiceRequest,
  getContactMessages,
  getContent,
  getServiceRequests,
  resetContent,
  saveContent,
  updateServiceRequest,
} from "../data/siteContent";
import { addAdminUser, deleteAdminUser, getAdminUsers, getCurrentAdmin, logoutAdmin } from "../utils/authStore";

const sections = [
  {
    key: "siteSettings",
    label: "Company Settings",
    type: "object",
    fields: [
      ["companyName", "Company Name", "text"],
      ["tagline", "Tagline", "text"],
      ["phone", "Phone", "text"],
      ["email", "Email", "email"],
      ["location", "Location", "text"],
      ["whatsapp", "WhatsApp Number", "text"],
      ["footerNote", "Footer Note", "text"],
    ],
  },
  {
    key: "homeHighlights",
    label: "Home Highlights",
    fields: [
      ["title", "Title", "text"],
      ["subtitle", "Subtitle", "text"],
    ],
  },
  {
    key: "homeServices",
    label: "Home Main Services",
    fields: [
      ["title", "Title", "text"],
      ["description", "Description", "textarea"],
    ],
  },
  {
    key: "services",
    label: "Services Page",
    fields: [
      ["title", "Service Title", "text"],
      ["description", "Description", "textarea"],
    ],
  },
  {
    key: "projects",
    label: "Projects",
    fields: [
      ["title", "Project Title", "text"],
      ["type", "Type", "text"],
      ["description", "Description", "textarea"],
    ],
  },
  {
    key: "news",
    label: "News",
    fields: [
      ["title", "News Title", "text"],
      ["description", "Description", "textarea"],
    ],
  },
  {
    key: "downloads",
    label: "Downloads",
    fields: [
      ["title", "Document Title", "text"],
      ["note", "Note", "text"],
      ["link", "PDF/Download Link", "text"],
    ],
  },
  {
    key: "careerRoles",
    label: "Career Roles",
    fields: [["title", "Role Title", "text"]],
  },
  {
    key: "contactBadges",
    label: "Contact Badges",
    fields: [["title", "Badge Title", "text"]],
  },
];

function EmptyState({ text }) {
  return <div className="empty-state">{text}</div>;
}

function FieldInput({ field, value }) {
  const [name, label, type] = field;
  if (type === "textarea") {
    return (
      <label>
        {label}
        <textarea name={name} rows="4" defaultValue={value || ""} required />
      </label>
    );
  }
  return (
    <label>
      {label}
      <input name={name} type={type} defaultValue={value || ""} required />
    </label>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const admin = useMemo(() => getCurrentAdmin(), []);
  const [content, setContent] = useState(() => getContent());
  const [active, setActive] = useState("siteSettings");
  const [editingItem, setEditingItem] = useState(null);
  const [requests, setRequests] = useState(() => getServiceRequests());
  const [messages, setMessages] = useState(() => getContactMessages());
  const [adminUsers, setAdminUsers] = useState(() => getAdminUsers());
  const [notice, setNotice] = useState("");

  const activeSection = sections.find((section) => section.key === active);

  const updateContent = (nextContent, message = "Changes saved.") => {
    setContent(nextContent);
    saveContent(nextContent);
    setNotice(message);
  };

  const submitObjectSection = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextObject = {};
    activeSection.fields.forEach(([key]) => {
      nextObject[key] = String(form.get(key) || "").trim();
    });
    updateContent({ ...content, [active]: { ...content[active], ...nextObject } });
  };

  const submitListSection = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const item = {};
    activeSection.fields.forEach(([key]) => {
      item[key] = String(form.get(key) || "").trim();
    });

    let nextList;
    if (editingItem) {
      nextList = content[active].map((existing) => (existing.id === editingItem.id ? { ...existing, ...item } : existing));
    } else {
      nextList = [{ id: createId(active), ...item }, ...(content[active] || [])];
    }

    setEditingItem(null);
    event.currentTarget.reset();
    updateContent({ ...content, [active]: nextList }, editingItem ? "Item updated." : "Item added.");
  };

  const deleteItem = (id) => {
    const nextList = content[active].filter((item) => item.id !== id);
    updateContent({ ...content, [active]: nextList }, "Item deleted.");
  };

  const startEdit = (item) => {
    setEditingItem(item);
    setNotice("Editing selected item. Update the form and save.");
  };

  const resetWebsiteContent = () => {
    resetContent();
    const fresh = getContent();
    setContent(fresh);
    setEditingItem(null);
    setNotice("Website content reset to default data.");
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login", { replace: true });
  };

  const deleteRequest = (id) => {
    deleteServiceRequest(id);
    setRequests(getServiceRequests());
    setNotice("Service request deleted.");
  };

  const changeRequestStatus = (id, status) => {
    updateServiceRequest(id, { status });
    setRequests(getServiceRequests());
  };

  const deleteMessage = (id) => {
    deleteContactMessage(id);
    setMessages(getContactMessages());
    setNotice("Contact message deleted.");
  };

  const submitAdmin = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const role = String(form.get("role") || "Admin").trim();

    if (adminUsers.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      setNotice("This admin email already exists.");
      return;
    }

    addAdminUser({ name, email, password, role });
    setAdminUsers(getAdminUsers());
    event.currentTarget.reset();
    setNotice("New admin user added.");
  };

  const removeAdmin = (id) => {
    if (id === admin?.id) {
      setNotice("You cannot delete your own active admin account while logged in.");
      return;
    }
    deleteAdminUser(id);
    setAdminUsers(getAdminUsers());
    setNotice("Admin user deleted.");
  };

  const setSection = (key) => {
    setActive(key);
    setEditingItem(null);
    setNotice("");
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <strong>HNG Admin</strong>
          <span>{admin?.name || "Admin"}</span>
        </div>
        <nav>
          {sections.map((section) => (
            <button
              key={section.key}
              className={active === section.key ? "active" : ""}
              type="button"
              onClick={() => setSection(section.key)}
            >
              {section.label}
            </button>
          ))}
          <button className={active === "serviceRequests" ? "active" : ""} type="button" onClick={() => setSection("serviceRequests")}>
            Service Requests
          </button>
          <button className={active === "contactMessages" ? "active" : ""} type="button" onClick={() => setSection("contactMessages")}>
            Contact Messages
          </button>
          <button className={active === "adminUsers" ? "active" : ""} type="button" onClick={() => setSection("adminUsers")}>
            Admin Users
          </button>
        </nav>
        <button className="admin-logout" type="button" onClick={handleLogout}>Logout</button>
      </aside>

      <main className="admin-main">
        <header className="admin-top">
          <div>
            <p className="kicker">Admin Panel</p>
            <h1>{activeSection?.label || (active === "serviceRequests" ? "Service Requests" : active === "contactMessages" ? "Contact Messages" : "Admin Users")}</h1>
          </div>
          <div className="admin-top__actions">
            <a className="btn btn--light" href="/" target="_blank" rel="noreferrer">View Website</a>
            <button className="btn btn--primary" type="button" onClick={resetWebsiteContent}>Reset Website Content</button>
          </div>
        </header>

        {notice ? <div className="admin-notice">{notice}</div> : null}

        {activeSection?.type === "object" ? (
          <section className="admin-card">
            <h2>Edit Company Details</h2>
            <form className="admin-form" onSubmit={submitObjectSection} key={active}>
              {activeSection.fields.map((field) => (
                <FieldInput key={field[0]} field={field} value={content[active]?.[field[0]]} />
              ))}
              <button className="btn btn--primary" type="submit">Save Details</button>
            </form>
          </section>
        ) : null}

        {activeSection && activeSection.type !== "object" ? (
          <div className="admin-grid">
            <section className="admin-card">
              <h2>{editingItem ? "Edit Item" : "Add New Item"}</h2>
              <form className="admin-form" onSubmit={submitListSection} key={`${active}-${editingItem?.id || "new"}`}>
                {activeSection.fields.map((field) => (
                  <FieldInput key={field[0]} field={field} value={editingItem?.[field[0]]} />
                ))}
                <button className="btn btn--primary" type="submit">{editingItem ? "Update Item" : "Add Item"}</button>
                {editingItem ? <button className="btn btn--light" type="button" onClick={() => setEditingItem(null)}>Cancel Edit</button> : null}
              </form>
            </section>

            <section className="admin-card">
              <h2>Current Items</h2>
              {content[active]?.length ? (
                <div className="admin-list">
                  {content[active].map((item) => (
                    <article className="admin-list-item" key={item.id}>
                      <div>
                        <strong>{item.title}</strong>
                        {item.type ? <span>{item.type}</span> : null}
                        {item.subtitle ? <span>{item.subtitle}</span> : null}
                        {item.note ? <span>{item.note}</span> : null}
                        {item.description ? <p>{item.description}</p> : null}
                      </div>
                      <div className="admin-actions">
                        <button type="button" onClick={() => startEdit(item)}>Edit</button>
                        <button type="button" className="danger" onClick={() => deleteItem(item.id)}>Delete</button>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <EmptyState text="No items yet. Add the first item using the form." />
              )}
            </section>
          </div>
        ) : null}

        {active === "serviceRequests" ? (
          <section className="admin-card">
            <h2>Customer Service Requests</h2>
            {requests.length ? (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Details</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id}>
                        <td>
                          <strong>{request.customerName}</strong><br />
                          <small>{request.customerPhone || request.customerEmail}</small>
                        </td>
                        <td>{request.service}</td>
                        <td>{request.location}</td>
                        <td>
                          <select value={request.status} onChange={(event) => changeRequestStatus(request.id, event.target.value)}>
                            <option>New</option>
                            <option>Contacted</option>
                            <option>Site Visit Planned</option>
                            <option>Quoted</option>
                            <option>Closed</option>
                          </select>
                        </td>
                        <td>{request.details}</td>
                        <td><button className="danger" type="button" onClick={() => deleteRequest(request.id)}>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState text="No customer service requests yet." />
            )}
          </section>
        ) : null}

        {active === "contactMessages" ? (
          <section className="admin-card">
            <h2>Contact Form Messages</h2>
            {messages.length ? (
              <div className="admin-list">
                {messages.map((message) => (
                  <article className="admin-list-item" key={message.id}>
                    <div>
                      <strong>{message.name}</strong>
                      <span>{message.phone} {message.email ? `• ${message.email}` : ""}</span>
                      <p>{message.details}</p>
                    </div>
                    <div className="admin-actions">
                      <button className="danger" type="button" onClick={() => deleteMessage(message.id)}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState text="No contact messages yet." />
            )}
          </section>
        ) : null}

        {active === "adminUsers" ? (
          <div className="admin-grid">
            <section className="admin-card">
              <h2>Add Admin User</h2>
              <form className="admin-form" onSubmit={submitAdmin}>
                <label>
                  Name
                  <input name="name" type="text" placeholder="Admin name" required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" placeholder="admin@email.com" required />
                </label>
                <label>
                  Password
                  <input name="password" type="password" placeholder="Create password" required />
                </label>
                <label>
                  Role
                  <input name="role" type="text" defaultValue="Admin" required />
                </label>
                <button className="btn btn--primary" type="submit">Add Admin</button>
              </form>
            </section>

            <section className="admin-card">
              <h2>Current Admins</h2>
              <div className="admin-list">
                {adminUsers.map((user) => (
                  <article className="admin-list-item" key={user.id}>
                    <div>
                      <strong>{user.name}</strong>
                      <span>{user.email}</span>
                      <p>{user.role}</p>
                    </div>
                    <div className="admin-actions">
                      <button className="danger" type="button" onClick={() => removeAdmin(user.id)}>Delete</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
        ) : null}
      </main>
    </div>
  );
}
