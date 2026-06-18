import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiLock, FiUser, FiAlertCircle, FiWifi, FiShield } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login({
      username: formData.username,
      password: formData.password,
    });

    setLoading(false);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Login failed. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "#07090f" }}
    >
      {/* Cyber grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient orbs */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none animate-orb"
        style={{
          top: "10%",
          left: "-10%",
          background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          bottom: "5%",
          right: "-5%",
          background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "orb 10s ease-in-out infinite reverse",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Warning Banner */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-5 px-4 py-2.5 rounded-xl flex items-center justify-center space-x-2"
          style={{
            background: "rgba(248, 113, 113, 0.06)",
            border: "1px solid rgba(248, 113, 113, 0.2)",
          }}
        >
          <FiShield className="w-3.5 h-3.5 text-danger flex-shrink-0" />
          <span className="text-danger text-[11px] font-mono tracking-widest uppercase font-semibold">
            Authorized Personnel Only
          </span>
        </motion.div>

        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden shadow-card"
          style={{
            background: "rgba(13, 17, 26, 0.9)",
            border: "1px solid rgba(0, 212, 255, 0.12)",
            boxShadow: "0 0 60px rgba(0, 212, 255, 0.06), 0 30px 80px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Top accent */}
          <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), rgba(167,139,250,0.5), transparent)" }} />

          {/* Header */}
          <div className="relative pt-8 pb-6 px-8 text-center overflow-hidden">
            <div
              className="absolute inset-0"
              style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 70%)" }}
            />
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
              className="relative w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(167,139,250,0.2))",
                border: "1px solid rgba(0,212,255,0.3)",
                boxShadow: "0 0 30px rgba(0,212,255,0.2)",
              }}
            >
              <FiWifi className="w-8 h-8 text-primary" />
            </motion.div>
            <h1 className="relative text-2xl font-bold text-white mb-1">WiFi PenTest Device</h1>
            <p className="relative text-xs text-slate-500 font-mono tracking-widest">
              Raspberry Pi Security Platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl"
                style={{
                  background: "rgba(248,113,113,0.08)",
                  border: "1px solid rgba(248,113,113,0.25)",
                }}
              >
                <FiAlertCircle className="text-danger w-4 h-4 flex-shrink-0" />
                <p className="text-danger text-sm">{error}</p>
              </motion.div>
            )}

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 outline-none transition-all"
                  style={{
                    background: "rgba(7,9,15,0.8)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onFocus={(e) => { e.target.style.border = "1px solid rgba(0,212,255,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.06)"; }}
                  onBlur={(e) => { e.target.style.border = "1px solid rgba(255,255,255,0.06)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 outline-none transition-all"
                  style={{
                    background: "rgba(7,9,15,0.8)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                  onFocus={(e) => { e.target.style.border = "1px solid rgba(0,212,255,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.06)"; }}
                  onBlur={(e) => { e.target.style.border = "1px solid rgba(255,255,255,0.06)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* Remember me */}
            <label className="flex items-center space-x-2.5 cursor-pointer group">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                Remember me
              </span>
            </label>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #00d4ff, #0ea5e9, #6366f1)",
                boxShadow: "0 0 30px rgba(0,212,255,0.25)",
              }}
            >
              {loading ? <LoadingSpinner size="sm" /> : "Sign In"}
            </motion.button>

            {/* Setup link */}
            <div className="pt-2 text-center space-y-2">
              <p className="text-xs text-slate-500">Need to setup a new system?</p>
              <button
                type="button"
                onClick={() => navigate("/setup")}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Setup New Account →
              </button>
            </div>
          </form>

          {/* Footer */}
          <div
            className="px-8 py-4 text-center"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            <p className="text-[11px] text-slate-600 font-mono">
              AAST — Computer Engineering
            </p>
            <p className="text-[10px] text-slate-700 mt-0.5">
              Supervisor: Dr. Mohamed Elhammahmy
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
