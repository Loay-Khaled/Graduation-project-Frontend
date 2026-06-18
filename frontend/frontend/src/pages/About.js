import React from "react";
import { motion } from "framer-motion";
import { FiGithub, FiWifi, FiAlertTriangle } from "react-icons/fi";
import PageTransition from "../components/PageTransition";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] } }),
};

const About = () => {
  const techStack = [
    { label: "Frontend", items: ["React.js 18", "Tailwind CSS", "Socket.io Client", "Framer Motion", "Axios"] },
    { label: "Backend", items: ["Node.js & Express", "MongoDB", "Socket.io", "Python (Attacks)"] },
    { label: "Hardware", items: ["Raspberry Pi 4", "Dual Wi-Fi Adapters", "7\" Touchscreen"] },
    { label: "AI Components", items: ["Local Transformer Model", "Dolphin-Mistral 24B", "OpenRouter API"] },
  ];

  return (
    <PageTransition className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Hero */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
            className="w-20 h-20 mx-auto mb-5 rounded-3xl flex items-center justify-center animate-float"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(167,139,250,0.2))",
              border: "1px solid rgba(0,212,255,0.3)",
              boxShadow: "0 0 40px rgba(0,212,255,0.2)",
            }}
          >
            <FiWifi className="w-10 h-10 text-primary" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">WiFi PenTest Device</h1>
          <p className="text-slate-500 text-sm font-mono">Version 1.0.0 — AAST Graduation Project</p>
        </motion.div>

        {/* About card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="p-6 rounded-2xl"
          style={{ background: "rgba(13,17,26,0.7)", border: "1px solid rgba(0,212,255,0.08)" }}
        >
          <h2 className="text-lg font-bold text-white mb-3">About the Project</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            A Raspberry Pi-based portable Wi-Fi penetration testing device with dual artificial intelligence
            integration, designed exclusively for controlled laboratory environments to simulate and demonstrate
            wireless network vulnerabilities.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed">
            The system features automated attack execution, intelligent vulnerability assessment, and autonomous
            exploitation capabilities — serving as an educational tool to highlight Wi-Fi security risks and
            promote best practices.
          </p>
        </motion.div>

        {/* Academic info */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="p-6 rounded-2xl"
          style={{ background: "rgba(13,17,26,0.7)", border: "1px solid rgba(0,212,255,0.08)" }}
        >
          <h2 className="text-lg font-bold text-white mb-4">Academic Information</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Institution", value: "Arab Academy for Science, Technology and Maritime Transport (AAST)" },
              { label: "Department", value: "Computer Engineering" },
              { label: "Supervisor", value: "Dr. Mohamed Elhammahmy" },
              { label: "Year", value: "December 2025" },
            ].map(({ label, value }) => (
              <div key={label} className="p-3.5 rounded-xl" style={{ background: "rgba(7,9,15,0.5)", border: "1px solid rgba(255,255,255,0.04)" }}>
                <p className="text-[10px] text-slate-600 uppercase tracking-widest font-mono mb-1">{label}</p>
                <p className="text-sm text-slate-300">{value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="p-6 rounded-2xl"
          style={{ background: "rgba(13,17,26,0.7)", border: "1px solid rgba(0,212,255,0.08)" }}
        >
          <h2 className="text-lg font-bold text-white mb-4">Technology Stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techStack.map(({ label, items }) => (
              <div key={label}>
                <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-2.5 font-mono">{label}</h3>
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="text-xs text-slate-400 flex items-center space-x-2">
                      <div className="w-1 h-1 rounded-full bg-primary/40 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Ethical notice */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="p-6 rounded-2xl"
          style={{ background: "rgba(251,191,36,0.04)", border: "1px solid rgba(251,191,36,0.2)" }}
        >
          <div className="flex items-center space-x-2 mb-4">
            <FiAlertTriangle className="w-5 h-5 text-warning" />
            <h2 className="text-lg font-bold text-warning">Ethical Notice</h2>
          </div>
          <p className="text-yellow-200/70 text-sm mb-3">
            This tool is designed exclusively for controlled laboratory environments and authorized security testing.
          </p>
          <div className="space-y-2">
            {[
              { ok: true, text: "Use only on networks you own or have explicit permission to test" },
              { ok: true, text: "Record consent before any testing" },
              { ok: true, text: "Follow all applicable laws and regulations" },
              { ok: false, text: "Unauthorized access to networks is illegal" },
              { ok: false, text: "Misuse may result in criminal prosecution" },
            ].map(({ ok, text }) => (
              <div key={text} className="flex items-start space-x-2 text-sm">
                <span className={ok ? "text-success" : "text-danger"} style={{ marginTop: "1px" }}>{ok ? "✓" : "✗"}</span>
                <span className={ok ? "text-yellow-100/60" : "text-red-300/60"}>{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* GitHub link */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="flex justify-center"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/Loay-Khaled"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2.5 px-6 py-3 rounded-xl text-sm font-medium text-white"
            style={{
              background: "rgba(13,17,26,0.7)",
              border: "1px solid rgba(0,212,255,0.15)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.border = "1px solid rgba(0,212,255,0.4)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid rgba(0,212,255,0.15)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <FiGithub className="w-5 h-5 text-primary" />
            <span>GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default About;
