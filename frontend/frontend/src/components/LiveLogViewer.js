import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatTime } from "../utils/helpers";

const levelConfig = {
  info: { color: "#00d4ff", bg: "rgba(0, 212, 255, 0.08)", label: "INFO" },
  success: { color: "#34d399", bg: "rgba(52, 211, 153, 0.08)", label: "OK  " },
  warning: { color: "#fbbf24", bg: "rgba(251, 191, 36, 0.08)", label: "WARN" },
  error: { color: "#f87171", bg: "rgba(248, 113, 113, 0.08)", label: "ERR " },
};

const LiveLogViewer = ({ logs, maxHeight = "400px" }) => {
  const logEndRef = useRef(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div
      className="rounded-xl overflow-hidden font-mono text-xs"
      style={{
        background: "#050810",
        border: "1px solid rgba(0, 212, 255, 0.08)",
        maxHeight,
        overflowY: "auto",
      }}
    >
      {/* Terminal header bar */}
      <div
        className="flex items-center space-x-1.5 px-4 py-2.5 sticky top-0"
        style={{
          background: "#07090f",
          borderBottom: "1px solid rgba(0, 212, 255, 0.08)",
        }}
      >
        <div className="w-3 h-3 rounded-full bg-danger/70" />
        <div className="w-3 h-3 rounded-full bg-warning/70" />
        <div className="w-3 h-3 rounded-full bg-success/70" />
        <span className="ml-3 text-slate-600 text-[10px] tracking-widest uppercase">
          Live Log Stream
        </span>
        <div className="ml-auto flex items-center space-x-1">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-[10px] text-slate-600">{logs.length} entries</span>
        </div>
      </div>

      {/* Logs */}
      <div className="p-3 space-y-0.5">
        {logs.length === 0 ? (
          <div className="py-8 text-center">
            <span className="text-slate-600 text-[11px] tracking-widest">
              &gt; Awaiting log stream...
              <span className="animate-blink">_</span>
            </span>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {logs.map((log, index) => {
              const cfg = levelConfig[log.level] || levelConfig.info;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-start space-x-2 py-0.5 px-2 rounded hover:bg-white/[0.02] transition-colors group"
                >
                  <span className="text-slate-600 flex-shrink-0 w-20 text-[10px] pt-px">
                    {formatTime(log.timestamp)}
                  </span>
                  <span
                    className="flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest"
                    style={{ color: cfg.color, background: cfg.bg }}
                  >
                    {cfg.label}
                  </span>
                  <span className="text-slate-300 flex-1 break-all leading-relaxed text-[11px]">
                    {log.message}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default LiveLogViewer;
