import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiBell, FiUser, FiPower } from "react-icons/fi";
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

  // Don't show navbar on login or setup pages
  if (location.pathname === "/login" || location.pathname === "/setup") {
    return null;
  }

  return (
    <nav className="bg-dark-200 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">W</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              WiFi PenTest Device
            </h1>
            <p className="text-xs text-gray-400">AAST Graduation Project</p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-6">
          {/* Connection Status */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${connected ? "bg-green-500" : "bg-red-500"}`}
            ></div>
            <span className="text-sm text-gray-400">
              {connected ? "Connected" : "Disconnected"}
            </span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <FiBell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-white">{user?.username}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
            <button className="p-2 bg-dark-100 rounded-lg text-gray-400 hover:text-white transition-colors">
              <FiUser className="w-5 h-5" />
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
          >
            <FiPower className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
