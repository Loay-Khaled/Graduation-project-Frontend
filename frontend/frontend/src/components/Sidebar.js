import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FiHome,
  FiRadio,
  FiZap,
  FiCpu,
  FiDatabase,
  FiFileText,
  FiList,
  FiCheckSquare,
  FiSettings,
  FiUsers,
  FiHelpCircle,
  FiInfo,
  FiSearch,        // ← New icon for Nmap
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Don't show sidebar on login or setup pages
  if (location.pathname === "/login" || location.pathname === "/setup") {
    return null;
  }

  const menuItems = [
    { path: "/", icon: FiHome, label: "Dashboard" },
    { path: "/scanner", icon: FiRadio, label: "Network Scanner" },
    { path: "/nmap", icon: FiSearch, label: "Nmap Scanner" },        // ← Added here
    { path: "/agentic-ai", icon: FiCpu, label: "Agentic AI" },
    { path: "/reports", icon: FiFileText, label: "Reports" },
    { path: "/logs", icon: FiList, label: "Logs" },
    { path: "/consent", icon: FiCheckSquare, label: "Consent" },
    { path: "/settings", icon: FiSettings, label: "Settings" },
  ];

  // Add Users menu only for admin
  if (user?.role === "admin") {
    menuItems.push({ path: "/users", icon: FiUsers, label: "Users" });
  }

  // Add Help and About at the bottom
  menuItems.push(
    { path: "/help", icon: FiHelpCircle, label: "Help" },
    { path: "/about", icon: FiInfo, label: "About" }
  );

  return (
    <aside className="w-64 bg-dark-200 border-r border-gray-700 h-[calc(100vh-73px)] overflow-y-auto">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "text-gray-400 hover:bg-dark-100 hover:text-white"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Warning */}
      <div className="p-4 m-4 bg-red-900/20 border border-red-500 rounded-lg">
        <p className="text-xs text-red-400 text-center font-semibold">
          ⚠️ EDUCATIONAL USE ONLY
        </p>
        <p className="text-xs text-gray-400 text-center mt-1">
          Unauthorized access is illegal
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;