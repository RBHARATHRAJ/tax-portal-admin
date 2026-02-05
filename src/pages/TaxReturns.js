import React, { useState } from 'react';
import '../styles/TaxReturns.css';

const TaxReturns = () => {
  const [returns] = useState([
    { id: 'TR-001', taxpayer: 'John Doe', year: '2025', amount: '$12,500', status: 'Approved', date: '2026-01-15' },
    { id: 'TR-002', taxpayer: 'Jane Smith', year: '2025', amount: '$18,200', status: 'Pending', date: '2026-01-20' },
    { id: 'TR-003', taxpayer: 'Mike Johnson', year: '2025', amount: '$9,800', status: 'Under Review', date: '2026-01-25' },
    { id: 'TR-004', taxpayer: 'Sarah Williams', year: '2025', amount: '$22,100', status: 'Approved', date: '2026-01-28' },
    { id: 'TR-005', taxpayer: 'Tom Brown', year: '2025', amount: '$15,750', status: 'Rejected', date: '2026-02-01' },
  ]);

  return (
    <div className="tax-returns-page">
      <div className="page-header">
        <h2 className="page-heading">Tax Returns</h2>
        <button className="btn-primary">+ New Tax Return</button>
      </div>

      <div className="stats-mini">
        <div className="stat-mini">
          <span className="stat-mini-label">Total Returns</span>
          <span className="stat-mini-value">856</span>
        </div>
        <div className="stat-mini">
          <span className="stat-mini-label">Pending</span>
          <span className="stat-mini-value">42</span>
        </div>
        <div className="stat-mini">
          <span className="stat-mini-label">Approved</span>
          <span className="stat-mini-value">780</span>
        </div>
        <div className="stat-mini">
          <span className="stat-mini-label">Rejected</span>
          <span className="stat-mini-value">34</span>
        </div>
      </div>

      <div className="table-card">
        <div className="table-filters">
          <input type="text" placeholder="Search returns..." className="search-input" />
          <select className="filter-select">
            <option>All Years</option>
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
          <select className="filter-select">
            <option>All Status</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Under Review</option>
            <option>Rejected</option>
          </select>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Return ID</th>
              <th>Taxpayer</th>
              <th>Year</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((taxReturn) => (
              <tr key={taxReturn.id}>
                <td><strong>{taxReturn.id}</strong></td>
                <td>{taxReturn.taxpayer}</td>
                <td>{taxReturn.year}</td>
                <td><strong>{taxReturn.amount}</strong></td>
                <td>
                  <span className={`status-badge status-${taxReturn.status.toLowerCase().replace(' ', '-')}`}>
                    {taxReturn.status}
                  </span>
                </td>
                <td>{taxReturn.date}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="View">👁️</button>
                    <button className="btn-icon" title="Download">⬇️</button>
                    <button className="btn-icon" title="Edit">✏️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaxReturns;