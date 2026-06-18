import React from "react";
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
      <div className="space-y-6">
        {/* Warning Icon */}
        <div className="flex justify-center">
          <div
            className={`w-16 h-16 rounded-full ${isDangerous ? "bg-red-500/20" : "bg-yellow-500/20"} flex items-center justify-center`}
          >
            <FiAlertTriangle
              className={`w-8 h-8 ${isDangerous ? "text-red-500" : "text-yellow-500"}`}
            />
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-300 text-center">{message}</p>

        {/* Ethical Warning for Dangerous Actions */}
        {isDangerous && (
          <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
            <p className="text-red-400 text-sm text-center font-semibold">
              ⚠️ Ensure you have proper authorization before proceeding
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-dark-100 hover:bg-dark-300 text-white rounded-lg transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2 rounded-lg text-white transition-colors ${
              isDangerous
                ? "bg-red-600 hover:bg-red-700"
                : "bg-primary hover:bg-blue-600"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
