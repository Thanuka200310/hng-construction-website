const CUSTOMER_KEY = "hng_current_customer_v1";
const ADMIN_KEY = "hng_current_admin_v1";
const ADMIN_USERS_KEY = "hng_admin_users_v1";

const defaultAdmins = [
  {
    id: "admin-default",
    name: "Main Admin",
    email: "admin@hngconstruction.lk",
    password: "Admin@123",
    role: "Super Admin",
  },
];

const storage = () => (typeof window === "undefined" ? null : window.localStorage);
const uid = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function getCurrentCustomer() {
  try {
    return JSON.parse(storage()?.getItem(CUSTOMER_KEY) || "null");
  } catch (error) {
    return null;
  }
}

export function setCurrentCustomer(customer) {
  storage()?.setItem(CUSTOMER_KEY, JSON.stringify(customer));
}

export function logoutCustomer() {
  storage()?.removeItem(CUSTOMER_KEY);
}

export function getAdminUsers() {
  try {
    return JSON.parse(storage()?.getItem(ADMIN_USERS_KEY) || JSON.stringify(defaultAdmins));
  } catch (error) {
    return defaultAdmins;
  }
}

export function saveAdminUsers(admins) {
  storage()?.setItem(ADMIN_USERS_KEY, JSON.stringify(admins));
}

export function addAdminUser(admin) {
  const admins = getAdminUsers();
  const nextAdmin = { id: uid("admin"), role: "Admin", ...admin };
  saveAdminUsers([nextAdmin, ...admins]);
  return nextAdmin;
}

export function deleteAdminUser(id) {
  const admins = getAdminUsers().filter((admin) => admin.id !== id);
  saveAdminUsers(admins.length ? admins : defaultAdmins);
}

export function loginAdmin(email, password) {
  const admins = getAdminUsers();
  const match = admins.find(
    (admin) => admin.email.toLowerCase() === email.toLowerCase() && admin.password === password
  );
  if (!match) return null;
  const safeAdmin = { id: match.id, name: match.name, email: match.email, role: match.role };
  storage()?.setItem(ADMIN_KEY, JSON.stringify(safeAdmin));
  return safeAdmin;
}

export function getCurrentAdmin() {
  try {
    return JSON.parse(storage()?.getItem(ADMIN_KEY) || "null");
  } catch (error) {
    return null;
  }
}

export function logoutAdmin() {
  storage()?.removeItem(ADMIN_KEY);
}
