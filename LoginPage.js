import React from 'react';

const LoginPage = () => {
  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: '400px' }}>
      <div className="card">
        <h2 className="text-center mb-6">Login</h2>
        <form>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Login
          </button>
        </form>
        <p className="text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
          Don't have an account? <a href="/register" style={{ color: 'var(--primary-color)' }}>Register</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
