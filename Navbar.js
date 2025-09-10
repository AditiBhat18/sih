import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  // This would come from AuthContext in a real implementation
  const isAuthenticated = false;
  const user = null;

  const handleLogout = () => {
    // Logout logic would go here
    navigate('/');
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      background: 'var(--surface)',
      borderBottom: '1px solid var(--border-color)',
      zIndex: 1000,
      padding: '0 1rem',
      height: '4rem'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'var(--text-primary)',
          fontSize: '1.5rem',
          fontWeight: '700'
        }}>
          🎓 EduGamify
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/courses" style={{
            textDecoration: 'none',
            color: 'var(--text-secondary)',
            fontWeight: '500',
            transition: 'color 0.2s'
          }}>
            Courses
          </Link>
          
          <Link to="/leaderboard" style={{
            textDecoration: 'none',
            color: 'var(--text-secondary)',
            fontWeight: '500',
            transition: 'color 0.2s'
          }}>
            Leaderboard
          </Link>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* User stats */}
              {user && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: 'var(--surface-light)',
                  borderRadius: 'var(--border-radius)',
                  fontSize: '0.875rem'
                }}>
                  <span>⭐ {user.totalPoints || 0}</span>
                  <span>🔥 {user.streak || 0}</span>
                  <span>Lv.{user.level || 1}</span>
                </div>
              )}
              
              <Link to="/dashboard" className="btn btn-primary btn-sm">
                Dashboard
              </Link>
              
              <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                Logout
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
