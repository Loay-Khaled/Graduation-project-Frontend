import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiUser, FiPower, FiWifi, FiWifiOff } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { connected } = useSocket();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (location.pathname === "/login" || location.pathname === "/setup") {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 h-[60px] glass cyber-border border-t-0 border-l-0 border-r-0 px-6 flex items-center justify-between"
      style={{ borderBottom: "1px solid rgba(0, 212, 255, 0.1)" }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-3 group">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow-cyan group-hover:scale-105 transition-transform duration-200">
            <FiWifi className="w-5 h-5 text-white" />
          </div>
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-success border-2 border-dark-400 animate-pulse-slow" />
        </div>
        <div>
          <h1 className="text-base font-bold text-white leading-none tracking-tight">
            WiFi PenTest
          </h1>
          <p className="text-[10px] text-slate-500 mt-0.5 font-mono tracking-wider">
            AAST GRAD PROJECT
          </p>
        </div>
      </Link>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Connection Status */}
        <motion.div
          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg"
          style={{
            background: connected
              ? "rgba(52, 211, 153, 0.08)"
              : "rgba(248, 113, 113, 0.08)",
            border: connected
              ? "1px solid rgba(52, 211, 153, 0.2)"
              : "1px solid rgba(248, 113, 113, 0.2)",
          }}
        >
          <div className="relative">
            <div
              className={`w-2 h-2 rounded-full ${
                connected ? "bg-success" : "bg-danger"
              }`}
            />
            {connected && (
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-success animate-ping opacity-60" />
            )}
          </div>
          {connected ? (
            <FiWifi className="w-3.5 h-3.5 text-success" />
          ) : (
            <FiWifiOff className="w-3.5 h-3.5 text-danger" />
          )}
          <span
            className={`text-xs font-medium font-mono ${
              connected ? "text-success" : "text-danger"
            }`}
          >
            {connected ? "ONLINE" : "OFFLINE"}
          </span>
        </motion.div>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10 transition-all duration-200">
          <FiBell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-danger rounded-full" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-slate-700/50" />

        {/* User */}
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white leading-none">
              {user?.username}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 capitalize font-mono">
              {user?.role}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-secondary/30 to-primary/30 border border-primary/20 flex items-center justify-center">
            <FiUser className="w-4 h-4 text-primary" />
          </div>
        </div>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm font-medium text-danger border border-danger/20 bg-danger/5 hover:bg-danger/15 hover:border-danger/40 transition-all duration-200"
        >
          <FiPower className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
