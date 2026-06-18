import React, { useEffect, useRef } from "react";
import { formatTime } from "../utils/helpers";

const LiveLogViewer = ({ logs, maxHeight = "400px" }) => {
  const logEndRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when new logs arrive
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const getLogColor = (level) => {
    const colors = {
      info: "text-blue-400",
      success: "text-green-400",
      warning: "text-yellow-400",
      error: "text-red-400",
    };
    return colors[level] || "text-gray-400";
  };

  return (
    <div
      className="bg-dark-300 rounded-lg p-4 font-mono text-xs overflow-y-auto"
      style={{ maxHeight }}
    >
      {logs.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No logs yet...</p>
      ) : (
        <>
          {logs.map((log, index) => (
            <div key={index} className="mb-1 flex items-start space-x-2">
              <span className="text-gray-500">
                [{formatTime(log.timestamp)}]
              </span>
              <span
                className={`${getLogColor(log.level)} font-semibold uppercase`}
              >
                [{log.level}]
              </span>
              <span className="text-gray-300 flex-1">{log.message}</span>
            </div>
          ))}
          <div ref={logEndRef} />
        </>
      )}
    </div>
  );
};

export default LiveLogViewer;
