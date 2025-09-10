import React from 'react';

const CoursesPage = () => {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 className="mb-6">Available Courses</h1>
      <div className="grid grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="card">
            <div style={{
              width: '100%',
              height: '200px',
              background: 'var(--surface-light)',
              borderRadius: 'var(--border-radius)',
              marginBottom: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem'
            }}>
              📚
            </div>
            <h3 className="card-title">Course {i}</h3>
            <p className="card-subtitle">Learn exciting new skills in this comprehensive course.</p>
            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="badge badge-primary">Beginner</span>
              <button className="btn btn-primary btn-sm">Enroll</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
