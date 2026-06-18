import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ====================== API Exports ======================

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

// Nmap APIs  ←←← ADD THIS SECTION
export const nmapAPI = {
  getNmapScans: () => api.get("/nmap"),        // or "/api/nmap" depending on your backend
};

// Agentic AI APIs
export const agenticAPI = {
  startNmapScan: (target) => api.post("/agentic/nmap/start", { target }),
  getDecisionLogs: () => api.get("/agentic/decisions"),
  getServiceDiscovery: () => api.get("/agentic/services"),
  executeAction: (action) => api.post("/agentic/action/execute", action),
  stopAutonomous: () => api.post("/agentic/stop"),
};

// Results, Reports, Logs, Consent, Users, Settings, Dashboard... (keep the rest as is)
export const resultsAPI = { /* ... your existing */ };
export const reportsAPI = { /* ... */ };
export const logsAPI = { /* ... */ };
export const consentAPI = { /* ... */ };
export const userAPI = { /* ... */ };
export const settingsAPI = { /* ... */ };
export const dashboardAPI = { /* ... */ };

export default api;