import React, { useState, useEffect, useCallback } from 'react';
import { usersAPI } from '../services/api';
import '../styles/Users.css'; 
const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
 
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  
  
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await usersAPI.getAll();
      const data = response.data || response;
      setUsers(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error("Failed to load users", err);
      setError("Failed to load users from server");
    } finally {
      setLoading(false);
    }
  };

  
  const applyFilters = useCallback(() => {
    let result = [...users];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(u => 
        u.name?.toLowerCase().includes(term) || 
        u.email?.toLowerCase().includes(term)
      );
    }

    if (filterRole !== 'all') {
      result = result.filter(u => u.role === filterRole);
    }

    setFilteredUsers(result);
  }, [users, searchTerm, filterRole]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await usersAPI.delete(userId);
        loadUsers(); // Refresh list
      } catch (err) {
        alert("Failed to delete user");
      }
    }
  };

  const getStats = () => ({
    total: users.length,
    active: users.filter(u => u.isActive || u.status === 'active').length,
    admins: users.filter(u => u.role === 'admin').length
  });

  const stats = getStats();

  if (loading) return <div className="loading-state">Loading users management...</div>;

  return (
    <div className="users-container">
      <div className="page-header">
        <div>
          <h1>Users Management</h1>
          <p>Displaying {filteredUsers.length} users</p>
        </div>
        <button className="btn-add" onClick={() => setShowModal(true)}>+ New User</button>
      </div>

      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-card">
          <span>Total</span>
          <strong>{stats.total}</strong>
        </div>
        <div className="stat-card">
          <span>Active</span>
          <strong className="text-success">{stats.active}</strong>
        </div>
        <div className="stat-card">
          <span>Admins</span>
          <strong className="text-primary">{stats.admins}</strong>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-controls">
        <input 
          className="search-input"
          type="text" 
          placeholder="Search by name or email..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
        <select className="role-select" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Table */}
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.email}</td>
                  <td><span className="role-tag">{user.role}</span></td>
                  <td>
                    <span className={`status-badge ${user.isActive || user.status === 'active' ? 'active' : 'inactive'}`}>
                      {user.isActive || user.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center">No users match your criteria</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;