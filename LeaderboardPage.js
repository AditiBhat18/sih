import React from 'react';

const LeaderboardPage = () => {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 className="mb-6">Leaderboard</h1>
      <div className="card">
        <h3 className="card-title">Top Learners</h3>
        <div style={{ marginTop: '1.5rem' }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem',
              background: i <= 3 ? 'var(--surface-light)' : 'transparent',
              borderRadius: 'var(--border-radius)',
              marginBottom: '0.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  background: i === 1 ? 'var(--gold)' : i === 2 ? 'var(--silver)' : i === 3 ? 'var(--bronze)' : 'var(--surface-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  color: i <= 3 ? 'var(--background)' : 'var(--text-primary)'
                }}>
                  {i}
                </div>
                <div>
                  <div style={{ fontWeight: '600' }}>Student {i}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Level {10 - i}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '700', color: 'var(--primary-color)' }}>{5000 - (i * 500)} pts</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{20 - i} streak</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
