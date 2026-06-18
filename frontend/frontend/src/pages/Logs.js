import React from "react";
import { useSocket } from "../context/SocketContext";
import LiveLogViewer from "../components/LiveLogViewer";

const Logs = () => {
  const { logs } = useSocket();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">System Logs</h1>
        <p className="text-gray-400">Real-time activity and audit trail</p>
      </div>

      <div className="bg-dark-200 border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Live Log Stream</h2>
          <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white text-sm">
            Clear Logs
          </button>
        </div>
        <LiveLogViewer logs={logs} maxHeight="600px" />
      </div>
    </div>
  );
};

export default Logs;
