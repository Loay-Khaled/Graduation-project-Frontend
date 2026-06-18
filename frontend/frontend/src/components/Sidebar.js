import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHome,
  FiRadio,
  FiZap,
  FiCpu,
  FiFileText,
  FiList,
  FiCheckSquare,
  FiSettings,
  FiUsers,
  FiHelpCircle,
  FiInfo,
  FiSearch,
  FiAlertTriangle,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/setup") {
    return null;
  }

  const menuItems = [
    { path: "/", icon: FiHome, label: "Dashboard" },
    { path: "/scanner", icon: FiRadio, label: "Network Scanner" },
    { path: "/nmap", icon: FiSearch, label: "Nmap Scanner" },
    { path: "/agentic-ai", icon: FiCpu, label: "Agentic AI" },
    { path: "/reports", icon: FiFileText, label: "Reports" },
    { path: "/logs", icon: FiList, label: "Logs" },
    { path: "/consent", icon: FiCheckSquare, label: "Consent" },
    { path: "/settings", icon: FiSettings, label: "Settings" },
  ];

  if (user?.role === "admin") {
    menuItems.push({ path: "/users", icon: FiUsers, label: "Users" });
  }

  menuItems.push(
    { path: "/help", icon: FiHelpCircle, label: "Help" },
    { path: "/about", icon: FiInfo, label: "About" }
  );

  const containerVariants = {
    hidden: { x: -260 },
    show: {
      x: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -16 },
    show: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.04, duration: 0.3, ease: "easeOut" },
    }),
  };

  return (
    <motion.aside
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="w-60 flex-shrink-0 h-[calc(100vh-60px)] flex flex-col overflow-y-auto"
      style={{
        background: "rgba(10, 14, 24, 0.95)",
        borderRight: "1px solid rgba(0, 212, 255, 0.08)",
      }}
    >
      <nav className="flex-1 p-3 space-y-0.5">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.path}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="show"
            >
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `relative flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "text-primary"
                      : "text-slate-400 hover:text-slate-200"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        layoutId="sidebarActive"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "rgba(0, 212, 255, 0.08)",
                          border: "1px solid rgba(0, 212, 255, 0.18)",
                        }}
                        initial={false}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                      />
                    )}
                    <div className={`relative flex items-center space-x-3 w-full`}>
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          isActive
                            ? "bg-primary/15 text-primary"
                            : "bg-transparent text-slate-500 group-hover:bg-slate-700/40 group-hover:text-slate-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {isActive && (
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full bg-primary"
                        style={{ boxShadow: "0 0 6px rgba(0, 212, 255, 0.8)" }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      {/* Warning Badge */}
      <div className="p-3 m-3 rounded-xl" style={{
        background: "rgba(248, 113, 113, 0.05)",
        border: "1px solid rgba(248, 113, 113, 0.2)",
      }}>
        <div className="flex items-center space-x-2 mb-1">
          <FiAlertTriangle className="w-3.5 h-3.5 text-danger flex-shrink-0" />
          <p className="text-[11px] font-bold text-danger tracking-wider uppercase">
            Educational Only
          </p>
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
          Unauthorized access is illegal
        </p>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
