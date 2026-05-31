import React, { useState } from 'react';
import { Milestone, Calendar, Plus, Trophy, Activity, Award } from 'lucide-react';

export default function Timeline({ state }) {
  const [milestones, setMilestones] = useState([
    { year: 2024, title: "Started Engineering at SRM University", desc: "Initiated Computer Science undergraduate degree.", icon: "Activity" },
    { year: 2025, title: "Achieved Solid 10.0 CGPA & NPTEL Gold Cert", desc: "Maintained absolute academic records; scored gold credentials in Advanced DBMS.", icon: "Trophy" },
    { year: 2026, title: "First ML Research Publication & Placement Intern", desc: "Co-authored CVPR modeling manuscript; secured ML research intern position.", icon: "Award" },
    { year: 2027, title: "Secured Premier Placements or MS Admits", desc: "Projected milestones: launch career in high IT AI or elite studies.", icon: "Trophy" },
  ]);

  const [newYear, setNewYear] = useState('2026');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newMs = {
      year: parseInt(newYear) || new Date().getFullYear(),
      title: newTitle,
      desc: newDesc,
      icon: "Award"
    };

    setMilestones(prev => [...prev, newMs].sort((a, b) => a.year - b.year));
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Milestone size={28} color="#f59e0b" /> Career & Life Milestone Timeline
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          A visual roadmap of historic academic and development milestones. Like a contribution history mapping for your life.
        </p>
      </div>

      {/* Split view */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        
        {/* Visual Timeline pane */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '24px', paddingLeft: '24px', borderLeft: '2px solid rgba(59, 130, 246, 0.15)' }}>
            
            {milestones.map((ms, index) => (
              <div key={index} style={{ position: 'relative' }}>
                
                {/* Visual node marker */}
                <div style={{ 
                  position: 'absolute', 
                  left: '-33px', 
                  top: '2px', 
                  width: '16px', 
                  height: '16px', 
                  borderRadius: '50%', 
                  background: 'var(--color-bg-darkest)',
                  border: '3px solid var(--area-leadership)',
                  boxShadow: '0 0 10px var(--area-leadership-glow)',
                  zIndex: 2
                }}></div>

                <div>
                  <span style={{ 
                    fontFamily: 'var(--font-display)', 
                    fontWeight: 900, 
                    fontSize: '1.25rem', 
                    color: 'var(--area-leadership)',
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px' 
                  }}>
                    {ms.year}
                  </span>
                  
                  <h4 style={{ fontWeight: 800, fontSize: '1rem', marginTop: '4px', color: '#fff' }}>{ms.title}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>{ms.desc}</p>
                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Milestone form creator */}
        <div className="glass-panel" style={{ padding: '24px', height: 'fit-content' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} color="var(--area-leadership)" /> Log Historic Milestone
          </h3>

          <form onSubmit={handleAddMilestone} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>YEAR</label>
              <input 
                type="number" 
                placeholder="2026" 
                className="cyber-input"
                value={newYear}
                onChange={(e) => setNewYear(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>TITLE</label>
              <input 
                type="text" 
                placeholder="Published CrowdSense ML paper" 
                className="cyber-input"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>DESCRIPTION</label>
              <textarea 
                placeholder="Describe details and outcomes..." 
                className="cyber-input"
                rows="3"
                style={{ resize: 'none', fontSize: '0.85rem' }}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="cyber-btn cyber-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }}
            >
              Record Historical Node
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
