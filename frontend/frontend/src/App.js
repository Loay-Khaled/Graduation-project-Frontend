import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Setup from "./pages/Setup";
import Dashboard from "./pages/Dashboard";
import Scanner from "./pages/Scanner";
import Nmap from "./pages/Nmap";        // ← This now correctly points to Nmap.js


import AgenticAI from "./pages/AgenticAI";
import Reports from "./pages/Reports";
import Logs from "./pages/Logs";
import Consent from "./pages/Consent";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Help from "./pages/Help";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <div className="min-h-screen bg-dark-300">
            <Navbar />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/setup" element={<Setup />} />

                  {/* Protected Routes */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/scanner"
                    element={
                      <ProtectedRoute>
                        <Scanner />
                      </ProtectedRoute>
                    }
                  />

                  {/* Nmap Route - Added */}
                  <Route
                    path="/nmap"
                    element={
                      <ProtectedRoute>
                        <Nmap />
                      </ProtectedRoute>
                    }
                  />

                 
                  <Route
                    path="/agentic-ai"
                    element={
                      <ProtectedRoute>
                        <AgenticAI />
                      </ProtectedRoute>
                    }
                  />
                  
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/logs"
                    element={
                      <ProtectedRoute>
                        <Logs />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/consent"
                    element={
                      <ProtectedRoute>
                        <Consent />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/users"
                    element={
                      <ProtectedRoute>
                        <Users />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/help"
                    element={
                      <ProtectedRoute>
                        <Help />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/about"
                    element={
                      <ProtectedRoute>
                        <About />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Not Found */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>

            {/* Toast Notifications */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;