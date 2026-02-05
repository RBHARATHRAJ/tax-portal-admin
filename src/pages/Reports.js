import React from 'react';
import '../styles/Reports.css';

const Reports = () => {
  const reports = [
    { name: 'Monthly Tax Summary', type: 'PDF', date: '2026-02-01', size: '2.4 MB' },
    { name: 'User Activity Report', type: 'Excel', date: '2026-01-28', size: '1.8 MB' },
    { name: 'Revenue Analysis', type: 'PDF', date: '2026-01-25', size: '3.1 MB' },
    { name: 'Compliance Report', type: 'PDF', date: '2026-01-20', size: '4.2 MB' },
  ];

  return (
    <div className="reports-page">
      <div className="page-header">
        <h2 className="page-heading">Reports & Analytics</h2>
        <button className="btn-primary">+ Generate Report</button>
      </div>

      <div className="reports-grid">
        <div className="report-card">
          <h3>📊 Quick Statistics</h3>
          <div className="quick-stats">
            <div className="quick-stat-item">
              <span className="quick-stat-label">Total Returns Filed</span>
              <span className="quick-stat-value">856</span>
            </div>
            <div className="quick-stat-item">
              <span className="quick-stat-label">Total Revenue</span>
              <span className="quick-stat-value">$125,000</span>
            </div>
            <div className="quick-stat-item">
              <span className="quick-stat-label">Active Users</span>
              <span className="quick-stat-value">1,234</span>
            </div>
            <div className="quick-stat-item">
              <span className="quick-stat-label">Avg Processing Time</span>
              <span className="quick-stat-value">2.5 days</span>
            </div>
          </div>
        </div>

        <div className="report-card">
          <h3>📈 Performance Metrics</h3>
          <div className="metrics-chart">
            <div className="metric-row">
              <span className="metric-label">Approval Rate</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '92%', backgroundColor: '#4CAF50' }}></div>
              </div>
              <span className="metric-value">92%</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">User Satisfaction</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '87%', backgroundColor: '#2196F3' }}></div>
              </div>
              <span className="metric-value">87%</span>
            </div>
            <div className="metric-row">
              <span className="metric-label">System Uptime</span>
              <div className="metric-bar">
                <div className="metric-fill" style={{ width: '99%', backgroundColor: '#9C27B0' }}></div>
              </div>
              <span className="metric-value">99%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="table-card">
        <h3>Generated Reports</h3>
        <table className="data-table">
          <thead>
            <tr>
              <th>Report Name</th>
              <th>Type</th>
              <th>Generated Date</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td><strong>{report.name}</strong></td>
                <td>
                  <span className={`type-badge type-${report.type.toLowerCase()}`}>
                    {report.type}
                  </span>
                </td>
                <td>{report.date}</td>
                <td>{report.size}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" title="Download">⬇️</button>
                    <button className="btn-icon" title="Share">📤</button>
                    <button className="btn-icon" title="Delete">🗑️</button>
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

export default Reports;