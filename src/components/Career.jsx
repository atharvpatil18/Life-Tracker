import React, { useState, useEffect } from 'react';
import { Briefcase, Award, Plus, Star, GitPullRequest, ShieldCheck, RefreshCw } from 'lucide-react';

const Github = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Career({ state, updateState, awardXP }) {
  const { resumeScore, openSourcePrs, linkedinPostsThisWeek } = state.careerMetrics;
  const [ghData, setGhData] = useState(null);
  const [loadingGh, setLoadingGh] = useState(false);
  const ghUsername = state.settings.githubUsername;

  useEffect(() => {
    if (ghUsername) {
      fetchGitHubStats(ghUsername);
    }
  }, [ghUsername]);

  const fetchGitHubStats = async (username) => {
    setLoadingGh(true);
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (res.ok) {
        const data = await res.json();
        setGhData(data);
      }
    } catch (e) {
      console.error("Error fetching GitHub stats", e);
    } finally {
      setLoadingGh(false);
    }
  };

  const handleAddLinkedInPost = () => {
    updateState(prev => ({
      ...prev,
      careerMetrics: {
        ...prev.careerMetrics,
        linkedinPostsThisWeek: prev.careerMetrics.linkedinPostsThisWeek + 1
      }
    }));
    awardXP(10, "Logged Professional LinkedIn Post");
  };

  const handleLogPrMerged = () => {
    updateState(prev => ({
      ...prev,
      careerMetrics: {
        ...prev.careerMetrics,
        openSourcePrs: prev.careerMetrics.openSourcePrs + 1
      }
    }));
    awardXP(25, "Merged Open Source GitHub Pull Request");
  };

  const handleImproveResume = () => {
    updateState(prev => {
      const currentScore = prev.careerMetrics.resumeScore;
      if (currentScore >= 100) return prev;
      
      return {
        ...prev,
        careerMetrics: {
          ...prev.careerMetrics,
          resumeScore: Math.min(currentScore + 3, 100)
        }
      };
    });
    awardXP(15, "Reviewed and Enhanced Resume Sections");
  };

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Briefcase size={28} color="var(--area-career)" /> Career & Resume Hub
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Manage your resume qualifications, review open-source contribution matrices, and sync public portfolios.
        </p>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        
        {/* Core Stats Pane */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Resume and open source stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            
            {/* Resume Quality score */}
            <div className="glass-panel glass-card-glow-career" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '160px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em' }}>RESUME SCORE</span>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--area-career)', margin: '4px 0', fontFamily: 'var(--font-display)' }}>
                  {resumeScore}%
                </div>
              </div>
              <button 
                onClick={handleImproveResume}
                disabled={resumeScore >= 100}
                className="cyber-btn"
                style={{ fontSize: '0.75rem', padding: '6px 12px', width: '100%', justifyContent: 'center' }}
              >
                <ShieldCheck size={14} /> Review & Boost Resume (+15 XP)
              </button>
            </div>

            {/* LinkedIn logging */}
            <div className="glass-panel glass-card-glow-career" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '160px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em' }}>LINKEDIN PRESENCE</span>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#60a5fa', margin: '4px 0', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Linkedin size={24} /> {linkedinPostsThisWeek} Posts <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>this week</span>
                </div>
              </div>
              <button 
                onClick={handleAddLinkedInPost}
                className="cyber-btn"
                style={{ fontSize: '0.75rem', padding: '6px 12px', width: '100%', justifyContent: 'center', borderColor: 'rgba(96, 165, 250, 0.3)', color: '#60a5fa' }}
              >
                <Plus size={14} /> Log Published Post (+10 XP)
              </button>
            </div>

          </div>

          {/* Active Projects Showcase */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} color="var(--area-career)" /> Active Project Portfolio
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {state.projects.map((proj, idx) => (
                <div key={idx} style={{ padding: '12px 16px', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>{proj.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{proj.description}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ 
                      fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 600,
                      background: proj.status === 'Completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(59, 130, 246, 0.1)',
                      color: proj.status === 'Completed' ? 'var(--area-academics)' : 'var(--area-dsa)',
                      border: proj.status === 'Completed' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(59, 130, 246, 0.2)',
                    }}>
                      {proj.status}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{proj.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* GitHub Panel */}
        <div className="glass-panel glass-card-glow-career" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
            <Github size={20} /> GitHub Integrations
          </h3>

          {ghUsername ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* User summary */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={ghData ? ghData.avatar_url : "https://github.com/github.png"} 
                  alt={ghUsername} 
                  style={{ width: '48px', height: '48px', borderRadius: '8px' }}
                />
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: '0.95rem' }}>@{ghUsername}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Connected via GitHub REST API</p>
                </div>
              </div>

              {/* Data readouts */}
              {loadingGh ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
                  <RefreshCw size={16} className="animate-float" /> Fetching live repository profiles...
                </div>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.02)' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block' }}>PUBLIC REPOS</span>
                    <strong style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>{ghData ? ghData.public_repos : 24}</strong>
                  </div>
                  <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.02)' }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block' }}>FOLLOWERS</span>
                    <strong style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>{ghData ? ghData.followers : 180}</strong>
                  </div>
                </div>
              )}

              {/* Merged PR log button */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><GitPullRequest size={14} color="var(--area-career)" /> Open Source PRs:</span>
                  <strong>{openSourcePrs} Merged</strong>
                </div>
                
                <button 
                  onClick={handleLogPrMerged}
                  className="cyber-btn"
                  style={{ fontSize: '0.75rem', padding: '8px 12px', justifyContent: 'center' }}
                >
                  Log Merged Pull Request (+25 XP)
                </button>
              </div>

            </div>
          ) : (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
              No GitHub profile connected. Go to the Settings tab to sync your live code metrics.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
