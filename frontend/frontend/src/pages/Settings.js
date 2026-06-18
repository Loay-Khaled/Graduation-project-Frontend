import React from "react";
import { motion } from "framer-motion";
import { FiSettings, FiWifi, FiShield, FiBell, FiDatabase, FiClock } from "react-icons/fi";
import PageTransition from "../components/PageTransition";

const settingCategories = [
  { icon: FiWifi, label: "Network Configuration", desc: "Interface, adapter, and scanning settings", color: "#00d4ff" },
  { icon: FiShield, label: "Security Policies", desc: "Attack limits, ethical constraints, logging", color: "#a78bfa" },
  { icon: FiBell, label: "Notifications", desc: "Alert thresholds and notification channels", color: "#fbbf24" },
  { icon: FiDatabase, label: "Data & Storage", desc: "Log retention, export formats, cleanup", color: "#34d399" },
];

const Settings = () => {
  return (
    <PageTransition className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure system and device settings</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {settingCategories.map(({ icon: Icon, label, desc, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -2 }}
            className="p-5 rounded-2xl flex items-start space-x-4 cursor-pointer group relative overflow-hidden"
            style={{ background: "rgba(13,17,26,0.7)", border: `1px solid ${color}12` }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `radial-gradient(circle at 0% 50%, ${color}06, transparent 70%)` }}
            />
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 relative" style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div className="relative flex-1">
              <h3 className="text-sm font-semibold text-white">{label}</h3>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{desc}</p>
              <span className="text-[10px] font-mono mt-2 inline-block" style={{ color }}>Configure →</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div
        className="rounded-2xl p-12 text-center"
        style={{ background: "rgba(13,17,26,0.5)", border: "1px solid rgba(0,212,255,0.06)" }}
      >
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.1)" }}>
          <FiClock className="w-7 h-7 text-slate-600" />
        </div>
        <p className="text-slate-500 text-sm">Full settings interface is under development</p>
        <p className="text-slate-700 text-xs font-mono mt-2">Coming Soon</p>
      </div>
    </PageTransition>
  );
};

export default Settings;
