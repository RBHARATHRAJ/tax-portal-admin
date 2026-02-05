import React, { useState, useEffect } from 'react';
import { companiesAPI } from '../services/api'; 
import '../styles/Companies.css';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  
  
  const [formData, setFormData] = useState({
    companyName: '',
    gstNumber: '',
    email: '',
    phone: '',
    address: '',
    status: 'active' 
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const res = await companiesAPI.getAll();
      
      setCompanies(res.data || res); 
      setError('');
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('Failed to load companies');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenAddModal = () => {
    setEditingCompany(null);
    setFormData({
      companyName: '',
      gstNumber: '',
      email: '',
      phone: '',
      address: '',
      status: 'active'
    });
    setShowModal(true);
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
    setFormData({
      companyName: company.companyName,
      gstNumber: company.gstNumber,
      email: company.email,
      phone: company.phone || '',
      address: company.address || '',
      status: company.status || (company.isActive ? 'active' : 'inactive')
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCompany) {
        const updated = await companiesAPI.update(editingCompany._id, formData);
        setCompanies(companies.map(c => c._id === editingCompany._id ? (updated.data || updated) : c));
      } else {
        const created = await companiesAPI.create(formData);
        setCompanies([...companies, (created.data || created)]);
      }
      setShowModal(false);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save company');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await companiesAPI.delete(id);
        setCompanies(companies.filter(c => c._id !== id));
      } catch (err) {
        setError('Failed to delete company');
      }
    }
  };

  if (loading) return (
    <div className="companies-container">
      <div className="loading-spinner">Loading companies...</div>
    </div>
  );

  return (
    <div className="companies-container">
      <div className="companies-header">
        <div>
          <h1>Companies Management</h1>
          <p>View and manage all registered business entities</p>
        </div>
        <button className="add-btn" onClick={handleOpenAddModal}>
          + Add Company
        </button>
      </div>

      {error && <div className="error-banner">{error} <button onClick={() => setError('')}>×</button></div>}

      <div className="table-responsive">
        <table className="companies-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>GST / Tax ID</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.length === 0 ? (
              <tr><td colSpan="5" className="no-data">No companies found</td></tr>
            ) : (
              companies.map((company) => (
                <tr key={company._id}>
                  <td>
                    <div className="company-cell">
                      <div className="avatar-mini">{company.companyName.charAt(0)}</div>
                      {company.companyName}
                    </div>
                  </td>
                  <td>{company.gstNumber}</td>
                  <td>{company.email}</td>
                  <td>
                    <span className={`badge ${company.status || (company.isActive ? 'active' : 'inactive')}`}>
                      {company.status || (company.isActive ? 'Active' : 'Inactive')}
                    </span>
                  </td>
                  <td>
                    <div className="action-group">
                      <button onClick={() => handleEditCompany(company)} className="btn-edit">Edit</button>
                      <button onClick={() => handleDelete(company._id)} className="btn-delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>{editingCompany ? 'Edit Company' : 'Add New Company'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Company Name</label>
                  <input name="companyName" value={formData.companyName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>GST Number</label>
                  <input name="gstNumber" value={formData.gstNumber} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <select name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn-submit">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;