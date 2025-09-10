import React from 'react';

const DashboardPage = () => {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 className="mb-6">Dashboard</h1>
      <div className="grid grid-cols-2">
        <div className="card">
          <h3 className="card-title">My Progress</h3>
          <p className="card-subtitle">Track your learning progress and achievements.</p>
          <div style={{ marginTop: '1rem' }}>
            <div style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Overall Progress</div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>65% Complete</div>
          </div>
        </div>
        
        <div className="card">
          <h3 className="card-title">Quick Stats</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
            <div className="text-center">
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-color)' }}>1,250</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Points</div>
            </div>
            <div className="text-center">
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--secondary-color)' }}>5</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Courses</div>
            </div>
            <div className="text-center">
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--warning-color)' }}>12</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Achievements</div>
            </div>
            <div className="text-center">
              <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--danger-color)' }}>7</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Day Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
