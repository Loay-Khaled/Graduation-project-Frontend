import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiLock, FiMail, FiAlertCircle, FiWifi } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const inputStyle = {
  background: "rgba(7,9,15,0.8)",
  border: "1px solid rgba(255,255,255,0.06)",
};
const inputFocusStyle = {
  border: "1px solid rgba(0,212,255,0.4)",
  boxShadow: "0 0 0 3px rgba(0,212,255,0.06)",
};
const inputBlurStyle = {
  border: "1px solid rgba(255,255,255,0.06)",
  boxShadow: "none",
};

const Setup = () => {
  const navigate = useNavigate();
  const { setupAdmin } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setError("");
  };

  const validateStep1 = () => {
    if (!formData.username || formData.username.length < 3) {
      setError("Username must be at least 3 characters");
      return false;
    }
    if (!formData.email || !formData.email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.password || formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.agreeTerms) {
      setError("You must agree to the ethical guidelines");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    setError("");
    const result = await setupAdmin({
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });
    setLoading(false);
    if (result.success) navigate("/");
    else setError(result.error || "Setup failed. Please try again.");
  };

  const FieldInput = ({ icon: Icon, type, name, value, placeholder, required }) => (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-xl text-white text-sm placeholder-slate-600 outline-none transition-all"
        style={inputStyle}
        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
        onBlur={(e) => Object.assign(e.target.style, inputBlurStyle)}
      />
    </div>
  );

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "#07090f" }}
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          top: "20%",
          right: "-15%",
          background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <div
            className="w-14 h-14 mx-auto mb-3 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(167,139,250,0.15))",
              border: "1px solid rgba(0,212,255,0.2)",
            }}
          >
            <FiWifi className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-white">First-Time Setup</h1>
          <p className="text-sm text-slate-500 mt-1">Create your administrator account</p>
        </div>

        {/* Progress steps */}
        <div className="flex items-center justify-center mb-6 space-x-3">
          {[1, 2].map((s) => (
            <React.Fragment key={s}>
              <motion.div
                animate={{
                  background: step >= s ? "linear-gradient(135deg, #00d4ff, #a78bfa)" : "rgba(255,255,255,0.05)",
                  border: step >= s ? "1px solid rgba(0,212,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold"
                style={{ color: step >= s ? "#fff" : "#475569" }}
              >
                {s}
              </motion.div>
              {s < 2 && (
                <div className="flex-1 h-px max-w-[60px]" style={{
                  background: step >= 2 ? "rgba(0,212,255,0.4)" : "rgba(255,255,255,0.06)"
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(13,17,26,0.9)",
            border: "1px solid rgba(0,212,255,0.1)",
            boxShadow: "0 0 60px rgba(0,212,255,0.04), 0 30px 80px rgba(0,0,0,0.5)",
          }}
        >
          <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), rgba(167,139,250,0.5), transparent)" }} />

          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl"
                style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.25)" }}
              >
                <FiAlertCircle className="text-danger w-4 h-4 flex-shrink-0" />
                <p className="text-danger text-sm">{error}</p>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Username</label>
                    <FieldInput icon={FiUser} type="text" name="username" value={formData.username} placeholder="Choose a username" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Email Address</label>
                    <FieldInput icon={FiMail} type="email" name="email" value={formData.email} placeholder="your.email@example.com" required />
                  </div>
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl font-semibold text-sm text-white"
                    style={{ background: "linear-gradient(135deg, #00d4ff, #6366f1)", boxShadow: "0 0 25px rgba(0,212,255,0.2)" }}
                  >
                    Next Step →
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Password</label>
                    <FieldInput icon={FiLock} type="password" name="password" value={formData.password} placeholder="Create a strong password" required />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Confirm Password</label>
                    <FieldInput icon={FiLock} type="password" name="confirmPassword" value={formData.confirmPassword} placeholder="Confirm your password" required />
                  </div>

                  {/* Ethical Agreement */}
                  <div
                    className="rounded-xl p-4 space-y-3"
                    style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.2)" }}
                  >
                    <div className="flex items-center space-x-2">
                      <FiAlertCircle className="w-4 h-4 text-warning" />
                      <h3 className="text-warning text-sm font-semibold">Ethical Guidelines</h3>
                    </div>
                    <ul className="text-xs text-slate-400 space-y-1 font-mono">
                      <li>• Only test networks with explicit authorization</li>
                      <li>• Use exclusively in controlled lab environments</li>
                      <li>• Record consent before any security testing</li>
                      <li>• Comply with all applicable laws and regulations</li>
                      <li>• Unauthorized access is illegal and punishable</li>
                    </ul>
                    <label className="flex items-start space-x-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 rounded accent-primary"
                      />
                      <span className="text-xs text-slate-300">
                        I understand and agree to follow these ethical guidelines
                      </span>
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-1">
                    <motion.button
                      type="button"
                      onClick={() => setStep(1)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 rounded-xl font-semibold text-sm text-slate-300"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                    >
                      ← Back
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      className="flex-1 py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center disabled:opacity-50"
                      style={{ background: "linear-gradient(135deg, #00d4ff, #6366f1)", boxShadow: "0 0 25px rgba(0,212,255,0.2)" }}
                    >
                      {loading ? <LoadingSpinner size="sm" /> : "Complete Setup"}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        <div className="text-center mt-5 space-y-2">
          <p className="text-xs text-slate-600">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Go to Login →
          </button>
        </div>

        <p className="text-center text-[10px] text-slate-700 font-mono mt-4">
          AAST — Computer Engineering
        </p>
      </motion.div>
    </div>
  );
};

export default Setup;
