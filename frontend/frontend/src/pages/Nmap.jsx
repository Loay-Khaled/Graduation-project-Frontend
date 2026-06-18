import React, { useState, useEffect } from "react";
import { FiSearch, FiRefreshCw, FiServer } from "react-icons/fi";
import { nmapAPI } from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

const Nmap = () => {
  const [scans, setScans] = useState([]);
  const [selectedScan, setSelectedScan] = useState(null);
  const [expandedHost, setExpandedHost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScans();
  }, []);

  const fetchScans = async () => {
    try {
      setLoading(true);
      const res = await nmapAPI.getNmapScans();

      const data =
        res.data?.data?.scans ||
        res.data?.scans ||
        res.data ||
        [];

      setScans(data);
    } catch (err) {
      toast.error("Failed to load scans");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleString();

  const getStatusColor = (status) => {
    if (status === "up") return "bg-green-500/20 text-green-400";
    if (status === "down") return "bg-red-500/20 text-red-400";
    return "bg-yellow-500/20 text-yellow-400";
  };

  const getPortColor = (port) => {
    if ([21, 22, 23, 445, 3389].includes(port))
      return "bg-red-500/20 text-red-400"; // risky
    if ([80, 443].includes(port))
      return "bg-blue-500/20 text-blue-400";
    return "bg-gray-700 text-gray-300";
  };

  return (
    <div className="p-6 space-y-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <FiSearch className="text-primary" />
          Nmap Intelligence
        </h1>

        <button
          onClick={fetchScans}
          className="px-4 py-2 bg-primary rounded-lg flex items-center gap-2 hover:bg-primary/80"
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">

          {/* LEFT PANEL */}
          <div className="bg-dark-100 border border-gray-700 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-gray-700 font-semibold">
              Scan History ({scans.length})
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              {scans.map((scan) => (
                <div
                  key={scan._id}
                  onClick={() => setSelectedScan(scan)}
                  className={`p-4 cursor-pointer border-l-4 transition ${
                    selectedScan?._id === scan._id
                      ? "border-primary bg-primary/10"
                      : "border-transparent hover:bg-dark-200"
                  }`}
                >
                  <div className="text-xs text-gray-500">
                    {formatDate(scan.timestamp || scan.createdAt)}
                  </div>

                  <div className="font-semibold">
                    {scan.essid || "Unknown Network"}
                  </div>

                  <div className="text-xs text-gray-400 mt-1">
                    {scan.host_count} hosts discovered
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-2 bg-dark-100 border border-gray-700 rounded-xl p-6">

            {!selectedScan ? (
              <div className="text-center py-20 text-gray-500">
                Select a scan
              </div>
            ) : (
              <>
                {/* SUMMARY */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">
                    {selectedScan.essid || "Network"}
                  </h2>

                  <div className="flex gap-6 text-sm text-gray-400 mt-2">
                    <span>Hosts: {selectedScan.host_count}</span>
                    <span>
                      {formatDate(selectedScan.timestamp || selectedScan.createdAt)}
                    </span>
                  </div>
                </div>

                {/* HOSTS */}
                <div className="space-y-4">

                  {selectedScan.hosts?.map((host, i) => (
                    <div
                      key={i}
                      className="border border-gray-700 rounded-xl overflow-hidden"
                    >
                      {/* HEADER */}
                      <div
                        onClick={() =>
                          setExpandedHost(expandedHost === i ? null : i)
                        }
                        className="p-4 flex justify-between items-center cursor-pointer hover:bg-dark-200"
                      >
                        <div className="flex items-center gap-3">
                          <FiServer />

                          <div>
                            <div className="font-mono text-sm font-semibold">
                              {host.ip}
                            </div>

                            <div className="text-xs text-gray-500">
                              {host.mac || "No MAC"}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-1 rounded text-xs ${getStatusColor(
                              host.status
                            )}`}
                          >
                            {host.status}
                          </span>

                          <span className="text-xs text-gray-400">
                            {host.ports.length} ports
                          </span>
                        </div>
                      </div>

                      {/* EXPANDED */}
                      {expandedHost === i && (
                        <div className="p-4 bg-black/40 space-y-4">

                          {/* OS */}
                          {host.os && (
                            <div className="text-sm text-blue-400">
                              {host.os}
                            </div>
                          )}

                          {/* PORT BADGES (NEW 🔥) */}
                          <div className="flex flex-wrap gap-2">
                            {host.ports.map((p, idx) => (
                              <span
                                key={idx}
                                className={`px-3 py-1 rounded-full text-xs font-mono ${getPortColor(
                                  p.port
                                )}`}
                              >
                                {p.port} ({p.service || "unknown"})
                              </span>
                            ))}
                          </div>

                          {/* TABLE */}
                          {host.ports.length > 0 && (
                            <table className="w-full text-sm mt-3">
                              <thead>
                                <tr className="text-gray-400 border-b border-gray-700">
                                  <th className="text-left py-2">Port</th>
                                  <th>State</th>
                                  <th>Service</th>
                                  <th>Version</th>
                                </tr>
                              </thead>

                              <tbody>
                                {host.ports.map((p, idx) => (
                                  <tr key={idx} className="border-b border-gray-800">
                                    <td className="py-2 font-mono">{p.port}</td>
                                    <td className="text-green-400">{p.state}</td>
                                    <td>{p.service}</td>
                                    <td className="text-gray-400">{p.version}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                </div>

                {/* RAW OUTPUT */}
                <details className="mt-6">
                  <summary className="cursor-pointer text-gray-400">
                    Show Raw Output
                  </summary>

                  <pre className="mt-3 p-4 bg-black text-green-400 text-xs overflow-auto rounded">
                    {selectedScan.raw_output}
                  </pre>
                </details>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Nmap;