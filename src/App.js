import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './styles/App.css';


import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Companies from './pages/Companies';
import TaxReturns from './pages/TaxReturns';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Session restoration failed:', error);
        localStorage.removeItem('currentUser');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken'); // Clear token as well
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  if (loading) {
    return <div className="loader-container">Initializing System...</div>;
  }

  return (
    
      <Routes>
        
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
        />

        
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <div className="app-layout">
                <Sidebar 
                  collapsed={sidebarCollapsed} 
                  onToggle={toggleSidebar} 
                />
                
                <div className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}>
                  <Header 
                    currentUser={currentUser} 
                    onLogout={handleLogout} 
                    onToggleSidebar={toggleSidebar} 
                  />
                  
                  <main className="page-content">
                    {/* Nested Page Routes from Snippet 2 */}
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/users" element={<Users />} />
                      <Route path="/companies" element={<Companies />} />
                      <Route path="/tax-returns" element={<TaxReturns />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/settings" element={<Settings currentUser={currentUser} />} />
                      
                      {/* Fallback for authenticated users */}
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </main>
                </div>
              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    
  );
}

export default App;