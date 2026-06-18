import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiRefreshCw, FiServer, FiChevronDown, FiChevronRight, FiClock, FiGlobe } from "react-icons/fi";
import { nmapAPI } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTransition from "../components/PageTransition";
import { toast } from "react-toastify";

const cardStyle = {
  background: "rgba(13,17,26,0.7)",
  border: "1px solid rgba(0,212,255,0.08)",
  borderRadius: "16px",
};

const Nmap = () => {
  const [scans, setScans] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null);
  const [expandedHost, setExpandedHost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { fetchScans(); }, []);

  const fetchScans = async () => {
    try {
      setLoading(true);
      const res = await nmapAPI.getNmapScans();
      const data = res.data?.data?.scans || res.data?.scans || res.data || [];
      setScans(data);
    } catch (err) {
      toast.error("Failed to load scans");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchScans();
  };

  const formatDate = (d) => new Date(d).toLocaleString();

  const getStatusConfig = (status) => {
    if (status === "up") return { color: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.25)" };
    if (status === "down") return { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" };
    return { color: "#fbbf24", bg: "rgba(251,191,36,0.1)", border: "rgba(251,191,36,0.25)" };
  };

  const getPortConfig = (port) => {
    if ([21, 22, 23, 445, 3389].includes(port))
      return { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" };
    if ([80, 443].includes(port))
      return { color: "#00d4ff", bg: "rgba(0,212,255,0.1)", border: "rgba(0,212,255,0.25)" };
    return { color: "#94a3b8", bg: "rgba(148,163,184,0.06)", border: "rgba(148,163,184,0.15)" };
  };

  return (
    <PageTransition className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <FiSearch className="w-6 h-6 text-primary" />
            <span>Nmap Intelligence</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">Network host & port discovery results</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleRefresh}
          disabled={refreshing || loading}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-medium text-primary disabled:opacity-50"
          style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.18)" }}
        >
          <FiRefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </motion.button>
      </div>

      {loading ? (
        <div className="flex justify-center py-24">
          <LoadingSpinner size="lg" text="Loading scan data..." />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Left Panel — Scan History */}
          <div style={cardStyle} className="overflow-hidden">
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ borderBottom: "1px solid rgba(0,212,255,0.06)" }}
            >
              <span className="text-sm font-semibold text-white">Scan History</span>
              <span className="text-xs font-mono text-slate-500 px-2 py-0.5 rounded-lg" style={{ background: "rgba(0,212,255,0.06)" }}>
                {scans.length}
              </span>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: "600px" }}>
              {scans.length === 0 ? (
                <div className="py-12 text-center text-slate-600 text-sm">No scans available</div>
              ) : (
                scans.map((scan) => (
                  <motion.div
                    key={scan._id}
                    whileHover={{ backgroundColor: "rgba(0,212,255,0.03)" }}
                    onClick={() => { setSelectedScan(scan); setExpandedHost(null); }}
                    className="p-4 cursor-pointer transition-colors relative"
                    style={{
                      borderLeft: selectedScan?._id === scan._id
                        ? "2px solid #00d4ff"
                        : "2px solid transparent",
                      background: selectedScan?._id === scan._id
                        ? "rgba(0,212,255,0.04)"
                        : "transparent",
                      borderBottom: "1px solid rgba(255,255,255,0.03)",
                    }}
                  >
                    <div className="flex items-center space-x-1.5 mb-1">
                      <FiClock className="w-3 h-3 text-slate-600" />
                      <span className="text-[10px] text-slate-600 font-mono">
                        {formatDate(scan.timestamp || scan.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      {scan.essid || "Unknown Network"}
                    </p>
                    <div className="flex items-center space-x-1.5 mt-1">
                      <FiServer className="w-3 h-3 text-slate-600" />
                      <span className="text-[11px] text-slate-500">{scan.host_count} hosts</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Right Panel — Scan Details */}
          <div className="lg:col-span-2" style={cardStyle}>
            {!selectedScan ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.1)" }}
                >
                  <FiSearch className="w-7 h-7 text-slate-600" />
                </div>
                <p className="text-slate-500 text-sm">Select a scan to view details</p>
              </div>
            ) : (
              <div className="p-5">
                {/* Scan summary */}
                <div className="mb-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <h2 className="text-lg font-bold text-white mb-1">
                    {selectedScan.essid || "Network Scan"}
                  </h2>
                  <div className="flex items-center space-x-4 text-xs text-slate-500 font-mono">
                    <span className="flex items-center space-x-1">
                      <FiServer className="w-3.5 h-3.5" />
                      <span>{selectedScan.host_count} hosts</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <FiClock className="w-3.5 h-3.5" />
                      <span>{formatDate(selectedScan.timestamp || selectedScan.createdAt)}</span>
                    </span>
                  </div>
                </div>

                {/* Hosts */}
                <div className="space-y-3">
                  {selectedScan.hosts?.map((host, i) => {
                    const sc = getStatusConfig(host.status);
                    const isExpanded = expandedHost === i;
                    return (
                      <div
                        key={i}
                        className="rounded-xl overflow-hidden"
                        style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                      >
                        {/* Host header */}
                        <motion.div
                          whileHover={{ backgroundColor: "rgba(0,212,255,0.03)" }}
                          onClick={() => setExpandedHost(isExpanded ? null : i)}
                          className="p-4 flex items-center justify-between cursor-pointer"
                          style={{ background: "rgba(7,9,15,0.4)" }}
                        >
                          <div className="flex items-center space-x-3">
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.12)" }}
                            >
                              <FiServer className="w-4.5 h-4.5 text-primary" />
                            </div>
                            <div>
                              <p className="font-mono text-sm font-semibold text-white">{host.ip}</p>
                              <p className="text-[10px] text-slate-600 font-mono">{host.mac || "No MAC"}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span
                              className="px-2.5 py-1 rounded-full text-[10px] font-semibold font-mono uppercase tracking-wide"
                              style={{ color: sc.color, background: sc.bg, border: `1px solid ${sc.border}` }}
                            >
                              {host.status}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">
                              {host.ports.length} ports
                            </span>
                            <motion.div
                              animate={{ rotate: isExpanded ? 90 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <FiChevronRight className="w-4 h-4 text-slate-500" />
                            </motion.div>
                          </div>
                        </motion.div>

                        {/* Expanded content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                              style={{ background: "rgba(5,8,16,0.5)", borderTop: "1px solid rgba(255,255,255,0.04)" }}
                            >
                              <div className="p-4 space-y-4">
                                {/* OS */}
                                {host.os && (
                                  <div className="flex items-center space-x-2">
                                    <FiGlobe className="w-4 h-4 text-secondary" />
                                    <span className="text-sm text-secondary font-mono">{host.os}</span>
                                  </div>
                                )}

                                {/* Port badges */}
                                {host.ports.length > 0 && (
                                  <div className="flex flex-wrap gap-2">
                                    {host.ports.map((p, idx) => {
                                      const pc = getPortConfig(p.port);
                                      return (
                                        <span
                                          key={idx}
                                          className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold"
                                          style={{ color: pc.color, background: pc.bg, border: `1px solid ${pc.border}` }}
                                        >
                                          {p.port}/{p.service || "?"}
                                        </span>
                                      );
                                    })}
                                  </div>
                                )}

                                {/* Port table */}
                                {host.ports.length > 0 && (
                                  <table className="w-full text-xs font-mono">
                                    <thead>
                                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                                        {["Port", "State", "Service", "Version"].map((h) => (
                                          <th key={h} className="text-left py-2 pr-4 text-slate-600 uppercase tracking-widest text-[9px]">{h}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {host.ports.map((p, idx) => (
                                        <tr
                                          key={idx}
                                          style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                                          className="hover:bg-white/[0.02] transition-colors"
                                        >
                                          <td className="py-2 pr-4 text-white font-semibold">{p.port}</td>
                                          <td className="py-2 pr-4 text-success">{p.state}</td>
                                          <td className="py-2 pr-4 text-slate-300">{p.service}</td>
                                          <td className="py-2 text-slate-500 text-[10px]">{p.version}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Raw output */}
                <details className="mt-5 group">
                  <summary className="cursor-pointer text-xs text-slate-500 hover:text-slate-300 transition-colors font-mono select-none flex items-center space-x-1">
                    <FiChevronDown className="w-3.5 h-3.5 group-open:rotate-180 transition-transform" />
                    <span>Raw Output</span>
                  </summary>
                  <motion.pre
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 p-4 rounded-xl text-success text-[11px] overflow-auto leading-relaxed font-mono"
                    style={{ background: "#050810", border: "1px solid rgba(52,211,153,0.1)", maxHeight: "300px" }}
                  >
                    {selectedScan.raw_output}
                  </motion.pre>
                </details>
              </div>
            )}
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default Nmap;
