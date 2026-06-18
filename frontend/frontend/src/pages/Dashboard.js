import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiWifi, FiZap, FiAlertTriangle, FiShield, FiRefreshCw } from "react-icons/fi";
import StatCard from "../components/StatCard";
import LiveLogViewer from "../components/LiveLogViewer";
import AttackStatusBadge from "../components/AttackStatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTransition from "../components/PageTransition";
import { useSocket } from "../context/SocketContext";
import { dashboardAPI, networkAPI } from "../services/apiService";
import { getEncryptionColor } from "../utils/helpers";

const cardStyle = {
  background: "rgba(13,17,26,0.7)",
  border: "1px solid rgba(0,212,255,0.08)",
  borderRadius: "16px",
};

const Dashboard = () => {
  const { logs, attacks, deviceMetrics, connected, networks: socketNetworks } = useSocket();
  const [stats, setStats] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { fetchDashboardData(); }, []);

  useEffect(() => {
    if (socketNetworks.length > 0) {
      setNetworks((prev) => {
        const networkMap = new Map(prev.map((n) => [n.bssid, n]));
        socketNetworks.forEach((n) => networkMap.set(n.bssid, n));
        return Array.from(networkMap.values());
      });
    }
  }, [socketNetworks]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, networksRes] = await Promise.all([
        dashboardAPI.getStats(),
        networkAPI.getNetworks(),
      ]);
      setStats(statsRes.data);
      if (networksRes.data.data.networks) setNetworks(networksRes.data.data.networks);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const networkStats = {
    total: networks.length,
    vulnerable: networks.filter((n) => n.vulnerabilityScore > 50).length,
    open: networks.filter((n) => n.encryption === "Open").length,
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-60px)]">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <PageTransition className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Wi-Fi penetration testing control center
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-primary transition-all disabled:opacity-50"
          style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.18)" }}
        >
          <FiRefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </motion.button>
      </div>

      {/* Alert */}
      {!connected && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 p-4 rounded-xl"
          style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)" }}
        >
          <FiAlertTriangle className="text-danger w-5 h-5 flex-shrink-0" />
          <div>
            <p className="text-danger font-semibold text-sm">Connection Lost</p>
            <p className="text-red-300/70 text-xs">Unable to reach the backend server</p>
          </div>
        </motion.div>
      )}

      {/* Stat Cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={fadeUp}>
          <StatCard icon={FiWifi} title="Networks Scanned" value={networkStats.total} color="primary" trend={stats?.networksTrend} />
        </motion.div>
        <motion.div variants={fadeUp}>
          <StatCard icon={FiZap} title="Active Attacks" value={attacks.filter((a) => a.status === "running").length} color="secondary" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <StatCard icon={FiAlertTriangle} title="Vulnerable Networks" value={networkStats.vulnerable} color="warning" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <StatCard icon={FiShield} title="Open Networks" value={networkStats.open} color="danger" />
        </motion.div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Networks Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 p-5"
          style={cardStyle}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-white">Recently Discovered Networks</h2>
          </div>
          {networks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    {["SSID", "Encryption", "Signal", "Vulnerability"].map((h) => (
                      <th key={h} className="pb-3 text-left text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {networks.slice(0, 6).map((network, i) => (
                    <motion.tr
                      key={network.bssid}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="group transition-colors"
                      style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,212,255,0.03)"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <td className="px-3 py-3 text-sm text-white font-medium">
                        {network.ssid || <span className="text-slate-500 italic">(Hidden)</span>}
                      </td>
                      <td className="px-3 py-3">
                        <span className={`text-xs font-mono font-medium ${getEncryptionColor(network.encryption)}`}>
                          {network.encryption}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-sm text-slate-400 font-mono">{network.rssi} dBm</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 h-1.5 rounded-full max-w-[80px]" style={{ background: "rgba(255,255,255,0.06)" }}>
                            <div
                              className="h-1.5 rounded-full transition-all"
                              style={{
                                width: `${network.vulnerabilityScore || 0}%`,
                                background: network.vulnerabilityScore > 70 ? "#f87171"
                                  : network.vulnerabilityScore > 40 ? "#fbbf24" : "#34d399",
                              }}
                            />
                          </div>
                          <span className="text-xs text-slate-500 font-mono w-8">{network.vulnerabilityScore}%</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.1)" }}>
                <FiWifi className="w-6 h-6 text-slate-600" />
              </div>
              <p className="text-slate-500 text-sm text-center">No networks yet. Start a scan from the Scanner page.</p>
            </div>
          )}
        </motion.div>

        {/* Device Health */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.25 }}
          className="p-5"
          style={cardStyle}
        >
          <h2 className="text-base font-semibold text-white mb-4">Device Health</h2>
          {deviceMetrics ? (
            <div className="space-y-5">
              {[
                { label: "CPU Usage", value: deviceMetrics.cpu, max: 100, unit: "%" },
                { label: "Memory", value: deviceMetrics.memory, max: 100, unit: "%" },
                { label: "Temperature", value: deviceMetrics.temperature, max: 80, unit: "°C", raw: true },
              ].map(({ label, value, max, unit, raw }) => {
                const pct = raw ? (value / max) * 100 : value;
                const color = pct > 80 ? "#f87171" : pct > 60 ? "#fbbf24" : "#34d399";
                return (
                  <div key={label}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-400">{label}</span>
                      <span className="text-sm font-bold font-mono" style={{ color }}>{value}{unit}</span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(pct, 100)}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-1.5 rounded-full"
                        style={{ background: color, boxShadow: `0 0 8px ${color}60` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-600 text-sm">No device metrics available</div>
          )}
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Active Attacks */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3 }}
          className="p-5"
          style={cardStyle}
        >
          <h2 className="text-base font-semibold text-white mb-4">Active Attacks</h2>
          {attacks.length > 0 ? (
            <div className="space-y-2.5">
              {attacks.slice(0, 5).map((attack) => (
                <div
                  key={attack.id}
                  className="p-3.5 rounded-xl"
                  style={{ background: "rgba(7,9,15,0.6)", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{attack.type}</span>
                    <AttackStatusBadge status={attack.status} />
                  </div>
                  <p className="text-xs text-slate-500 font-mono">Target: {attack.target}</p>
                  {attack.progress !== undefined && (
                    <div className="mt-2.5 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${attack.progress}%` }}
                        transition={{ duration: 0.5 }}
                        className="h-1 rounded-full bg-primary"
                        style={{ boxShadow: "0 0 6px rgba(0,212,255,0.5)" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-slate-600 text-sm">No active attacks</div>
          )}
        </motion.div>

        {/* Live Log */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.35 }}
          className="p-5"
          style={cardStyle}
        >
          <h2 className="text-base font-semibold text-white mb-4">Live Activity Feed</h2>
          <LiveLogViewer logs={logs} maxHeight="280px" />
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
