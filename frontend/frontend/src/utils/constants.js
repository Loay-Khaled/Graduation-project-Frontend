// Attack types
export const ATTACK_TYPES = {
  DEAUTH: "deauth",
  EVIL_TWIN: "evil_twin",
  HANDSHAKE: "handshake",
  MITM_ARP: "mitm_arp",
  SSL_STRIP: "ssl_strip",
};

export const ATTACK_NAMES = {
  [ATTACK_TYPES.DEAUTH]: "Deauthentication Attack",
  [ATTACK_TYPES.EVIL_TWIN]: "Evil Twin Access Point",
  [ATTACK_TYPES.HANDSHAKE]: "WPA Handshake Capture",
  [ATTACK_TYPES.MITM_ARP]: "MITM - ARP Spoofing",
  [ATTACK_TYPES.SSL_STRIP]: "SSL Stripping",
};

// Attack status
export const ATTACK_STATUS = {
  IDLE: "idle",
  RUNNING: "running",
  COMPLETED: "completed",
  FAILED: "failed",
  PAUSED: "paused",
  STOPPED: "stopped",
};

// User roles
export const USER_ROLES = {
  ADMIN: "admin",
  TESTER: "tester",
  OBSERVER: "observer",
};

// Log severity levels
export const LOG_LEVELS = {
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success",
};

// Encryption types
export const ENCRYPTION_TYPES = {
  WPA3: "WPA3",
  WPA2: "WPA2",
  WPA: "WPA",
  WEP: "WEP",
  OPEN: "Open",
};

// Socket events
export const SOCKET_EVENTS = {
  // Connection
  CONNECT: "connect",
  DISCONNECT: "disconnect",

  // Network scanning
  NETWORK_DISCOVERED: "network_discovered",
  SCAN_STARTED: "scan_started",
  SCAN_COMPLETE: "scan_complete",

  // Attacks
  ATTACK_STARTED: "attack_started",
  ATTACK_PROGRESS: "attack_progress",
  ATTACK_COMPLETED: "attack_completed",
  ATTACK_FAILED: "attack_failed",
  HANDSHAKE_CAPTURED: "handshake_captured",

  // Agentic AI
  AGENTIC_DECISION: "agentic_decision",
  SERVICE_DISCOVERED: "service_discovered",

  // System
  DEVICE_METRICS: "device_metrics",
  LOG_ENTRY: "log_entry",
};

// Report formats
export const REPORT_FORMATS = {
  PDF: "pdf",
  HTML: "html",
  JSON: "json",
};

// Vulnerability severity
export const VULNERABILITY_SEVERITY = {
  CRITICAL: "critical",
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
  INFO: "info",
};

// AI Actions
export const AI_ACTIONS = {
  SSH_ENUM: "ssh_enum",
  HTTP_DIRBUST: "http_dirbust",
  FTP_ENUM: "ftp_enum",
  SMB_ENUM: "smb_enum",
  SQL_INJECTION: "sql_injection",
};

// API Status
export const API_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

// Device status
export const DEVICE_STATUS = {
  ONLINE: "online",
  OFFLINE: "offline",
  WARNING: "warning",
  ERROR: "error",
};

// Chart colors
export const CHART_COLORS = {
  primary: "#0ea5e9",
  secondary: "#6366f1",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#3b82f6",
};
