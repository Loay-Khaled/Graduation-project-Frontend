import React, { createContext, useState, useContext, useEffect } from "react";
import socketService from "../services/socket";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [connected, setConnected] = useState(false);
  const [networks, setNetworks] = useState([]);
  const [attacks, setAttacks] = useState([]);
  const [logs, setLogs] = useState([]);
  const [deviceMetrics, setDeviceMetrics] = useState(null);
  const [agenticDecisions, setAgenticDecisions] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      // Connect socket
      socketService.connect();

      // Set up listeners
      socketService.on("connect", () => {
        console.log("Socket connected");
        setConnected(true);
      });

      socketService.on("disconnect", () => {
        console.log("Socket disconnected");
        setConnected(false);
      });

      // Network events
      socketService.on("network_discovered", (network) => {
        setNetworks((prev) => {
          const existing = prev.find((n) => n.bssid === network.bssid);
          if (existing) {
            return prev.map((n) =>
              n.bssid === network.bssid ? { ...n, ...network } : n,
            );
          }
          return [...prev, network];
        });
      });

      socketService.on("scan_complete", (data) => {
        console.log("Scan complete:", data);
      });

      socketService.on("scan_error", (data) => {
        console.error("Scan error:", data.error);
      });

      // Attack events
      socketService.on("attack_started", (attack) => {
        setAttacks((prev) => [...prev, attack]);
      });

      socketService.on("attack_progress", (progress) => {
        setAttacks((prev) =>
          prev.map((a) =>
            a.id === progress.attackId ? { ...a, ...progress } : a,
          ),
        );
      });

      socketService.on("attack_completed", (result) => {
        setAttacks((prev) =>
          prev.map((a) =>
            a.id === result.attackId
              ? { ...a, status: "completed", ...result }
              : a,
          ),
        );
      });

      socketService.on("attack_failed", (result) => {
        setAttacks((prev) =>
          prev.map((a) =>
            a.id === result.attackId
              ? { ...a, status: "failed", ...result }
              : a,
          ),
        );
      });

      // Handshake captured
      socketService.on("handshake_captured", (data) => {
        console.log("Handshake captured:", data);
      });

      // Agentic AI events
      socketService.on("agentic_decision", (decision) => {
        setAgenticDecisions((prev) => [...prev, decision]);
      });

      socketService.on("service_discovered", (services) => {
        console.log("Services discovered:", services);
      });

      // Device metrics
      socketService.on("device_metrics", (metrics) => {
        setDeviceMetrics(metrics);
      });

      // Log events
      socketService.on("log_entry", (log) => {
        setLogs((prev) => [log, ...prev].slice(0, 100)); // Keep last 100 logs
      });

      return () => {
        socketService.removeAllListeners();
        socketService.disconnect();
      };
    }
  }, [isAuthenticated]);

  const clearNetworks = () => setNetworks([]);
  const clearAttacks = () => setAttacks([]);
  const clearLogs = () => setLogs([]);
  const clearAgenticDecisions = () => setAgenticDecisions([]);

  const value = {
    connected,
    networks,
    attacks,
    logs,
    deviceMetrics,
    agenticDecisions,
    clearNetworks,
    clearAttacks,
    clearLogs,
    clearAgenticDecisions,
    socket: socketService,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
