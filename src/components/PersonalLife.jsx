import React, { useState } from 'react';
import { Heart, Phone, MessagesSquare, Check, Sparkles, Smile } from 'lucide-react';

export default function PersonalLife({ state, updateState, awardXP }) {
  const { familyCallsThisWeek, meaningfulConversations, relationshipHealth } = state.personalMetrics;
  const [sliderVal, setSliderVal] = useState(relationshipHealth);
  const [editingHealth, setEditingHealth] = useState(false);

  const handleLogCall = () => {
    updateState(prev => ({
      ...prev,
      personalMetrics: {
        ...prev.personalMetrics,
        familyCallsThisWeek: prev.personalMetrics.familyCallsThisWeek + 1
      }
    }));
    awardXP(5, "Logged Quality Call with Family");
  };

  const handleLogConversation = () => {
    updateState(prev => ({
      ...prev,
      personalMetrics: {
        ...prev.personalMetrics,
        meaningfulConversations: prev.personalMetrics.meaningfulConversations + 1
      }
    }));
    awardXP(5, "Logged Deep Meaningful Conversation");
  };

  const handleSaveHealth = () => {
    updateState(prev => ({
      ...prev,
      personalMetrics: {
        ...prev.personalMetrics,
        relationshipHealth: parseInt(sliderVal)
      }
    }));
    setEditingHealth(false);
    awardXP(10, "Conducted Non-Invasive Relationship Health Review");
  };

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={28} color="var(--area-personal)" /> Personal Life & Balance
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Maintain an emotional log, balance academics with family support, and conduct mindful reflections.
        </p>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Quality Trackers */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Smile size={20} color="var(--area-personal)" /> Connection Milestones
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Family calls */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(236, 72, 153, 0.03)', borderRadius: '8px', border: '1px solid rgba(236, 72, 153, 0.1)' }}>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>FAMILY CONTACTS</span>
                <strong style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>{familyCallsThisWeek} calls <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 400 }}>this week</span></strong>
              </div>
              <button 
                onClick={handleLogCall}
                className="cyber-btn"
                style={{ fontSize: '0.75rem', padding: '6px 12px', color: 'var(--area-personal)', borderColor: 'rgba(236, 72, 153, 0.3)' }}
              >
                <Phone size={14} /> Log Call (+5 XP)
              </button>
            </div>

            {/* Meaningful conversations */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(168, 85, 247, 0.03)', borderRadius: '8px', border: '1px solid rgba(168, 85, 247, 0.1)' }}>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>DEEP CONVERSATIONS</span>
                <strong style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>{meaningfulConversations} logged</strong>
              </div>
              <button 
                onClick={handleLogConversation}
                className="cyber-btn"
                style={{ fontSize: '0.75rem', padding: '6px 12px', color: '#c084fc', borderColor: 'rgba(168, 85, 247, 0.3)' }}
              >
                <MessagesSquare size={14} /> Log Dialogue (+5 XP)
              </button>
            </div>

          </div>
        </div>

        {/* Relationship Health Gauge */}
        <div className="glass-panel glass-card-glow-personal" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em' }}>EMOTIONAL HARMONY INDEX</span>
            
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', margin: '8px 0' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2.5rem', color: 'var(--area-personal)', lineHeight: '1' }}>
                {relationshipHealth}%
              </h4>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
              A non-invasive, entirely self-reflective score to monitor personal life integration, partner/friends support, and emotional baseline harmony.
            </p>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
            {editingHealth ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', animation: 'popUp 0.2s ease' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input 
                    type="range" 
                    min="10" max="100" 
                    value={sliderVal} 
                    onChange={(e) => setSliderVal(e.target.value)} 
                    style={{ flex: 1, accentColor: 'var(--area-personal)' }}
                  />
                  <strong style={{ fontSize: '0.9rem', width: '36px' }}>{sliderVal}%</strong>
                </div>
                
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={handleSaveHealth} className="cyber-btn cyber-btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>
                    <Check size={14} /> Save Review
                  </button>
                  <button onClick={() => setEditingHealth(false)} className="cyber-btn" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setSliderVal(relationshipHealth);
                  setEditingHealth(true);
                }} 
                className="cyber-btn" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Sparkles size={14} /> Conduct Reflective Review (+10 XP)
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
