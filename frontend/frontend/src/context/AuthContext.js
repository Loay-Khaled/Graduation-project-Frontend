import React, { createContext, useState, useContext, useEffect } from "react";
import { authAPI } from "../services/apiService";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        // Verify token is not expired
        const decoded = jwtDecode(storedToken);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else {
          // Token expired
          logout();
        }
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }

    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      const payload = response.data?.data || response.data || {};
      const { token, user } = payload;

      if (!token || !user) {
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    authAPI.logout().catch(() => {
      // Ignore logout API failures and clear local auth state anyway.
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const setupAdmin = async (adminData) => {
    try {
      const response = await authAPI.setupAdmin(adminData);
      const payload = response.data?.data || response.data || {};
      const { token, user } = payload;

      if (!token || !user) {
        throw new Error("Invalid setup response");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Setup failed",
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    setupAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
