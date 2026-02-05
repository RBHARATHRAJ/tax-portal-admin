import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/apiService';
import '../styles/Dashboard.css';


const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all dashboard data
      const [statsData, activityData, revenue] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getActivity(),
        dashboardAPI.getRevenue()
      ]);

      setStats(statsData);
      setActivities(activityData);
      setRevenueData(revenue);
      setError('');
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading">
          <div className="spinner-large"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-state">
          <p>{error}</p>
          <button onClick={fetchDashboardData}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Users</p>
            <h2 className="stat-value">{stats?.totalUsers?.toLocaleString() || 0}</h2>
            <p className={`stat-change ${stats?.userGrowth?.startsWith('+') ? 'positive' : 'negative'}`}>
              {stats?.userGrowth || '0%'} from last month
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Tax Returns</p>
            <h2 className="stat-value">{stats?.totalTaxReturns?.toLocaleString() || 0}</h2>
            <p className={`stat-change ${stats?.taxReturnGrowth?.startsWith('+') ? 'positive' : 'negative'}`}>
              {stats?.taxReturnGrowth || '0%'} from last month
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Pending Reviews</p>
            <h2 className="stat-value">{stats?.pendingReviews?.toLocaleString() || 0}</h2>
            <p className={`stat-change ${stats?.pendingGrowth?.startsWith('-') ? 'positive' : 'negative'}`}>
              {stats?.pendingGrowth || '0%'} from last month
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <div className="stat-content">
            <p className="stat-label">Revenue</p>
            <h2 className="stat-value">${(stats?.revenue / 1000)?.toFixed(0) || 0}K</h2>
            <p className={`stat-change ${stats?.revenueGrowth?.startsWith('+') ? 'positive' : 'negative'}`}>
              {stats?.revenueGrowth || '0%'} from last month
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Revenue Chart */}
        <div className="chart-card">
          <h3>Monthly Revenue</h3>
          <div className="chart-container">
            <div className="bar-chart">
              {revenueData.map((data, index) => {
                const maxRevenue = Math.max(...revenueData.map(d => d.amount));
                const height = (data.amount / maxRevenue) * 100;
                
                return (
                  <div key={index} className="bar-group">
                    <div className="bar-wrapper">
                      <div 
                        className="bar" 
                        style={{ 
                          height: `${height}%`,
                          background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)'
                        }}
                      >
                        <span className="bar-value">${(data.amount / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                    <span className="bar-label">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="activity-card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {activities.length === 0 ? (
              <p className="no-activity">No recent activity</p>
            ) : (
              activities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-avatar">
                    {activity.user.charAt(0).toUpperCase()}
                  </div>
                  <div className="activity-details">
                    <p className="activity-user">{activity.user}</p>
                    <p className="activity-action">{activity.action}</p>
                  </div>
                  <span className="activity-time">{activity.timestamp}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;