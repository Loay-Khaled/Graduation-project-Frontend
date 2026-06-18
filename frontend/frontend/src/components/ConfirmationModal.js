import React from "react";
import { motion } from "framer-motion";
import { FiAlertTriangle } from "react-icons/fi";
import Modal from "./Modal";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDangerous = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="space-y-5">
        {/* Icon */}
        <div className="flex justify-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: isDangerous
                ? "rgba(248, 113, 113, 0.1)"
                : "rgba(251, 191, 36, 0.1)",
              border: isDangerous
                ? "1px solid rgba(248, 113, 113, 0.3)"
                : "1px solid rgba(251, 191, 36, 0.3)",
            }}
          >
            <FiAlertTriangle
              className={`w-8 h-8 ${isDangerous ? "text-danger" : "text-warning"}`}
            />
          </div>
        </div>

        {/* Message */}
        <p className="text-slate-300 text-center text-sm leading-relaxed">{message}</p>

        {/* Ethical warning */}
        {isDangerous && (
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(248, 113, 113, 0.05)",
              border: "1px solid rgba(248, 113, 113, 0.2)",
            }}
          >
            <p className="text-danger text-xs text-center font-medium font-mono tracking-wide">
              ⚠ Ensure you have proper authorization before proceeding
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3 pt-1">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {cancelText}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{
              background: isDangerous
                ? "linear-gradient(135deg, #f87171, #ef4444)"
                : "linear-gradient(135deg, #00d4ff, #0ea5e9)",
              boxShadow: isDangerous
                ? "0 0 20px rgba(248, 113, 113, 0.3)"
                : "0 0 20px rgba(0, 212, 255, 0.3)",
            }}
          >
            {confirmText}
          </motion.button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
