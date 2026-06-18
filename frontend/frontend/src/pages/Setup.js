import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLock, FiMail, FiAlertCircle, FiCheck } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

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
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
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

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Setup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-dark-300 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl">W</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            First-Time Setup
          </h1>
          <p className="text-gray-400">Create your administrator account</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? "bg-primary" : "bg-gray-700"}`}
            >
              <span className="text-white font-semibold">1</span>
            </div>
            <div
              className={`w-16 h-1 ${step >= 2 ? "bg-primary" : "bg-gray-700"}`}
            ></div>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? "bg-primary" : "bg-gray-700"}`}
            >
              <span className="text-white font-semibold">2</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-dark-200 border border-gray-700 rounded-xl shadow-2xl p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-900/30 border border-red-500 rounded-lg p-3 flex items-center space-x-2">
              <FiAlertCircle className="text-red-500 w-5 h-5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <>
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
                      placeholder="Choose a username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg transition-all duration-200"
                >
                  Next Step
                </button>
              </>
            )}

            {/* Step 2: Password & Agreement */}
            {step === 2 && (
              <>
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
                      placeholder="Create a strong password"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-dark-300 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                {/* Ethical Agreement */}
                <div className="bg-yellow-900/20 border border-yellow-500 rounded-lg p-4">
                  <h3 className="text-yellow-400 font-semibold mb-2 flex items-center">
                    <FiAlertCircle className="mr-2" />
                    Ethical Guidelines
                  </h3>
                  <ul className="text-sm text-gray-300 space-y-1 mb-3">
                    <li>• Only test networks with explicit authorization</li>
                    <li>• Use exclusively in controlled lab environments</li>
                    <li>• Record consent before any security testing</li>
                    <li>• Comply with all applicable laws and regulations</li>
                    <li>• Unauthorized access is illegal and punishable</li>
                  </ul>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="mt-1 w-4 h-4 text-primary bg-dark-300 border-gray-600 rounded focus:ring-primary"
                    />
                    <span className="ml-2 text-sm text-gray-300">
                      I understand and agree to follow these ethical guidelines
                    </span>
                  </label>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-dark-100 hover:bg-dark-300 text-white font-semibold py-3 rounded-lg transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? <LoadingSpinner size="sm" /> : "Complete Setup"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>

        {/* Navigation to Login */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm mb-3">Already have an account?</p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-dark-200 hover:bg-dark-100 border border-gray-600 hover:border-gray-500 text-white rounded-lg transition-all duration-200"
          >
            Go to Login
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-400">
          <p>AAST - Department of Computer Engineering</p>
        </div>
      </div>
    </div>
  );
};

export default Setup;
