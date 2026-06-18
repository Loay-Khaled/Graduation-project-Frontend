import React from "react";

const StatCard = ({
  icon: Icon,
  title,
  value,
  color = "primary",
  trend,
  onClick,
}) => {
  return (
    <div
      className={`bg-dark-200 border border-gray-700 rounded-xl p-6 ${
        onClick ? "cursor-pointer hover:border-gray-600 transition-colors" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm mb-2">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && (
            <p
              className={`text-sm mt-2 ${trend.positive ? "text-green-500" : "text-red-500"}`}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div
          className={`w-14 h-14 bg-${color}/20 rounded-lg flex items-center justify-center`}
        >
          <Icon className={`w-7 h-7 text-${color}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
