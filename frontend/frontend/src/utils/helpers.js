// Format date and time
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

export const formatDateTime = (date) => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

// Format duration in seconds to human-readable
export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
};

// Format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

// Format signal strength
export const formatSignalStrength = (rssi) => {
  if (rssi >= -50) return { label: "Excellent", color: "text-green-500" };
  if (rssi >= -60) return { label: "Good", color: "text-blue-500" };
  if (rssi >= -70) return { label: "Fair", color: "text-yellow-500" };
  return { label: "Weak", color: "text-red-500" };
};

// Get encryption color
export const getEncryptionColor = (encryption) => {
  if (encryption.includes("WPA3")) return "text-green-500";
  if (encryption.includes("WPA2")) return "text-blue-500";
  if (encryption.includes("WPA")) return "text-yellow-500";
  if (encryption.includes("WEP")) return "text-orange-500";
  return "text-red-500"; // Open
};

// Get vulnerability severity color
export const getVulnerabilitySeverity = (score) => {
  if (score >= 80) return { label: "Critical", color: "bg-red-600" };
  if (score >= 60) return { label: "High", color: "bg-orange-600" };
  if (score >= 40) return { label: "Medium", color: "bg-yellow-600" };
  if (score >= 20) return { label: "Low", color: "bg-blue-600" };
  return { label: "Info", color: "bg-gray-600" };
};

// Get attack status color
export const getAttackStatusColor = (status) => {
  const colors = {
    running: "bg-blue-500",
    completed: "bg-green-500",
    failed: "bg-red-500",
    paused: "bg-yellow-500",
    stopped: "bg-gray-500",
  };
  return colors[status] || "bg-gray-500";
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

// Copy to clipboard
export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => true,
    () => false,
  );
};

// Download file
export const downloadFile = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

// Validate IP address
export const isValidIP = (ip) => {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
};

// Validate MAC address (BSSID)
export const isValidMAC = (mac) => {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(mac);
};

// Generate random color for charts
export const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 50%)`;
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
