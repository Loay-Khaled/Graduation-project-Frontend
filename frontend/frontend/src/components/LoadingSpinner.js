import React from "react";
import { motion } from "framer-motion";

const sizeMap = {
  sm: { outer: 20, inner: 12, border: 2, text: "text-xs" },
  md: { outer: 36, inner: 22, border: 3, text: "text-sm" },
  lg: { outer: 52, inner: 32, border: 3, text: "text-sm" },
  xl: { outer: 68, inner: 42, border: 4, text: "text-base" },
};

const LoadingSpinner = ({ size = "md", text = "" }) => {
  const s = sizeMap[size];

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative" style={{ width: s.outer, height: s.outer }}>
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            border: `${s.border}px solid transparent`,
            borderTopColor: "#00d4ff",
            borderRightColor: "rgba(0, 212, 255, 0.3)",
          }}
        />
        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute rounded-full"
          style={{
            top: s.border + 3,
            left: s.border + 3,
            right: s.border + 3,
            bottom: s.border + 3,
            border: `${s.border - 1}px solid transparent`,
            borderTopColor: "#a78bfa",
            borderLeftColor: "rgba(167, 139, 250, 0.3)",
          }}
        />
        {/* Core dot */}
        <div
          className="absolute rounded-full bg-primary animate-pulse"
          style={{
            width: 5,
            height: 5,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 8px #00d4ff",
          }}
        />
      </div>
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`${s.text} text-slate-400 font-mono tracking-wide`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
