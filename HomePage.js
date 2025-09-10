import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{
        padding: '6rem 0 4rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, var(--background) 0%, var(--surface) 100%)'
      }}>
        <div className="container">
          <h1 className="text-gradient mb-6">
            Learn, Achieve, Excel
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: '1.6'
          }}>
            Transform your learning journey with our gamified education platform. 
            Earn points, unlock achievements, and compete with peers while mastering new skills.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-primary btn-lg">
              Start Learning
            </Link>
            <Link to="/courses" className="btn btn-secondary btn-lg">
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 className="text-center mb-8">Why Choose Our Platform?</h2>
          <div className="grid grid-cols-3">
            <div className="card text-center">
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>🎮</div>
              <h3 className="card-title">Gamified Learning</h3>
              <p className="card-subtitle">
                Earn points, unlock badges, and level up as you progress through courses.
              </p>
            </div>

            <div className="card text-center">
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>📊</div>
              <h3 className="card-title">Progress Tracking</h3>
              <p className="card-subtitle">
                Monitor your learning journey with detailed analytics and progress visualization.
              </p>
            </div>

            <div className="card text-center">
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>🏆</div>
              <h3 className="card-title">Leaderboards</h3>
              <p className="card-subtitle">
                Compete with peers and climb the rankings to become the top learner.
              </p>
            </div>

            <div className="card text-center">
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>🎯</div>
              <h3 className="card-title">Achievement System</h3>
              <p className="card-subtitle">
                Unlock special achievements and badges for reaching learning milestones.
              </p>
            </div>

            <div className="card text-center">
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>🔥</div>
              <h3 className="card-title">Streak Rewards</h3>
              <p className="card-subtitle">
                Maintain your learning streak and earn bonus points for consistency.
              </p>
            </div>

            <div className="card text-center">
              <div style={{
                fontSize: '3rem',
                marginBottom: '1rem'
              }}>👥</div>
              <h3 className="card-title">Social Learning</h3>
              <p className="card-subtitle">
                Connect with fellow learners and join study groups for collaborative learning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '4rem 0',
        background: 'var(--surface)',
        borderTop: '1px solid var(--border-color)'
      }}>
        <div className="container">
          <h2 className="text-center mb-8">Platform Statistics</h2>
          <div className="grid grid-cols-4">
            <div className="text-center">
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--primary-color)',
                marginBottom: '0.5rem'
              }}>10,000+</div>
              <p style={{ color: 'var(--text-secondary)' }}>Students Enrolled</p>
            </div>

            <div className="text-center">
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--secondary-color)',
                marginBottom: '0.5rem'
              }}>500+</div>
              <p style={{ color: 'var(--text-secondary)' }}>Courses Available</p>
            </div>

            <div className="text-center">
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--accent-color)',
                marginBottom: '0.5rem'
              }}>50,000+</div>
              <p style={{ color: 'var(--text-secondary)' }}>Achievements Unlocked</p>
            </div>

            <div className="text-center">
              <div style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--warning-color)',
                marginBottom: '0.5rem'
              }}>95%</div>
              <p style={{ color: 'var(--text-secondary)' }}>Completion Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 0',
        textAlign: 'center',
        background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%)'
      }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>
            Ready to Start Your Learning Journey?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '2rem',
            maxWidth: '500px',
            margin: '0 auto 2rem'
          }}>
            Join thousands of learners who are already advancing their careers through our gamified platform.
          </p>
          <Link to="/register" className="btn btn-secondary btn-lg" style={{
            background: 'white',
            color: 'var(--primary-color)'
          }}>
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
