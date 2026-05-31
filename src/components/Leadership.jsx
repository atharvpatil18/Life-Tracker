import React, { useState } from 'react';
import { Users, Calendar, Award, Plus, Sparkles, TrendingUp, ShieldAlert } from 'lucide-react';

export default function Leadership({ state, updateState, awardXP }) {
  const { clubName, eventsConducted, participantsImpacted, score } = state.leadershipMetrics;
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newParticipants, setNewParticipants] = useState('80');

  const handleLogEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle.trim()) return;

    const addedParticipants = parseInt(newParticipants) || 0;

    updateState(prev => {
      const updatedEvents = prev.leadershipMetrics.eventsConducted + 1;
      const updatedParticipants = prev.leadershipMetrics.participantsImpacted + addedParticipants;
      
      // Calculate new score based on events and impact
      const baseScore = 60;
      const eventBonus = Math.min(updatedEvents * 2, 20);
      const impactBonus = Math.min(Math.floor(updatedParticipants / 50), 20);
      const updatedScore = Math.min(baseScore + eventBonus + impactBonus, 100);

      return {
        ...prev,
        leadershipMetrics: {
          ...prev.leadershipMetrics,
          eventsConducted: updatedEvents,
          participantsImpacted: updatedParticipants,
          score: updatedScore
        },
        journal: [
          {
            id: 'j_' + Date.now(),
            content: `Conducted major SRM ACM SIGCHI event: "${newEventTitle}" for ${addedParticipants} participants. Managed operations, logistics, and speaker relations successfully.`,
            date: new Date().toISOString().split('T')[0],
            tags: ["leadership", "career"]
          },
          ...prev.journal
        ]
      };
    });

    setNewEventTitle('');
    setNewParticipants('80');
    awardXP(50, `Conducted SIGCHI Event: "${newEventTitle}" (+50 XP Leadership Bonus)`);
  };

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={28} color="var(--area-leadership)" /> Club Leadership & Impact
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Monitor your SRM ACM SIGCHI executive ratings, track community event metrics, and log leadership impact.
        </p>
      </div>

      {/* Main Stats Pane */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Core details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Main counts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            
            {/* Events conducted */}
            <div className="glass-panel glass-card-glow-leadership" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em' }}>EVENTS CONDUCTED</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--area-leadership)', margin: '4px 0', fontFamily: 'var(--font-display)' }}>
                {eventsConducted} <span style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>Events</span>
              </div>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>SRM ACM SIGCHI Chapter</span>
            </div>

            {/* Participants Impacted */}
            <div className="glass-panel glass-card-glow-leadership" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '140px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em' }}>PARTICIPANTS IMPACTED</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10b981', margin: '4px 0', fontFamily: 'var(--font-display)' }}>
                {participantsImpacted}+
              </div>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>Overall Reach & Impact</span>
            </div>

          </div>

          {/* Form to log event */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={20} color="var(--area-leadership)" /> Log Conducted Club Event
            </h3>

            <form onSubmit={handleLogEvent} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>EVENT TITLE</label>
                  <input 
                    type="text" 
                    placeholder="e.g. SRM Web Dev Bootcamp 2026" 
                    className="cyber-input"
                    value={newEventTitle}
                    onChange={(e) => setNewEventTitle(e.target.value)}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>PARTICIPANTS</label>
                  <input 
                    type="number" 
                    placeholder="80" 
                    className="cyber-input"
                    value={newParticipants}
                    onChange={(e) => setNewParticipants(e.target.value)}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="cyber-btn cyber-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Publish Event and Award XP (+50 XP Leadership Reward)
              </button>
            </form>
          </div>

        </div>

        {/* Right side: Leadership score panel */}
        <div className="glass-panel glass-card-glow-leadership" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em' }}>LEADERSHIP RATING</span>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '8px 0' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.5rem', color: 'var(--area-leadership)', lineHeight: '1' }}>
                {score}
              </h4>
              <span style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>/100</span>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.4', marginTop: '8px' }}>
              Your rating is a composite of total SRM events conducted, active management of ACM SIGCHI chapters, and participant reach. Reaching 90+ unlocks the "Distinguished Chairperson" title!
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#10b981' }}>
              <TrendingUp size={16} />
              <span>SIGCHI Active members: <strong>48 Staff</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
              <ShieldAlert size={16} color="var(--area-leadership)" />
              <span>Next SRM Faculty Review: <strong>June 15</strong></span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
