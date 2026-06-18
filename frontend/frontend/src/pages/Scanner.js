import React, { useState, useEffect } from "react";
import { FiRefreshCw, FiFilter, FiSearch } from "react-icons/fi";
import { toast } from "react-toastify";
import { useSocket } from "../context/SocketContext";
import { networkAPI } from "../services/apiService";
import LoadingSpinner from "../components/LoadingSpinner";
import { formatSignalStrength, getEncryptionColor } from "../utils/helpers";

const Scanner = () => {
  const { networks, socket } = useSocket();
  const [scanning, setScanning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [localNetworks, setLocalNetworks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch existing networks from database on mount
  useEffect(() => {
    const fetchNetworks = async () => {
      try {
        setLoading(true);
        const response = await networkAPI.getNetworks();
        if (response.data.data.networks) {
          setLocalNetworks(response.data.data.networks);
        }
      } catch (error) {
        console.error("Failed to fetch networks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNetworks();
  }, []);

  // Merge socket networks with local networks
  useEffect(() => {
    if (networks.length > 0) {
      setLocalNetworks((prev) => {
        const networkMap = new Map(prev.map((n) => [n.bssid, n]));
        networks.forEach((n) => networkMap.set(n.bssid, n));
        return Array.from(networkMap.values());
      });
    }
  }, [networks]);

  useEffect(() => {
    // Subscribe to network events
    socket.emit("subscribe:networks");

    // Listen for scan complete event
    const handleScanComplete = (data) => {
      setScanning(false);
      toast.success(
        `Scan completed! Found ${data.count} network${data.count !== 1 ? "s" : ""}`,
      );

      // Refresh networks from database
      networkAPI.getNetworks().then((response) => {
        if (response.data.data.networks) {
          setLocalNetworks(response.data.data.networks);
        }
      });
    };

    // Listen for scan error event
    const handleScanError = (data) => {
      setScanning(false);
      toast.error(`Scan failed: ${data.error}`);
    };

    socket.on("scan_complete", handleScanComplete);
    socket.on("scan_error", handleScanError);

    return () => {
      socket.off("scan_complete", handleScanComplete);
      socket.off("scan_error", handleScanError);
    };
  }, [socket]);

  const startScan = async () => {
    setScanning(true);
    try {
      await networkAPI.startScan();
      toast.info("Network scan started...");
    } catch (error) {
      console.error("Failed to start scan:", error);
      toast.error("Failed to start scan");
      setScanning(false);
    }
  };

  const stopScan = async () => {
    try {
      await networkAPI.stopScan();
      toast.info("Scan stopped");
    } catch (error) {
      console.error("Failed to stop scan:", error);
      toast.error("Failed to stop scan");
    } finally {
      setScanning(false);
    }
  };

  const filteredNetworks = localNetworks.filter((network) => {
    const matchesSearch = network.ssid
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "vulnerable" && network.vulnerabilityScore > 50) ||
      (filter === "secure" && network.vulnerabilityScore <= 50);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Network Scanner
          </h1>
          <p className="text-gray-400">Discover nearby Wi-Fi networks</p>
        </div>
        <button
          onClick={scanning ? stopScan : startScan}
          className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors ${
            scanning
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-primary hover:bg-blue-600 text-white"
          }`}
        >
          <FiRefreshCw
            className={`w-5 h-5 ${scanning ? "animate-spin" : ""}`}
          />
          <span>{scanning ? "Stop Scan" : "Start Scan"}</span>
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search networks..."
            className="w-full pl-10 pr-4 py-3 bg-dark-200 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-3 bg-dark-200 border border-gray-700 rounded-lg text-white focus:border-primary focus:ring-2 focus:ring-primary/50 outline-none"
        >
          <option value="all">All Networks</option>
          <option value="vulnerable">Vulnerable</option>
          <option value="secure">Secure</option>
        </select>
      </div>

      {/* Networks Table */}
      <div className="bg-dark-200 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-100 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                  SSID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                  BSSID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                  Channel
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                  Signal
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                  Encryption
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                  Clients
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase">
                  Vulnerability
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredNetworks.length > 0 ? (
                filteredNetworks.map((network) => {
                  const signal = formatSignalStrength(network.rssi);
                  return (
                    <tr
                      key={network.bssid}
                      className="hover:bg-dark-100 transition-colors"
                    >
                      <td className="px-6 py-4 text-white font-medium">
                        {network.ssid || "(Hidden)"}
                      </td>
                      <td className="px-6 py-4 text-gray-400 font-mono text-sm">
                        {network.bssid}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {network.channel}
                      </td>
                      <td className="px-6 py-4">
                        <span className={signal.color}>
                          {network.rssi} dBm ({signal.label})
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={getEncryptionColor(network.encryption)}
                        >
                          {network.encryption}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {network.clients || 0}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-dark-300 rounded-full h-2 max-w-[100px]">
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
                            {network.vulnerabilityScore || 0}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    {loading ? (
                      <div className="flex flex-col items-center space-y-4">
                        <LoadingSpinner size="md" />
                        <p>Loading networks...</p>
                      </div>
                    ) : scanning ? (
                      <div className="flex flex-col items-center space-y-4">
                        <LoadingSpinner size="md" />
                        <p>Scanning for networks...</p>
                      </div>
                    ) : (
                      <p>
                        No networks found. Click "Start Scan" to discover
                        networks.
                      </p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Scanner;
