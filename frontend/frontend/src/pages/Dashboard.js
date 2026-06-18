import React, { useEffect, useState } from "react";
import { FiWifi, FiZap, FiAlertTriangle, FiShield } from "react-icons/fi";
import StatCard from "../components/StatCard";
import LiveLogViewer from "../components/LiveLogViewer";
import AttackStatusBadge from "../components/AttackStatusBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSocket } from "../context/SocketContext";
import { dashboardAPI, networkAPI } from "../services/apiService";
import { getEncryptionColor } from "../utils/helpers";

const Dashboard = () => {
  const {
    logs,
    attacks,
    deviceMetrics,
    connected,
    networks: socketNetworks,
  } = useSocket();
  const [stats, setStats] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Update networks when socket receives new data
  useEffect(() => {
    if (socketNetworks.length > 0) {
      setNetworks((prev) => {
        const networkMap = new Map(prev.map((n) => [n.bssid, n]));
        socketNetworks.forEach((n) => networkMap.set(n.bssid, n));
        return Array.from(networkMap.values());
      });
    }
  }, [socketNetworks]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, networksRes] = await Promise.all([
        dashboardAPI.getStats(),
        networkAPI.getNetworks(),
      ]);

      setStats(statsRes.data);
      if (networksRes.data.data.networks) {
        setNetworks(networksRes.data.data.networks);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate real-time stats from networks
  const networkStats = {
    total: networks.length,
    vulnerable: networks.filter((n) => n.vulnerabilityScore > 50).length,
    open: networks.filter((n) => n.encryption === "Open").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">
          Welcome to your Wi-Fi penetration testing control center
        </p>
      </div>

      {/* Connection Status Alert */}
      {!connected && (
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-4 flex items-center space-x-3">
          <FiAlertTriangle className="text-red-500 w-6 h-6" />
          <div>
            <p className="text-red-400 font-semibold">Connection Lost</p>
            <p className="text-red-300 text-sm">
              Unable to connect to the backend server
            </p>
          </div>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={FiWifi}
          title="Networks Scanned"
          value={networkStats.total}
          color="primary"
          trend={stats?.networksTrend}
        />
        <StatCard
          icon={FiZap}
          title="Active Attacks"
          value={attacks.filter((a) => a.status === "running").length}
          color="secondary"
        />
        <StatCard
          icon={FiAlertTriangle}
          title="Vulnerable Networks"
          value={networkStats.vulnerable}
          color="warning"
        />
        <StatCard
          icon={FiShield}
          title="Open Networks"
          value={networkStats.open}
          color="success"
        />
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recently Discovered Networks */}
        <div className="lg:col-span-2 bg-dark-200 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">
              Recently Discovered Networks
            </h2>
            <button
              onClick={fetchDashboardData}
              className="text-primary hover:text-blue-400 text-sm font-semibold"
            >
              Refresh
            </button>
          </div>
          {networks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                      SSID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                      Encryption
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                      Signal
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">
                      Vulnerability
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {networks.slice(0, 6).map((network) => (
                    <tr
                      key={network.bssid}
                      className="hover:bg-dark-100 transition-colors"
                    >
                      <td className="px-4 py-3 text-white font-medium">
                        {network.ssid || "(Hidden)"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={getEncryptionColor(network.encryption)}
                        >
                          {network.encryption}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {network.rssi} dBm
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-dark-300 rounded-full h-2 max-w-[80px]">
                            <div
                              className={`h-2 rounded-full ${
                                network.vulnerabilityScore > 70
                                  ? "bg-red-500"
                                  : network.vulnerabilityScore > 40
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                              style={{
                                width: `${network.vulnerabilityScore || 0}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-gray-400 text-sm">
                            {network.vulnerabilityScore}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <FiWifi className="w-12 h-12 text-gray-600 mb-3" />
              <p className="text-gray-500 text-center">
                No networks discovered yet. Start a scan from the Scanner page.
              </p>
            </div>
          )}
        </div>

        {/* Device Health */}
        <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Device Health</h2>
          {deviceMetrics ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">CPU Usage</span>
                  <span className="text-white font-semibold">
                    {deviceMetrics.cpu}%
                  </span>
                </div>
                <div className="w-full bg-dark-300 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${deviceMetrics.cpu > 80 ? "bg-red-500" : deviceMetrics.cpu > 60 ? "bg-yellow-500" : "bg-green-500"}`}
                    style={{ width: `${deviceMetrics.cpu}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Memory Usage</span>
                  <span className="text-white font-semibold">
                    {deviceMetrics.memory}%
                  </span>
                </div>
                <div className="w-full bg-dark-300 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${deviceMetrics.memory > 80 ? "bg-red-500" : deviceMetrics.memory > 60 ? "bg-yellow-500" : "bg-green-500"}`}
                    style={{ width: `${deviceMetrics.memory}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Temperature</span>
                  <span className="text-white font-semibold">
                    {deviceMetrics.temperature}°C
                  </span>
                </div>
                <div className="w-full bg-dark-300 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${deviceMetrics.temperature > 70 ? "bg-red-500" : deviceMetrics.temperature > 60 ? "bg-yellow-500" : "bg-green-500"}`}
                    style={{
                      width: `${(deviceMetrics.temperature / 80) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No device metrics available
            </p>
          )}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Attacks */}
        <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Active Attacks</h2>
          {attacks.length > 0 ? (
            <div className="space-y-3">
              {attacks.slice(0, 5).map((attack) => (
                <div key={attack.id} className="bg-dark-300 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">
                      {attack.type}
                    </span>
                    <AttackStatusBadge status={attack.status} />
                  </div>
                  <div className="text-sm text-gray-400">
                    Target: {attack.target}
                  </div>
                  {attack.progress && (
                    <div className="mt-2">
                      <div className="w-full bg-dark-200 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-primary"
                          style={{ width: `${attack.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No active attacks</p>
          )}
        </div>

        {/* Live Activity Log */}
        <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Live Activity Feed
          </h2>
          <LiveLogViewer logs={logs} maxHeight="300px" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
