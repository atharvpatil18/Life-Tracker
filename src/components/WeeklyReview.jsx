import React, { useState } from 'react';
import { CheckSquare, Plus, BookOpen, Trash2, Calendar, Sparkles, Award } from 'lucide-react';

export default function WeeklyReview({ state, updateState, awardXP }) {
  const { weeklyReviews } = state;
  const [wins, setWins] = useState('');
  const [mistakes, setMistakes] = useState('');
  const [learning, setLearning] = useState('');
  const [improvements, setImprovements] = useState('');

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!wins.trim() || !mistakes.trim()) {
      alert("Please fill out at least achievements and time-wasters fields.");
      return;
    }

    const newReview = {
      id: 'w_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      wins,
      mistakes,
      learning,
      improvements
    };

    updateState(prev => ({
      ...prev,
      weeklyReviews: [newReview, ...prev.weeklyReviews],
      // Add a smart journal entry to log the weekly review automatically
      journal: [
        {
          id: 'j_rev_' + Date.now(),
          content: `Completed Weekly Growth Reflection. Wins: "${wins.substring(0, 100)}...". Action items for next week established.`,
          date: new Date().toISOString().split('T')[0],
          tags: ["reflection"]
        },
        ...prev.journal
      ]
    }));

    setWins('');
    setMistakes('');
    setLearning('');
    setImprovements('');
    awardXP(100, "Completed Weekly Retrospective Review (+100 XP Compass Bonus)");
  };

  const handleRemoveReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this weekly review?")) {
      updateState(prev => ({
        ...prev,
        weeklyReviews: prev.weeklyReviews.filter(r => r.id !== reviewId)
      }));
    }
  };

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckSquare size={28} color="var(--area-academics)" /> Weekly Growth Retrospectives
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Conduct regular structural reflections. Align your priorities, isolate leaks, and maintain 52 yearly reviews.
        </p>
      </div>

      {/* Split view */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* History Ledger */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem' }}>Retrospective History</h3>

          {weeklyReviews.length === 0 ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No weekly reflections logged. Complete the form on the right to compile your first retrospective.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {weeklyReviews.map(rev => (
                <div key={rev.id} className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid var(--area-academics)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--area-academics)' }}>
                      <Calendar size={14} /> WEEKLY REVIEW - {rev.date}
                    </span>
                    <button 
                      onClick={() => handleRemoveReview(rev.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', lineHeight: '1.4', color: 'var(--color-text-secondary)' }}>
                    <p><strong style={{ color: 'var(--color-text-primary)' }}>Achievements & Wins:</strong> {rev.wins}</p>
                    <p><strong style={{ color: 'var(--color-text-primary)' }}>Mistakes & Time-Wasters:</strong> {rev.mistakes}</p>
                    {rev.learning && <p><strong style={{ color: 'var(--color-text-primary)' }}>Lessons Learned:</strong> {rev.learning}</p>}
                    {rev.improvements && <p><strong style={{ color: 'var(--color-text-primary)' }}>Adjustments & Improvements:</strong> {rev.improvements}</p>}
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* Creator Form */}
        <div className="glass-panel" style={{ padding: '24px', height: 'fit-content' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="var(--area-academics)" /> Conduct Review
          </h3>

          <form onSubmit={handleAddReview} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>WHAT DID I ACHIEVE? (WINS)</label>
              <textarea 
                className="cyber-input" 
                rows="2"
                style={{ resize: 'none', fontSize: '0.8rem' }}
                value={wins}
                onChange={(e) => setWins(e.target.value)}
                placeholder="Solved 20 DP questions, completed SIGCHI onboarding..."
              ></textarea>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>WHAT WASTED MY TIME? (MISTAKES)</label>
              <textarea 
                className="cyber-input" 
                rows="2"
                style={{ resize: 'none', fontSize: '0.8rem' }}
                value={mistakes}
                onChange={(e) => setMistakes(e.target.value)}
                placeholder="Scrolled LeetCode discuss forums instead of coding..."
              ></textarea>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>WHAT NEW THING DID I LEARN?</label>
              <textarea 
                className="cyber-input" 
                rows="2"
                style={{ resize: 'none', fontSize: '0.8rem' }}
                value={learning}
                onChange={(e) => setLearning(e.target.value)}
                placeholder="Advanced knapsack optimization models..."
              ></textarea>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>WHAT WILL I DO DIFFERENTLY next week?</label>
              <textarea 
                className="cyber-input" 
                rows="2"
                style={{ resize: 'none', fontSize: '0.8rem' }}
                value={improvements}
                onChange={(e) => setImprovements(e.target.value)}
                placeholder="Use app block templates during morning coding..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="cyber-btn cyber-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }}
            >
              <Sparkles size={16} /> Compile Weekly Review (+100 XP)
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
