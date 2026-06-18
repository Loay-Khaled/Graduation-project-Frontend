import React from "react";
import { motion } from "framer-motion";

const colorMap = {
  primary: {
    bg: "rgba(0, 212, 255, 0.08)",
    border: "rgba(0, 212, 255, 0.2)",
    icon: "rgba(0, 212, 255, 0.15)",
    text: "text-primary",
    glow: "0 0 20px rgba(0, 212, 255, 0.15)",
  },
  secondary: {
    bg: "rgba(167, 139, 250, 0.08)",
    border: "rgba(167, 139, 250, 0.2)",
    icon: "rgba(167, 139, 250, 0.15)",
    text: "text-secondary",
    glow: "0 0 20px rgba(167, 139, 250, 0.15)",
  },
  warning: {
    bg: "rgba(251, 191, 36, 0.08)",
    border: "rgba(251, 191, 36, 0.2)",
    icon: "rgba(251, 191, 36, 0.15)",
    text: "text-warning",
    glow: "0 0 20px rgba(251, 191, 36, 0.15)",
  },
  success: {
    bg: "rgba(52, 211, 153, 0.08)",
    border: "rgba(52, 211, 153, 0.2)",
    icon: "rgba(52, 211, 153, 0.15)",
    text: "text-success",
    glow: "0 0 20px rgba(52, 211, 153, 0.15)",
  },
  danger: {
    bg: "rgba(248, 113, 113, 0.08)",
    border: "rgba(248, 113, 113, 0.2)",
    icon: "rgba(248, 113, 113, 0.15)",
    text: "text-danger",
    glow: "0 0 20px rgba(248, 113, 113, 0.15)",
  },
};

const StatCard = ({ icon: Icon, title, value, color = "primary", trend, onClick }) => {
  const c = colorMap[color] || colorMap.primary;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-xl p-5 cursor-pointer group"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        boxShadow: c.glow,
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Background shimmer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${c.border}, transparent 70%)`,
        }}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
            {title}
          </p>
          <motion.p
            key={value}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`text-3xl font-bold ${c.text} font-mono`}
          >
            {value}
          </motion.p>
          {trend && (
            <p
              className={`text-xs mt-2 font-medium ${
                trend.positive ? "text-success" : "text-danger"
              }`}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: c.icon }}
        >
          <Icon className={`w-6 h-6 ${c.text}`} />
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-50"
        style={{ background: `linear-gradient(90deg, transparent, ${c.border}, transparent)` }}
      />
    </motion.div>
  );
};

export default StatCard;
