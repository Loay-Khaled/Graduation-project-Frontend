import React from "react";
import { motion } from "framer-motion";
import { ATTACK_STATUS } from "../utils/constants";

const statusConfig = {
  [ATTACK_STATUS.RUNNING]: {
    color: "#00d4ff",
    bg: "rgba(0, 212, 255, 0.1)",
    border: "rgba(0, 212, 255, 0.3)",
    label: "Running",
    pulse: true,
  },
  [ATTACK_STATUS.COMPLETED]: {
    color: "#34d399",
    bg: "rgba(52, 211, 153, 0.1)",
    border: "rgba(52, 211, 153, 0.3)",
    label: "Done",
    pulse: false,
  },
  [ATTACK_STATUS.FAILED]: {
    color: "#f87171",
    bg: "rgba(248, 113, 113, 0.1)",
    border: "rgba(248, 113, 113, 0.3)",
    label: "Failed",
    pulse: false,
  },
  [ATTACK_STATUS.PAUSED]: {
    color: "#fbbf24",
    bg: "rgba(251, 191, 36, 0.1)",
    border: "rgba(251, 191, 36, 0.3)",
    label: "Paused",
    pulse: false,
  },
  [ATTACK_STATUS.STOPPED]: {
    color: "#94a3b8",
    bg: "rgba(148, 163, 184, 0.08)",
    border: "rgba(148, 163, 184, 0.2)",
    label: "Stopped",
    pulse: false,
  },
};

const AttackStatusBadge = ({ status }) => {
  const cfg = statusConfig[status] || {
    color: "#94a3b8",
    bg: "rgba(148, 163, 184, 0.08)",
    border: "rgba(148, 163, 184, 0.2)",
    label: status,
    pulse: false,
  };

  return (
    <motion.span
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-semibold font-mono"
      style={{
        color: cfg.color,
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
      }}
    >
      <div className="relative flex-shrink-0">
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: cfg.color }}
        />
        {cfg.pulse && (
          <div
            className="absolute inset-0 w-1.5 h-1.5 rounded-full animate-ping"
            style={{ background: cfg.color, opacity: 0.6 }}
          />
        )}
      </div>
      <span className="uppercase tracking-wide text-[10px]">{cfg.label}</span>
    </motion.span>
  );
};

export default AttackStatusBadge;
