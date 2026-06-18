import React from "react";
import { motion } from "framer-motion";
import { FiCheckSquare, FiFileText, FiUser, FiClock, FiShield } from "react-icons/fi";
import PageTransition from "../components/PageTransition";

const Consent = () => {
  const steps = [
    { icon: FiUser, label: "Identify Target", desc: "Record the network owner and testing scope", color: "#00d4ff" },
    { icon: FiFileText, label: "Document Authorization", desc: "Attach signed consent form or email authorization", color: "#a78bfa" },
    { icon: FiShield, label: "Define Scope", desc: "Specify what attacks and timeframes are approved", color: "#34d399" },
    { icon: FiCheckSquare, label: "Final Sign-Off", desc: "Confirm all parties have agreed to proceed", color: "#fbbf24" },
  ];

  return (
    <PageTransition className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Consent Management</h1>
        <p className="text-sm text-slate-500 mt-1">Record and manage authorization for testing</p>
      </div>

      <div
        className="p-5 rounded-2xl flex items-center space-x-3"
        style={{ background: "rgba(248,113,113,0.05)", border: "1px solid rgba(248,113,113,0.2)" }}
      >
        <FiShield className="w-5 h-5 text-danger flex-shrink-0" />
        <div>
          <p className="text-sm font-semibold text-danger">Authorization Required</p>
          <p className="text-xs text-red-300/60 mt-0.5">Always obtain written consent before conducting any penetration tests</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {steps.map(({ icon: Icon, label, desc, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl flex items-start space-x-4"
            style={{ background: "rgba(13,17,26,0.7)", border: `1px solid ${color}12` }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-0.5">
                <span className="text-[10px] font-mono text-slate-600">STEP {i + 1}</span>
              </div>
              <h3 className="text-sm font-semibold text-white">{label}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
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
        <p className="text-slate-500 text-sm">Consent management interface is under development</p>
        <p className="text-slate-700 text-xs font-mono mt-2">Coming Soon</p>
      </div>
    </PageTransition>
  );
};

export default Consent;
