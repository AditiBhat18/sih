import React from 'react';

const RegisterPage = () => {
  return (
    <div className="container" style={{ padding: '2rem 0', maxWidth: '400px' }}>
      <div className="card">
        <h2 className="text-center mb-6">Register</h2>
        <form>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="Enter your full name" />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="Choose a password" />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select className="form-input">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Register
          </button>
        </form>
        <p className="text-center mt-4" style={{ color: 'var(--text-secondary)' }}>
          Already have an account? <a href="/login" style={{ color: 'var(--primary-color)' }}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
