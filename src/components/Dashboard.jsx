import React from 'react';
import { Flame, Target, TrendingUp, Sparkles, AlertCircle, ArrowUpRight, Award, BrainCircuit, GraduationCap } from 'lucide-react';

export default function Dashboard({ state, awardXP, updateState, setActiveTab }) {
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const academicsScore = state.academicMetrics.cgpa * 10;
  const dsaScore = Math.min((state.dsaMetrics.solvedCount / 300) * 100, 100);
  const careerScore = state.careerMetrics.resumeScore;
  const leadershipScore = state.leadershipMetrics.score;
  const researchScore = Math.min((state.aimlMetrics.papersReadCount * 3 + state.aimlMetrics.modelsBuilt * 10), 100);
  
  const todayStr = new Date().toISOString().split('T')[0];
  const dailyHabits = state.habits.filter(h => h.frequency === 'daily');
  const completedToday = dailyHabits.filter(h => {
    const logs = state.habitLogs[h.id] || {};
    return logs[todayStr] === true || h.lastLogged === todayStr;
  }).length;
  
  const habitsScore = dailyHabits.length > 0 ? (completedToday / dailyHabits.length) * 100 : 100;

  const rawLifeScore = (
    academicsScore * 0.25 + 
    dsaScore * 0.25 + 
    researchScore * 0.15 + 
    careerScore * 0.15 + 
    leadershipScore * 0.10 + 
    habitsScore * 0.10
  );
  const lifeScore = Math.round(rawLifeScore);

  const resumeSectionCheckedCount = 4;
  const rqs = Math.min(state.careerMetrics.resumeScore + resumeSectionCheckedCount * 2, 100);
  const sps = Math.min((state.dsaMetrics.solvedCount / 350) * 50 + state.dsaMetrics.interviewReadiness * 0.5, 100);
  const pri = Math.round(0.40 * rqs + 0.60 * sps);

  const codingHabit = state.habits.find(h => h.id === 'h1') || { streak: 17 };
  const exerciseHabit = state.habits.find(h => h.id === 'h2') || { streak: 8 };
  const journalHabit = state.habits.find(h => h.id === 'h6') || { streak: 12 };

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (lifeScore / 100) * circumference;

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Welcome Greeting Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.25rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {getGreeting()}, <span style={{ background: 'linear-gradient(135deg, #c2410c 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Atharv</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
            Welcome back. AtharvOS is active. 14 critical nodes are functioning optimally.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="glass-panel" style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <TrendingUp size={16} color="var(--area-academics)" />
            <span>Growth Trend: <strong style={{ color: 'var(--area-academics)' }}>+6% WoW</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid: Life Score & Today's Focus */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Dynamic Life Score Radial Gauge */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ position: 'relative', width: '150px', height: '150px', flexShrink: 0 }}>
            {/* SVG Circle Gauge */}
            <svg style={{ transform: 'rotate(-90deg)', width: '150px', height: '150px' }}>
              <circle
                cx="75" cy="75" r={radius}
                fill="transparent"
                stroke="rgba(0,0,0,0.03)"
                strokeWidth="12"
              />
              <circle
                cx="75" cy="75" r={radius}
                fill="transparent"
                stroke="url(#lifeScoreGradient)"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
              />
              <defs>
                <linearGradient id="lifeScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--area-dsa)" />
                  <stop offset="100%" stopColor="var(--area-research)" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 900, lineHeight: '1', color: 'var(--color-text-primary)' }}>{lifeScore}</span>
              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em', marginTop: '4px' }}>LIFE SCORE</span>
            </div>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '8px', color: 'var(--color-text-primary)' }}>
              Overall Life Integration
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
              Your Life Score is a weighted composite measuring academic health, competitive DSA metrics, research output, career readiness, and habit streaks.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                <span style={{ color: 'var(--area-academics)' }}>●</span> Academics: <strong style={{ color: 'var(--color-text-primary)' }}>{academicsScore}%</strong>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                <span style={{ color: 'var(--area-dsa)' }}>●</span> DSA: <strong style={{ color: 'var(--color-text-primary)' }}>{Math.round(dsaScore)}%</strong>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
                <span style={{ color: 'var(--area-research)' }}>●</span> Research: <strong style={{ color: 'var(--color-text-primary)' }}>{Math.round(researchScore)}%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Areas Today */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--area-leadership)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Target size={20} /> Focus Checklist Today
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--area-dsa)' }}></div>
                <span>DSA Prep: Master dynamic programming (solve 3 Leetcode questions)</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--area-research)' }}></div>
                <span>AI/ML Research: Progress CrowdSense literature review manuscript</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-primary)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--area-leadership)' }}></div>
                <span>SRM ACM SIGCHI: Finalize Web Dev workshop speakers roster</span>
              </li>
            </ul>
          </div>
          
          <button 
            onClick={() => setActiveTab('tasks')}
            className="cyber-btn"
            style={{ alignSelf: 'flex-start', marginTop: '16px', fontSize: '0.75rem', padding: '6px 12px' }}
          >
            Manage Tasks & Board <ArrowUpRight size={14} />
          </button>
        </div>
      </div>

      {/* Burn Streaks & Growth Index Progress */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '24px' }}>
        
        {/* Burn Streaks */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary)' }}>
            <Flame size={20} color="var(--area-health)" /> Active Streaks & Consistency
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* Coding Streak */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--area-dsa-glow)', borderRadius: '8px', border: '1px solid rgba(194, 65, 12, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Flame size={18} color="var(--area-dsa)" className="animate-float" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Daily Coding (DSA)</span>
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--area-dsa)' }}>{codingHabit.streak} Days 🔥</span>
            </div>

            {/* Gym Streak */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--area-health-glow)', borderRadius: '8px', border: '1px solid rgba(220, 38, 38, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Flame size={18} color="var(--area-health)" className="animate-float" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Gym Workout</span>
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--area-health)' }}>{exerciseHabit.streak} Days 🔥</span>
            </div>

            {/* Journal Streak */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--area-personal-glow)', borderRadius: '8px', border: '1px solid rgba(190, 24, 93, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Flame size={18} color="var(--area-personal)" className="animate-float" />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>Growth Journaling</span>
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--area-personal)' }}>{journalHabit.streak} Days 🔥</span>
            </div>

          </div>
        </div>

        {/* Goals Progress Indexes */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary)' }}>
            <Award size={20} color="var(--area-research)" /> Goal Readiness Indices
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Placement Readiness Score */}
            <div style={{ cursor: 'pointer' }} onClick={() => setActiveTab('placement-index')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  <Award size={16} color="var(--area-career)" /> Placement Readiness (PRI)
                </span>
                <span style={{ color: 'var(--area-dsa)', fontWeight: 700 }}>{pri}%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.04)', borderRadius: '999px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ width: `${pri}%`, height: '100%', background: 'linear-gradient(90deg, var(--area-career) 0%, var(--area-dsa) 100%)', borderRadius: '999px' }}></div>
              </div>
            </div>

            {/* Research Goal Score */}
            <div style={{ cursor: 'pointer' }} onClick={() => setActiveTab('research')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  <BrainCircuit size={16} color="var(--area-research)" /> Research Paper Goals
                </span>
                <span style={{ color: 'var(--area-research)', fontWeight: 700 }}>42%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.04)', borderRadius: '999px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ width: '42%', height: '100%', background: 'linear-gradient(90deg, var(--area-research) 0%, var(--xp-color) 100%)', borderRadius: '999px' }}></div>
              </div>
            </div>

            {/* Academics CGPA Score */}
            <div style={{ cursor: 'pointer' }} onClick={() => setActiveTab('academics')}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  <GraduationCap size={16} color="var(--area-academics)" /> Academic CGPA Health
                </span>
                <span style={{ color: 'var(--area-academics)', fontWeight: 700 }}>100%</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.04)', borderRadius: '999px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, var(--area-academics) 0%, var(--area-academics) 100%)', borderRadius: '999px' }}></div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
