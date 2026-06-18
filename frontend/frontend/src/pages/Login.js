import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLock, FiUser, FiAlertCircle } from "react-icons/fi";
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
    <div className="min-h-screen bg-dark-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Warning Banner */}
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 mb-6">
          <p className="text-red-400 text-center font-semibold text-sm">
            ⚠️ AUTHORIZED PERSONNEL ONLY
          </p>
          <p className="text-red-300 text-center text-xs mt-1">
            This system is for educational use in controlled environments
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-dark-200 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-center">
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-primary font-bold text-2xl">W</span>
            </div>
            <h1 className="text-2xl font-bold text-white">
              WiFi PenTest Device
            </h1>
            <p className="text-blue-100 text-sm mt-2">
              Raspberry Pi Security Testing Platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-3 flex items-center space-x-2">
                <FiAlertCircle className="text-red-500 w-5 h-5" />
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 text-primary bg-dark-300 border-gray-600 rounded focus:ring-primary"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-300"
              >
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-secondary hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? <LoadingSpinner size="sm" /> : "Sign In"}
            </button>
          </form>

          {/* Navigation to Setup */}
          <div className="px-8 pb-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">
                Need to setup a new system?
              </p>
              <button
                onClick={() => navigate("/setup")}
                className="px-6 py-2 bg-dark-300 hover:bg-dark-100 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-all duration-200"
              >
                Setup New Account
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 pb-8">
            <div className="text-center text-sm text-gray-400">
              <p>AAST - Department of Computer Engineering</p>
              <p className="text-xs mt-1">Supervisor: Dr. Mohamed Elhammahmy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
