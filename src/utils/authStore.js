const ADMIN_USERS_KEY = "hng_admin_users_v1";
const CURRENT_ADMIN_KEY = "hng_current_admin_v1";
const CURRENT_CUSTOMER_KEY = "hng_current_customer_v1";

const defaultAdmins = [
  {
    id: "admin-default",
    name: "Main Admin",
    email: "admin@hngconstruction.lk",
    password: "Admin@123",
    role: "Super Admin",
  },
];

function storage() {
  if (typeof window === "undefined") return null;
  return window.localStorage;
}

function readJson(key, fallback) {
  try {
    const value = storage()?.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  storage()?.setItem(key, JSON.stringify(value));
}

export function getAdminUsers() {
  const admins = readJson(ADMIN_USERS_KEY, null);

  if (!admins || !Array.isArray(admins) || admins.length === 0) {
    writeJson(ADMIN_USERS_KEY, defaultAdmins);
    return defaultAdmins;
  }

  return admins;
}

export function saveAdminUsers(users) {
  writeJson(ADMIN_USERS_KEY, users);
}

export function addAdminUser(admin) {
  const admins = getAdminUsers();

  const exists = admins.some(
    (item) => item.email.toLowerCase() === admin.email.toLowerCase()
  );

  if (exists) {
    return {
      success: false,
      message: "Admin email already exists.",
    };
  }

  const newAdmin = {
    id: `admin-${Date.now()}`,
    name: admin.name || "Admin",
    email: admin.email,
    password: admin.password,
    role: admin.role || "Admin",
  };

  const updatedAdmins = [newAdmin, ...admins];
  saveAdminUsers(updatedAdmins);

  return {
    success: true,
    message: "Admin user added successfully.",
    admin: newAdmin,
  };
}

export function deleteAdminUser(id) {
  const admins = getAdminUsers();

  if (id === "admin-default") {
    return {
      success: false,
      message: "Default admin cannot be deleted.",
    };
  }

  const updatedAdmins = admins.filter((admin) => admin.id !== id);
  saveAdminUsers(updatedAdmins);

  return {
    success: true,
    message: "Admin user deleted successfully.",
  };
}

export function loginAdmin(email, password) {
  const admins = getAdminUsers();

  const admin = admins.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() &&
      item.password === password
  );

  if (!admin) return null;

  const safeAdmin = {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    loginAt: new Date().toISOString(),
  };

  setCurrentAdmin(safeAdmin);
  return safeAdmin;
}

export function setCurrentAdmin(admin) {
  writeJson(CURRENT_ADMIN_KEY, admin);
}

export function getCurrentAdmin() {
  return readJson(CURRENT_ADMIN_KEY, null);
}

export function logoutAdmin() {
  storage()?.removeItem(CURRENT_ADMIN_KEY);
}

export function setCurrentCustomer(customer) {
  writeJson(CURRENT_CUSTOMER_KEY, customer);
}

export function getCurrentCustomer() {
  return readJson(CURRENT_CUSTOMER_KEY, null);
}

export function logoutCustomer() {
  storage()?.removeItem(CURRENT_CUSTOMER_KEY);
}