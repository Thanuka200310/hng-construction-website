const CONTENT_KEY = "hng_site_content_v1";
const REQUESTS_KEY = "hng_service_requests_v1";
const CONTACT_MESSAGES_KEY = "hng_contact_messages_v1";

export const defaultContent = {
  siteSettings: {
    companyName: "HNG Construction",
    tagline: "Building better spaces",
    phone: "+94 77 000 0000",
    email: "info@hngconstruction.lk",
    location: "Sri Lanka",
    whatsapp: "94770000000",
    footerNote: "Modern construction company website template.",
  },
  homeHighlights: [
    { id: "hl-1", title: "Quality", subtitle: "Professional Finishing" },
    { id: "hl-2", title: "Safety", subtitle: "Site Work Standards" },
    { id: "hl-3", title: "On Time", subtitle: "Planned Delivery" },
  ],
  homeServices: [
    {
      id: "hs-1",
      title: "Building Construction",
      description: "Residential, commercial and extension construction work handled with proper planning.",
    },
    {
      id: "hs-2",
      title: "Renovation Works",
      description: "Modern house upgrades, office renovations, repairs and improvement projects.",
    },
    {
      id: "hs-3",
      title: "Interior Finishing",
      description: "Tiling, ceiling, partition, painting and final finishing for clean project handover.",
    },
  ],
  services: [
    {
      id: "srv-1",
      title: "Building Construction",
      description: "Residential houses, commercial buildings, extensions, structural work and complete building solutions.",
    },
    {
      id: "srv-2",
      title: "Renovation & Repair",
      description: "House renovation, office upgrades, roof repair, wall repair and improvement work.",
    },
    {
      id: "srv-3",
      title: "Civil Works",
      description: "Concrete work, drainage, boundary walls, paving, foundations and small infrastructure work.",
    },
    {
      id: "srv-4",
      title: "Interior Finishing",
      description: "Tiling, ceiling, partitions, painting, doors, windows and final finishing work.",
    },
    {
      id: "srv-5",
      title: "Project Planning",
      description: "Site visits, cost estimation, material planning, work scheduling and project coordination.",
    },
    {
      id: "srv-6",
      title: "Maintenance Services",
      description: "General building maintenance for houses, offices, commercial spaces and rental properties.",
    },
  ],
  projects: [
    {
      id: "prj-1",
      title: "Modern Residential Construction",
      type: "Residential",
      description: "Complete home construction with foundation, structure and finishing work.",
    },
    {
      id: "prj-2",
      title: "Commercial Building Upgrade",
      type: "Commercial",
      description: "Office and business space improvements with partitions, painting and ceiling work.",
    },
    {
      id: "prj-3",
      title: "Boundary Wall & Paving",
      type: "Civil",
      description: "Concrete, block work, drainage, paving and clean external finishing.",
    },
    {
      id: "prj-4",
      title: "Interior Finishing Package",
      type: "Interior",
      description: "Tiling, lighting, ceiling, painting and detailed final finish upgrades.",
    },
  ],
  news: [
    {
      id: "news-1",
      title: "Project planning workflow introduced",
      description: "HNG Construction follows a clearer planning process for better site coordination.",
    },
    {
      id: "news-2",
      title: "Quality inspection checklist updated",
      description: "Our internal checklist supports cleaner handover and finishing checks.",
    },
    {
      id: "news-3",
      title: "Renovation and finishing packages",
      description: "Clients can request renovation, painting, ceiling, tiling and finishing packages.",
    },
  ],
  downloads: [
    { id: "doc-1", title: "Company Profile", note: "PDF brochure placeholder", link: "#" },
    { id: "doc-2", title: "Service List", note: "Construction service document placeholder", link: "#" },
    { id: "doc-3", title: "Quality & Safety Policy", note: "Policy document placeholder", link: "#" },
  ],
  careerRoles: [
    { id: "role-1", title: "Site Supervisor" },
    { id: "role-2", title: "Mason / Construction Worker" },
    { id: "role-3", title: "Painter / Finishing Worker" },
    { id: "role-4", title: "Tiler / Ceiling Worker" },
  ],
  contactBadges: [
    { id: "badge-1", title: "Free Consultation" },
    { id: "badge-2", title: "Site Visit" },
    { id: "badge-3", title: "Quotation" },
  ],
};

const browserStorage = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage;
};

const uid = (prefix = "item") => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const createId = uid;

export function getContent() {
  const storage = browserStorage();
  if (!storage) return defaultContent;

  try {
    const saved = storage.getItem(CONTENT_KEY);
    if (!saved) return defaultContent;
    const parsed = JSON.parse(saved);
    return {
      ...defaultContent,
      ...parsed,
      siteSettings: { ...defaultContent.siteSettings, ...(parsed.siteSettings || {}) },
    };
  } catch (error) {
    console.error("Failed to load site content", error);
    return defaultContent;
  }
}

export function saveContent(content) {
  const storage = browserStorage();
  if (!storage) return;
  storage.setItem(CONTENT_KEY, JSON.stringify(content));
}

export function resetContent() {
  const storage = browserStorage();
  if (!storage) return;
  storage.removeItem(CONTENT_KEY);
}

export function getServiceRequests() {
  const storage = browserStorage();
  if (!storage) return [];
  try {
    return JSON.parse(storage.getItem(REQUESTS_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

export function saveServiceRequest(request) {
  const storage = browserStorage();
  if (!storage) return;
  const requests = getServiceRequests();
  const nextRequest = {
    id: uid("req"),
    status: "New",
    createdAt: new Date().toISOString(),
    ...request,
  };
  storage.setItem(REQUESTS_KEY, JSON.stringify([nextRequest, ...requests]));
}

export function deleteServiceRequest(id) {
  const storage = browserStorage();
  if (!storage) return;
  storage.setItem(REQUESTS_KEY, JSON.stringify(getServiceRequests().filter((item) => item.id !== id)));
}

export function updateServiceRequest(id, changes) {
  const storage = browserStorage();
  if (!storage) return;
  storage.setItem(
    REQUESTS_KEY,
    JSON.stringify(getServiceRequests().map((item) => (item.id === id ? { ...item, ...changes } : item)))
  );
}

export function getContactMessages() {
  const storage = browserStorage();
  if (!storage) return [];
  try {
    return JSON.parse(storage.getItem(CONTACT_MESSAGES_KEY) || "[]");
  } catch (error) {
    return [];
  }
}

export function saveContactMessage(message) {
  const storage = browserStorage();
  if (!storage) return;
  const messages = getContactMessages();
  storage.setItem(
    CONTACT_MESSAGES_KEY,
    JSON.stringify([{ id: uid("msg"), createdAt: new Date().toISOString(), ...message }, ...messages])
  );
}

export function deleteContactMessage(id) {
  const storage = browserStorage();
  if (!storage) return;
  storage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify(getContactMessages().filter((item) => item.id !== id)));
}
