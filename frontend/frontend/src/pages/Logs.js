import React from "react";
import { motion } from "framer-motion";
import { FiList, FiTrash2, FiActivity } from "react-icons/fi";
import { useSocket } from "../context/SocketContext";
import LiveLogViewer from "../components/LiveLogViewer";
import PageTransition from "../components/PageTransition";

const Logs = () => {
  const { logs } = useSocket();

  return (
    <PageTransition className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <FiList className="w-6 h-6 text-primary" />
            <span>System Logs</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">Real-time activity and audit trail</p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Live indicator */}
          <div
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg"
            style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)" }}
          >
            <FiActivity className="w-3.5 h-3.5 text-success" />
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <span className="text-[11px] font-mono text-success font-medium tracking-wide">LIVE</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium text-danger"
            style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)" }}
          >
            <FiTrash2 className="w-4 h-4" />
            <span>Clear</span>
          </motion.button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: logs.length, color: "#00d4ff" },
          { label: "Errors", value: logs.filter(l => l.level === "error").length, color: "#f87171" },
          { label: "Warnings", value: logs.filter(l => l.level === "warning").length, color: "#fbbf24" },
          { label: "Info", value: logs.filter(l => l.level === "info").length, color: "#34d399" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="p-3 rounded-xl"
            style={{ background: "rgba(13,17,26,0.7)", border: `1px solid ${color}15` }}
          >
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-xl font-bold font-mono" style={{ color }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Log viewer */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(13,17,26,0.7)",
          border: "1px solid rgba(0,212,255,0.08)",
        }}
      >
        <div
          className="px-5 py-3 flex items-center space-x-2"
          style={{ borderBottom: "1px solid rgba(0,212,255,0.06)" }}
        >
          <span className="text-sm font-semibold text-white">Live Log Stream</span>
          <span className="text-[11px] font-mono text-slate-500 ml-auto">
            {logs.length} entries
          </span>
        </div>
        <div className="p-4">
          <LiveLogViewer logs={logs} maxHeight="calc(100vh - 320px)" />
        </div>
      </div>
    </PageTransition>
  );
};

export default Logs;
