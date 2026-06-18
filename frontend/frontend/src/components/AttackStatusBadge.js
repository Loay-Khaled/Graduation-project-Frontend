import React from "react";
import { ATTACK_STATUS } from "../utils/constants";
import { getAttackStatusColor } from "../utils/helpers";

const AttackStatusBadge = ({ status }) => {
  const colorClass = getAttackStatusColor(status);

  const statusIcons = {
    [ATTACK_STATUS.RUNNING]: "▶",
    [ATTACK_STATUS.COMPLETED]: "✓",
    [ATTACK_STATUS.FAILED]: "✗",
    [ATTACK_STATUS.PAUSED]: "❚❚",
    [ATTACK_STATUS.STOPPED]: "■",
  };

  const icon = statusIcons[status] || "•";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${colorClass}`}
    >
      <span className="mr-1">{icon}</span>
      {status.toUpperCase()}
    </span>
  );
};

export default AttackStatusBadge;
