import React from "react";
import { motion } from "framer-motion";
import { FiFileText, FiDownload, FiClock, FiLock } from "react-icons/fi";
import PageTransition from "../components/PageTransition";

const Reports = () => {
  const reportTypes = [
    { icon: FiFileText, label: "Full Assessment", desc: "Complete penetration testing report with all findings", color: "#00d4ff", badge: "PDF" },
    { icon: FiDownload, label: "Executive Summary", desc: "High-level overview of vulnerabilities and risk", color: "#a78bfa", badge: "HTML" },
    { icon: FiLock, label: "Vulnerability Report", desc: "Detailed list of discovered vulnerabilities", color: "#f87171", badge: "JSON" },
  ];

  return (
    <PageTransition className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Security Reports</h1>
        <p className="text-sm text-slate-500 mt-1">Generate and view assessment reports</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {reportTypes.map(({ icon: Icon, label, desc, color, badge }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -3 }}
            className="p-5 rounded-2xl cursor-pointer group relative overflow-hidden"
            style={{
              background: "rgba(13,17,26,0.7)",
              border: `1px solid ${color}15`,
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `radial-gradient(circle at 50% 0%, ${color}08, transparent 70%)` }}
            />
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg" style={{ color, background: `${color}12`, border: `1px solid ${color}20` }}>{badge}</span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{label}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              <div className="mt-4 text-xs font-medium" style={{ color }}>Generate →</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="rounded-2xl p-12 text-center"
        style={{ background: "rgba(13,17,26,0.5)", border: "1px solid rgba(0,212,255,0.06)" }}
      >
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.1)" }}>
          <FiClock className="w-8 h-8 text-slate-600" />
        </div>
        <p className="text-slate-500 text-sm">Report generation interface is under development</p>
        <p className="text-slate-700 text-xs font-mono mt-2">Coming Soon</p>
      </div>
    </PageTransition>
  );
};

export default Reports;
