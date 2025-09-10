import React from 'react';

const AchievementsPage = () => {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 className="mb-6">Achievements</h1>
      <div className="grid grid-cols-3">
        {[
          { icon: '🏆', name: 'First Course', desc: 'Complete your first course', unlocked: true },
          { icon: '🔥', name: 'Week Streak', desc: 'Learn for 7 days in a row', unlocked: true },
          { icon: '⭐', name: '1000 Points', desc: 'Earn your first 1000 points', unlocked: true },
          { icon: '🎯', name: 'Quiz Master', desc: 'Score 100% on 5 quizzes', unlocked: false },
          { icon: '🚀', name: 'Speed Learner', desc: 'Complete a course in under a week', unlocked: false },
          { icon: '👑', name: 'Top Student', desc: 'Reach #1 on the leaderboard', unlocked: false }
        ].map((achievement, i) => (
          <div key={i} className="card" style={{
            opacity: achievement.unlocked ? 1 : 0.6,
            border: achievement.unlocked ? '2px solid var(--gold)' : '1px solid var(--border-color)'
          }}>
            <div style={{
              fontSize: '3rem',
              textAlign: 'center',
              marginBottom: '1rem',
              filter: achievement.unlocked ? 'none' : 'grayscale(100%)'
            }}>
              {achievement.icon}
            </div>
            <h3 className="card-title text-center">{achievement.name}</h3>
            <p className="card-subtitle text-center">{achievement.desc}</p>
            {achievement.unlocked && (
              <div className="text-center mt-4">
                <span className="badge badge-gold">Unlocked</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
