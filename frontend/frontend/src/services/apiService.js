import api from "./api";

// Authentication APIs
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
  setupAdmin: (adminData) => api.post("/auth/setup", adminData),
  verifyToken: () => api.get("/auth/verify"),
};

// Network Scanner APIs
export const networkAPI = {
  getNetworks: () => api.get("/networks"),
  startScan: () => api.post("/networks/scan"),
  stopScan: () => api.post("/networks/scan/stop"),
  getNetworkDetails: (bssid) => api.get(`/networks/${bssid}`),
};

// Attack APIs
export const attackAPI = {
  startAttack: (attackData) => api.post("/attacks/start", attackData),
  stopAttack: (attackId) => api.post(`/attacks/${attackId}/stop`),
  pauseAttack: (attackId) => api.post(`/attacks/${attackId}/pause`),
  getAttackStatus: (attackId) => api.get(`/attacks/${attackId}/status`),
  getActiveAttacks: () => api.get("/attacks/active"),
  getAttackHistory: () => api.get("/attacks/history"),
};

// Agentic AI APIs
export const agenticAPI = {
  startNmapScan: (target) => api.post("/agentic/nmap/start", { target }),
  getDecisionLogs: () => api.get("/agentic/decisions"),
  getServiceDiscovery: () => api.get("/agentic/services"),
  executeAction: (action) => api.post("/agentic/action/execute", action),
  stopAutonomous: () => api.post("/agentic/stop"),
};

// Results & Captured Data APIs
export const resultsAPI = {
  getHandshakes: () => api.get("/results/handshakes"),
  downloadHandshake: (id) =>
    api.get(`/results/handshakes/${id}/download`, { responseType: "blob" }),
  getCrackedPasswords: () => api.get("/results/cracked"),
  getMITMData: () => api.get("/results/mitm"),
  deleteResult: (id) => api.delete(`/results/${id}`),
  sanitizeData: () => api.post("/results/sanitize"),
};

// Reports APIs
export const reportsAPI = {
  getReports: () => api.get("/reports"),
  generateReport: (reportData) => api.post("/reports/generate", reportData),
  downloadReport: (id) =>
    api.get(`/reports/${id}/download`, { responseType: "blob" }),
  deleteReport: (id) => api.delete(`/reports/${id}`),
};

// Logs APIs
export const logsAPI = {
  getLogs: (filters) => api.get("/logs", { params: filters }),
  exportLogs: () => api.get("/logs/export", { responseType: "blob" }),
  clearLogs: () => api.delete("/logs"),
};

// Consent APIs
export const consentAPI = {
  createConsent: (consentData) => api.post("/consent", consentData),
  getConsents: () => api.get("/consent"),
  getActiveConsents: () => api.get("/consent/active"),
  revokeConsent: (id) => api.post(`/consent/${id}/revoke`),
  exportConsent: (id) =>
    api.get(`/consent/${id}/export`, { responseType: "blob" }),
};

// User Management APIs
export const userAPI = {
  getUsers: () => api.get("/users"),
  createUser: (userData) => api.post("/users", userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  changePassword: (passwordData) =>
    api.post("/users/change-password", passwordData),
  forceLogout: (userId) => api.post(`/users/${userId}/logout`),
};

// Settings APIs
export const settingsAPI = {
  getSettings: () => api.get("/settings"),
  updateSettings: (settings) => api.put("/settings", settings),
  testAPIConnection: () => api.post("/settings/test-api"),
  getDeviceStatus: () => api.get("/settings/device/status"),
  rebootDevice: () => api.post("/settings/device/reboot"),
};

// Dashboard APIs
export const dashboardAPI = {
  getStats: () => api.get("/dashboard/stats"),
  getRecentActivity: () => api.get("/dashboard/activity"),
  getDeviceHealth: () => api.get("/dashboard/health"),
};
