import React from "react";
import { motion } from "framer-motion";
import { FiCpu, FiZap, FiEye, FiTarget, FiActivity } from "react-icons/fi";
import PageTransition from "../components/PageTransition";

const AgenticAI = () => {
  const features = [
    { icon: FiEye, label: "Autonomous Scanning", desc: "AI-driven network discovery and enumeration", color: "#00d4ff" },
    { icon: FiTarget, label: "Vulnerability Analysis", desc: "Intelligent vulnerability scoring and prioritization", color: "#a78bfa" },
    { icon: FiZap, label: "Attack Planning", desc: "Automated exploitation path selection", color: "#f87171" },
    { icon: FiActivity, label: "Decision Logging", desc: "Full audit trail of AI decisions and actions", color: "#34d399" },
  ];

  return (
    <PageTransition className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
          <FiCpu className="w-6 h-6 text-secondary" />
          <span>Agentic AI Dashboard</span>
        </h1>
        <p className="text-sm text-slate-500 mt-1">Monitor autonomous AI exploitation decisions</p>
      </div>

      {/* Hero card */}
      <div
        className="relative overflow-hidden rounded-2xl p-6"
        style={{
          background: "linear-gradient(135deg, rgba(167,139,250,0.08) 0%, rgba(0,212,255,0.04) 100%)",
          border: "1px solid rgba(167,139,250,0.15)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
            filter: "blur(20px)",
            transform: "translate(20%, -20%)",
          }}
        />
        <div className="relative flex items-center space-x-4">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(167,139,250,0.12)", border: "1px solid rgba(167,139,250,0.25)" }}
          >
            <FiCpu className="w-8 h-8 text-secondary" />
          </motion.div>
          <div>
            <h2 className="text-lg font-bold text-white">AI Engine Status</h2>
            <p className="text-sm text-slate-400 mt-0.5">Powered by Dolphin-Mistral 24B via OpenRouter API</p>
            <div className="flex items-center space-x-2 mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-warning animate-pulse" />
              <span className="text-xs font-mono text-warning">Interface under development</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {features.map(({ icon: Icon, label, desc, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-2xl flex items-start space-x-4"
            style={{ background: "rgba(13,17,26,0.7)", border: `1px solid ${color}12` }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}10`, border: `1px solid ${color}20` }}>
              <Icon className="w-4.5 h-4.5" style={{ color }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{label}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coming soon */}
      <div
        className="rounded-2xl p-12 text-center"
        style={{ background: "rgba(13,17,26,0.5)", border: "1px solid rgba(167,139,250,0.08)" }}
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center"
          style={{ background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.12)" }}
        >
          <FiCpu className="w-7 h-7 text-slate-600" />
        </motion.div>
        <p className="text-slate-500 text-sm">AI decision monitoring interface will be implemented here</p>
        <p className="text-slate-700 text-xs font-mono mt-2">Coming Soon</p>
      </div>
    </PageTransition>
  );
};

export default AgenticAI;
