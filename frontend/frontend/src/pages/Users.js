import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaUserShield,
  FaUser,
  FaEye,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../services/api";
import Modal from "../components/Modal";
import ConfirmationModal from "../components/ConfirmationModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "operator",
    isActive: true,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

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
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedUser) {
        // Update user
        const updateData = { ...formData };
        if (!updateData.password) delete updateData.password;

        await api.put(`/users/${selectedUser._id}`, updateData);
        toast.success("User updated successfully");
      } else {
        // Create new user
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
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
      isActive: user.isActive,
    });
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
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "operator",
      isActive: true,
    });
    setSelectedUser(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "admin":
        return <FaUserShield className="text-red-500" />;
      case "operator":
        return <FaUser className="text-blue-500" />;
      case "viewer":
        return <FaEye className="text-green-500" />;
      default:
        return <FaUser className="text-gray-500" />;
    }
  };

  const getRoleBadge = (role) => {
    const colors = {
      admin: "bg-red-500/20 text-red-400 border-red-500/30",
      operator: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      viewer: "bg-green-500/20 text-green-400 border-green-500/30",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${colors[role]}`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            User Management
          </h1>
          <p className="text-gray-400">Manage system users and permissions</p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <FaPlus /> Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-dark-200 border border-gray-700 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-100 border-b border-gray-700">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-dark-100/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {getRoleIcon(user.role)}
                        <span className="text-white font-medium">
                          {user.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.isActive
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                      {user.lastLogin
                        ? new Date(user.lastLogin).toLocaleString()
                        : "Never"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                          title="Edit user"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowDeleteModal(true);
                          }}
                          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                          title="Delete user"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={selectedUser ? "Edit User" : "Create New User"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password {selectedUser && "(leave blank to keep current)"}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required={!selectedUser}
              className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder={
                selectedUser ? "Enter new password" : "Enter password"
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-dark-100 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
            >
              <option value="admin">Admin - Full access</option>
              <option value="operator">Operator - Can perform attacks</option>
              <option value="viewer">Viewer - Read-only access</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
              className="w-4 h-4 rounded bg-dark-100 border-gray-600 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="isActive" className="text-sm text-gray-300">
              Active account
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              {selectedUser ? "Update User" : "Create User"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete user "${selectedUser?.username}"? This action cannot be undone.`}
        confirmText="Delete"
        confirmClassName="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
};

export default Users;
