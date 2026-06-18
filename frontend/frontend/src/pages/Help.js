import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHelpCircle, FiChevronDown, FiBook, FiTool, FiAlertCircle } from "react-icons/fi";
import PageTransition from "../components/PageTransition";

const faqs = [
  {
    q: "How do I start a Wi-Fi scan?",
    a: "Navigate to the Network Scanner page and click 'Start Scan'. The device will use its Wi-Fi adapter to discover nearby networks. Results appear in real-time.",
  },
  {
    q: "What is the Nmap Scanner used for?",
    a: "The Nmap Scanner performs detailed host discovery and port scanning on networks. It identifies connected devices, open ports, services, and potential vulnerabilities.",
  },
  {
    q: "What does the Agentic AI do?",
    a: "The Agentic AI autonomously analyzes discovered networks and hosts, then decides which exploitation techniques to attempt based on detected vulnerabilities.",
  },
  {
    q: "How do I ensure I have proper authorization?",
    a: "Use the Consent Management page to record written authorization before testing. Only test networks you own or have explicit permission to test.",
  },
  {
    q: "Why is my device showing Offline status?",
    a: "Check that the backend server is running on the Raspberry Pi. Ensure you're connected to the same network as the device and the correct IP is configured in your .env file.",
  },
];

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <PageTransition className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Help & Documentation</h1>
        <p className="text-sm text-slate-500 mt-1">User manual and troubleshooting guide</p>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { icon: FiBook, label: "User Manual", desc: "Complete guide to all features", color: "#00d4ff" },
          { icon: FiTool, label: "Troubleshooting", desc: "Common issues and solutions", color: "#a78bfa" },
          { icon: FiAlertCircle, label: "Ethical Guidelines", desc: "Legal and ethical requirements", color: "#fbbf24" },
        ].map(({ icon: Icon, label, desc, color }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -2 }}
            className="p-4 rounded-2xl cursor-pointer"
            style={{ background: "rgba(13,17,26,0.7)", border: `1px solid ${color}15` }}
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}12`, border: `1px solid ${color}20` }}>
              <Icon className="w-4.5 h-4.5" style={{ color }} />
            </div>
            <h3 className="text-sm font-semibold text-white">{label}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <FiHelpCircle className="w-5 h-5 text-primary" />
          <h2 className="text-base font-semibold text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="rounded-xl overflow-hidden"
              style={{
                background: "rgba(13,17,26,0.7)",
                border: openFaq === i ? "1px solid rgba(0,212,255,0.2)" : "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left p-4 flex items-center justify-between"
              >
                <span className="text-sm font-medium text-white pr-4">{item.q}</span>
                <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <FiChevronDown className="w-4 h-4 text-slate-500 flex-shrink-0" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="px-4 pb-4 text-sm text-slate-400 leading-relaxed"
                      style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}
                    >
                      <div className="pt-3">{item.a}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Help;
