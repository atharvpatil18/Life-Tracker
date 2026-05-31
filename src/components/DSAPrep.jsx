import React, { useState, useEffect } from 'react';
import { Code2, Award, Sparkles, Plus, RefreshCw, BarChart2, BookOpen } from 'lucide-react';

export default function DSAPrep({ state, updateState, awardXP }) {
  const { solvedCount, solvedEasy, solvedMedium, solvedHard, topicMastery, contestRating, interviewReadiness } = state.dsaMetrics;
  const lcUsername = state.settings.leetcodeUsername;
  
  const [loadingLc, setLoadingLc] = useState(false);
  const [logTopic, setLogTopic] = useState('Arrays & Strings');
  const [logDiff, setLogDiff] = useState('Medium');

  useEffect(() => {
    if (lcUsername) {
      fetchLeetCodeStats(lcUsername);
    }
  }, [lcUsername]);

  const fetchLeetCodeStats = async (username) => {
    setLoadingLc(true);
    try {
      const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/api/${username}`);
      if (res.ok) {
        const data = await res.json();
        if (data.matchedUser) {
          const total = data.submitStats.acSubmissionNum[0].count;
          const easy = data.submitStats.acSubmissionNum[1].count;
          const medium = data.submitStats.acSubmissionNum[2].count;
          const hard = data.submitStats.acSubmissionNum[3].count;
          
          updateState(prev => ({
            ...prev,
            dsaMetrics: {
              ...prev.dsaMetrics,
              solvedCount: total,
              solvedEasy: easy,
              solvedMedium: medium,
              solvedHard: hard,
              interviewReadiness: Math.min(Math.round((total / 400) * 100), 100)
            }
          }));
        }
      }
    } catch (e) {
      console.error("Error fetching LeetCode metrics", e);
    } finally {
      setLoadingLc(false);
    }
  };

  const handleManualLogQuestion = () => {
    updateState(prev => {
      let e = prev.dsaMetrics.solvedEasy;
      let m = prev.dsaMetrics.solvedMedium;
      let h = prev.dsaMetrics.solvedHard;

      if (logDiff === 'Easy') e += 1;
      else if (logDiff === 'Medium') m += 1;
      else h += 1;

      const total = e + m + h;
      
      // Update topic mastery slightly
      const currentMastery = prev.dsaMetrics.topicMastery[logTopic] || 50;
      const updatedTopicMastery = {
        ...prev.dsaMetrics.topicMastery,
        [logTopic]: Math.min(currentMastery + 4, 100)
      };

      return {
        ...prev,
        dsaMetrics: {
          ...prev.dsaMetrics,
          solvedCount: total,
          solvedEasy: e,
          solvedMedium: m,
          solvedHard: h,
          topicMastery: updatedTopicMastery,
          interviewReadiness: Math.min(Math.round((total / 450) * 100), 100)
        }
      };
    });

    awardXP(5, `Solved LeetCode ${logDiff} Question in ${logTopic}`);
  };

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code2 size={28} color="var(--area-dsa)" /> DSA Prep & Problem Solving
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Track algorithm topic masteries, monitor contest rating shifts, and synchronize solved profiles.
          </p>
        </div>
      </div>

      {/* Main stats layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '24px' }}>
        
        {/* Left Side: Stats and manual logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* LeetCode count display */}
          <div className="glass-panel glass-card-glow-dsa" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em' }}>LEETCODE PROBLEMS SOLVED</span>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--area-dsa)', fontFamily: 'var(--font-display)', margin: '4px 0' }}>
                  {solvedCount} <span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Questions</span>
                </div>
              </div>

              {lcUsername && (
                <button 
                  onClick={() => fetchLeetCodeStats(lcUsername)}
                  disabled={loadingLc}
                  className="cyber-btn"
                  style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                >
                  {loadingLc ? <RefreshCw size={14} className="animate-float" /> : <RefreshCw size={14} />} Sync API
                </button>
              )}
            </div>

            {/* Distribution */}
            <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
              <div style={{ flex: 1, padding: '10px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', block: 'true' }}>EASY</span>
                <strong style={{ color: '#10b981', fontSize: '1.25rem' }}>{solvedEasy}</strong>
              </div>
              
              <div style={{ flex: 1, padding: '10px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', block: 'true' }}>MEDIUM</span>
                <strong style={{ color: '#3b82f6', fontSize: '1.25rem' }}>{solvedMedium}</strong>
              </div>

              <div style={{ flex: 1, padding: '10px', background: 'rgba(244, 63, 94, 0.05)', borderRadius: '8px', border: '1px solid rgba(244, 63, 94, 0.1)' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', block: 'true' }}>HARD</span>
                <strong style={{ color: '#f43f5e', fontSize: '1.25rem' }}>{solvedHard}</strong>
              </div>
            </div>
          </div>

          {/* Quick manual logging */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={20} color="var(--area-dsa)" /> Log Solved Question
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>TOPIC CORE</label>
                <select 
                  className="cyber-select" 
                  value={logTopic} 
                  onChange={(e) => setLogTopic(e.target.value)}
                >
                  {Object.keys(topicMastery).map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>DIFFICULTY</label>
                <select 
                  className="cyber-select" 
                  value={logDiff} 
                  onChange={(e) => setLogDiff(e.target.value)}
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleManualLogQuestion}
              className="cyber-btn cyber-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }}
            >
              Log Question Completion (+5 XP)
            </button>
          </div>

        </div>

        {/* Right Side: Topic Mastery details */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={20} color="var(--area-dsa)" /> Algorithmic Topic Mastery
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(topicMastery).map(([topic, mastery]) => (
              <div key={topic}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600 }}>{topic}</span>
                  <span style={{ color: 'var(--area-dsa)', fontWeight: 700 }}>{mastery}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden' }}>
                  <div style={{ width: `${mastery}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)', borderRadius: '999px' }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Readiness gauges */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '8px' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>INTERVIEW READINESS</span>
              <strong style={{ fontSize: '1.25rem', display: 'block', color: 'var(--area-academics)' }}>{interviewReadiness}% Rating</strong>
            </div>
            
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>CONTEST CONTEST RATING</span>
              <strong style={{ fontSize: '1.25rem', display: 'block', color: 'var(--area-leadership)' }}>{contestRating} Rating</strong>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
