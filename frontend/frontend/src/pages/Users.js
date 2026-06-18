import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaUserShield, FaUser, FaEye } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../services/api";
import Modal from "../components/Modal";
import ConfirmationModal from "../components/ConfirmationModal";
import PageTransition from "../components/PageTransition";

const roleConfig = {
  admin: { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.2)", icon: FaUserShield },
  operator: { color: "#00d4ff", bg: "rgba(0,212,255,0.08)", border: "rgba(0,212,255,0.2)", icon: FaUser },
  viewer: { color: "#34d399", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.2)", icon: FaEye },
};

const inputCls = "w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all";
const inputSt = { background: "rgba(7,9,15,0.8)", border: "1px solid rgba(255,255,255,0.06)" };
const inputFocus = { border: "1px solid rgba(0,212,255,0.4)", boxShadow: "0 0 0 3px rgba(0,212,255,0.06)" };
const inputBlur = { border: "1px solid rgba(255,255,255,0.06)", boxShadow: "none" };

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "", email: "", password: "", role: "operator", isActive: true,
  });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      setUsers(response.data.data.users);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        const updateData = { ...formData };
        if (!updateData.password) delete updateData.password;
        await api.put(`/users/${selectedUser._id}`, updateData);
        toast.success("User updated successfully");
      } else {
        await api.post("/users", formData);
        toast.success("User created successfully");
      }
      setShowModal(false);
      resetForm();
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({ username: user.username, email: user.email, password: "", role: user.role, isActive: user.isActive });
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/users/${selectedUser._id}`);
      toast.success("User deleted successfully");
      setShowDeleteModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  const resetForm = () => {
    setFormData({ username: "", email: "", password: "", role: "operator", isActive: true });
    setSelectedUser(null);
  };

  const openCreateModal = () => { resetForm(); setShowModal(true); };

  return (
    <PageTransition className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <FiUsers className="w-6 h-6 text-primary" />
            <span>User Management</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">Manage system users and permissions</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={openCreateModal}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white"
          style={{ background: "linear-gradient(135deg, #00d4ff, #0ea5e9)", boxShadow: "0 0 20px rgba(0,212,255,0.25)" }}
        >
          <FaPlus className="w-3.5 h-3.5" />
          <span>Add User</span>
        </motion.button>
      </div>

      {/* Users Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "rgba(13,17,26,0.7)", border: "1px solid rgba(0,212,255,0.08)" }}
      >
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-10 h-10 mx-auto mb-3 rounded-full border-2 border-slate-700 border-t-primary animate-spin" />
            <p className="text-slate-500 text-sm">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-sm">No users found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  {["User", "Email", "Role", "Status", "Last Login", "Actions"].map((h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-3 text-[10px] font-semibold text-slate-600 uppercase tracking-widest ${i === 5 ? "text-right" : "text-left"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {users.map((user, i) => {
                    const rc = roleConfig[user.role] || roleConfig.operator;
                    const RoleIcon = rc.icon;
                    return (
                      <motion.tr
                        key={user._id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: i * 0.04 }}
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
                        onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,212,255,0.02)"}
                        onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: rc.bg, border: `1px solid ${rc.border}` }}>
                              <RoleIcon style={{ color: rc.color, fontSize: "13px" }} />
                            </div>
                            <span className="text-sm font-medium text-white">{user.username}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3.5 text-sm text-slate-400 font-mono text-xs">{user.email}</td>
                        <td className="px-5 py-3.5">
                          <span
                            className="px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize font-mono"
                            style={{ color: rc.color, background: rc.bg, border: `1px solid ${rc.border}` }}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                            style={{
                              color: user.isActive ? "#34d399" : "#f87171",
                              background: user.isActive ? "rgba(52,211,153,0.08)" : "rgba(248,113,113,0.08)",
                              border: user.isActive ? "1px solid rgba(52,211,153,0.2)" : "1px solid rgba(248,113,113,0.2)",
                            }}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-xs text-slate-500 font-mono">
                          {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex justify-end space-x-1">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEdit(user)}
                              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                              style={{ color: "#00d4ff" }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(0,212,255,0.1)"}
                              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                            >
                              <FaEdit className="w-3.5 h-3.5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => { setSelectedUser(user); setShowDeleteModal(true); }}
                              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
                              style={{ color: "#f87171" }}
                              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(248,113,113,0.1)"}
                              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                            >
                              <FaTrash className="w-3.5 h-3.5" />
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => { setShowModal(false); resetForm(); }}
        title={selectedUser ? "Edit User" : "Create New User"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Username", name: "username", type: "text", placeholder: "Enter username", required: true },
            { label: "Email", name: "email", type: "email", placeholder: "Enter email", required: true },
            { label: `Password${selectedUser ? " (leave blank to keep current)" : ""}`, name: "password", type: "password", placeholder: selectedUser ? "Enter new password" : "Enter password", required: !selectedUser },
          ].map(({ label, name, type, placeholder, required }) => (
            <div key={name} className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleInputChange}
                required={required}
                placeholder={placeholder}
                className={inputCls}
                style={inputSt}
                onFocus={(e) => Object.assign(e.target.style, inputFocus)}
                onBlur={(e) => Object.assign(e.target.style, inputBlur)}
              />
            </div>
          ))}

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className={inputCls + " cursor-pointer"}
              style={inputSt}
            >
              <option value="admin">Admin — Full access</option>
              <option value="operator">Operator — Can perform attacks</option>
              <option value="viewer">Viewer — Read-only access</option>
            </select>
          </div>

          <label className="flex items-center space-x-2.5 cursor-pointer group">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="w-4 h-4 rounded accent-primary"
            />
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Active account</span>
          </label>

          <div className="flex space-x-3 pt-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setShowModal(false); resetForm(); }}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-slate-300"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, #00d4ff, #0ea5e9)", boxShadow: "0 0 20px rgba(0,212,255,0.2)" }}
            >
              {selectedUser ? "Update User" : "Create User"}
            </motion.button>
          </div>
        </form>
      </Modal>

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => { setShowDeleteModal(false); setSelectedUser(null); }}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete user "${selectedUser?.username}"? This action cannot be undone.`}
        confirmText="Delete"
        isDangerous
      />
    </PageTransition>
  );
};

export default Users;
