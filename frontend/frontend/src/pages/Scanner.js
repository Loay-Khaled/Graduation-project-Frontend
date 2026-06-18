import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiRefreshCw, FiSearch, FiWifi, FiRadio } from "react-icons/fi";
import { toast } from "react-toastify";
import { useSocket } from "../context/SocketContext";
import { networkAPI } from "../services/apiService";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTransition from "../components/PageTransition";
import { formatSignalStrength, getEncryptionColor } from "../utils/helpers";

const cardStyle = {
  background: "rgba(13,17,26,0.7)",
  border: "1px solid rgba(0,212,255,0.08)",
  borderRadius: "16px",
};

const Scanner = () => {
  const { networks, socket } = useSocket();
  const [scanning, setScanning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [localNetworks, setLocalNetworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNetworks = async () => {
      try {
        setLoading(true);
        const response = await networkAPI.getNetworks();
        if (response.data.data.networks) setLocalNetworks(response.data.data.networks);
      } catch (error) {
        console.error("Failed to fetch networks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNetworks();
  }, []);

  useEffect(() => {
    if (networks.length > 0) {
      setLocalNetworks((prev) => {
        const networkMap = new Map(prev.map((n) => [n.bssid, n]));
        networks.forEach((n) => networkMap.set(n.bssid, n));
        return Array.from(networkMap.values());
      });
    }
  }, [networks]);

  useEffect(() => {
    socket.emit("subscribe:networks");

    const handleScanComplete = (data) => {
      setScanning(false);
      toast.success(`Scan completed! Found ${data.count} network${data.count !== 1 ? "s" : ""}`);
      networkAPI.getNetworks().then((response) => {
        if (response.data.data.networks) setLocalNetworks(response.data.data.networks);
      });
    };

    const handleScanError = (data) => {
      setScanning(false);
      toast.error(`Scan failed: ${data.error}`);
    };

    socket.on("scan_complete", handleScanComplete);
    socket.on("scan_error", handleScanError);

    return () => {
      socket.off("scan_complete", handleScanComplete);
      socket.off("scan_error", handleScanError);
    };
  }, [socket]);

  const startScan = async () => {
    setScanning(true);
    try {
      await networkAPI.startScan();
      toast.info("Network scan started...");
    } catch (error) {
      console.error("Failed to start scan:", error);
      toast.error("Failed to start scan");
      setScanning(false);
    }
  };

  const stopScan = async () => {
    try {
      await networkAPI.stopScan();
      toast.info("Scan stopped");
    } catch (error) {
      console.error("Failed to stop scan:", error);
      toast.error("Failed to stop scan");
    } finally {
      setScanning(false);
    }
  };

  const filteredNetworks = localNetworks.filter((network) => {
    const matchesSearch = network.ssid.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "vulnerable" && network.vulnerabilityScore > 50) ||
      (filter === "secure" && network.vulnerabilityScore <= 50);
    return matchesSearch && matchesFilter;
  });

  return (
    <PageTransition className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Network Scanner</h1>
          <p className="text-sm text-slate-500 mt-1">Discover nearby Wi-Fi networks</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={scanning ? stopScan : startScan}
          className="relative flex items-center space-x-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm text-white overflow-hidden"
          style={{
            background: scanning
              ? "linear-gradient(135deg, #f87171, #ef4444)"
              : "linear-gradient(135deg, #00d4ff, #0ea5e9)",
            boxShadow: scanning
              ? "0 0 25px rgba(248,113,113,0.3)"
              : "0 0 25px rgba(0,212,255,0.3)",
          }}
        >
          {scanning && (
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ background: "rgba(255,255,255,0.1)" }}
            />
          )}
          <FiRefreshCw className={`w-4 h-4 ${scanning ? "animate-spin" : ""}`} />
          <span>{scanning ? "Stop Scan" : "Start Scan"}</span>
          {scanning && (
            <span
              className="w-2 h-2 rounded-full bg-white/80 animate-ping"
              style={{ animationDuration: "0.8s" }}
            />
          )}
        </motion.button>
      </div>

      {/* Scan indicator */}
      {scanning && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 p-3.5 rounded-xl"
          style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)" }}
        >
          <div className="relative">
            <FiRadio className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <span className="text-sm text-primary font-medium font-mono tracking-wide">
            Scanning for networks...
          </span>
          <div className="ml-auto flex space-x-1">
            {[0, 0.2, 0.4].map((d, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: d }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Search & Filter */}
      <div className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search networks by SSID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all"
            style={{ background: "rgba(13,17,26,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
            onFocus={(e) => { e.target.style.border = "1px solid rgba(0,212,255,0.35)"; }}
            onBlur={(e) => { e.target.style.border = "1px solid rgba(255,255,255,0.06)"; }}
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl text-sm text-slate-300 outline-none cursor-pointer transition-all"
          style={{ background: "rgba(13,17,26,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <option value="all">All Networks</option>
          <option value="vulnerable">Vulnerable</option>
          <option value="secure">Secure</option>
        </select>
      </div>

      {/* Networks Table */}
      <div style={cardStyle} className="overflow-hidden">
        {/* Table header bar */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ borderBottom: "1px solid rgba(0,212,255,0.06)" }}
        >
          <div className="flex items-center space-x-2">
            <FiWifi className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-white">Discovered Networks</span>
          </div>
          <span className="text-xs font-mono text-slate-500 px-2 py-0.5 rounded-lg" style={{ background: "rgba(0,212,255,0.06)" }}>
            {filteredNetworks.length} found
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                {["SSID", "BSSID", "Ch", "Signal", "Encryption", "Clients", "Vulnerability"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[10px] font-semibold text-slate-600 uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredNetworks.length > 0 ? (
                  filteredNetworks.map((network, i) => {
                    const signal = formatSignalStrength(network.rssi);
                    return (
                      <motion.tr
                        key={network.bssid}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.04 }}
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,212,255,0.025)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <td className="px-5 py-3.5 text-sm text-white font-medium">
                          {network.ssid || <span className="text-slate-500 italic text-xs">(Hidden)</span>}
                        </td>
                        <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{network.bssid}</td>
                        <td className="px-5 py-3.5 text-sm text-slate-400">{network.channel}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs font-mono ${signal.color}`}>
                            {network.rssi} <span className="text-slate-600">dBm</span>
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded-lg ${getEncryptionColor(network.encryption)}`}
                            style={{ background: "rgba(255,255,255,0.04)" }}>
                            {network.encryption}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-slate-400 font-mono">{network.clients || 0}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center space-x-2">
                            <div className="flex-1 h-1.5 rounded-full max-w-[80px]" style={{ background: "rgba(255,255,255,0.06)" }}>
                              <div
                                className="h-1.5 rounded-full"
                                style={{
                                  width: `${network.vulnerabilityScore || 0}%`,
                                  background: network.vulnerabilityScore > 70 ? "#f87171"
                                    : network.vulnerabilityScore > 40 ? "#fbbf24" : "#34d399",
                                }}
                              />
                            </div>
                            <span className="text-[11px] font-mono text-slate-500 w-7">{network.vulnerabilityScore || 0}%</span>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="px-5 py-16 text-center">
                      {loading ? (
                        <div className="flex flex-col items-center space-y-4">
                          <LoadingSpinner size="md" />
                          <p className="text-slate-500 text-sm">Loading networks...</p>
                        </div>
                      ) : scanning ? (
                        <div className="flex flex-col items-center space-y-4">
                          <LoadingSpinner size="md" />
                          <p className="text-primary text-sm font-mono">Scanning for networks...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-3">
                          <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.1)" }}>
                            <FiWifi className="w-6 h-6 text-slate-600" />
                          </div>
                          <p className="text-slate-500 text-sm">No networks found. Click <span className="text-primary">Start Scan</span> to begin.</p>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </PageTransition>
  );
};

export default Scanner;
