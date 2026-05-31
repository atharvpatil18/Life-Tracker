import React, { useState } from 'react';
import { Compass, CheckCircle2, Circle, Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Award } from 'lucide-react';

export default function VisionBoard({ state, updateState, awardXP }) {
  const { visions } = state;
  const [activeFrame, setActiveFrame] = useState('1yr');
  const [expandedGoalId, setExpandedGoalId] = useState(null);

  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalStepsText, setNewGoalStepsText] = useState("Literature Survey\nModel Development\nPaper Writing");

  const handleToggleStep = (goalId, stepId) => {
    updateState(prev => {
      const updatedVisions = prev.visions.map(vis => {
        if (vis.id === goalId) {
          const updatedSteps = vis.steps.map(s => {
            if (s.id === stepId) {
              const newStatus = !s.completed;
              if (newStatus) {
                // Award micro XP for sub steps
                setTimeout(() => awardXP(10, `Completed Goal Step: "${s.title}"`), 100);
              }
              return { ...s, completed: newStatus };
            }
            return s;
          });
          
          const completedCount = updatedSteps.filter(s => s.completed).length;
          const allDone = completedCount === updatedSteps.length;
          
          if (allDone && !vis.completed) {
            // Massive Vision Goal XP!
            setTimeout(() => awardXP(100, `ARCHIEVED LIFE VISION OBJECTIVE: "${vis.title}" (+100 XP Visionary Bonus)`), 200);
          }

          return {
            ...vis,
            steps: updatedSteps,
            completed: allDone
          };
        }
        return vis;
      });

      return {
        ...prev,
        visions: updatedVisions
      };
    });
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    // Parse sub steps from newline split
    const stepsArray = newGoalStepsText
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map((s, idx) => ({
        id: `vs_${Date.now()}_${idx}`,
        title: s,
        completed: false
      }));

    const newGoal = {
      id: `v_${Date.now()}`,
      title: newGoalTitle,
      timeFrame: activeFrame,
      completed: false,
      steps: stepsArray
    };

    updateState(prev => ({
      ...prev,
      visions: [...prev.visions, newGoal]
    }));

    setNewGoalTitle('');
    setNewGoalStepsText("Literature Survey\nModel Development\nPaper Writing");
    awardXP(25, `Projected Life Goal Node: "${newGoalTitle}"`);
  };

  const handleRemoveGoal = (goalId) => {
    if (window.confirm("Are you sure you want to delete this vision item?")) {
      updateState(prev => ({
        ...prev,
        visions: prev.visions.filter(v => v.id !== goalId)
      }));
    }
  };

  const activeVisions = visions.filter(v => v.timeFrame === activeFrame);

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={28} color="var(--area-leadership)" /> Vision Board & Decomposition
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Project milestones across 1-Year, 3-Year, and 10-Year horizons. Break large objectives down into checklist nodes.
        </p>
      </div>

      {/* Horizon selector buttons */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
        <button 
          onClick={() => setActiveFrame('1yr')}
          className="cyber-btn"
          style={{ 
            background: activeFrame === '1yr' ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
            borderColor: activeFrame === '1yr' ? '#3b82f6' : 'transparent',
            color: activeFrame === '1yr' ? '#fff' : 'var(--color-text-secondary)'
          }}
        >
          1-Year Horizon (Sophomore Milestones)
        </button>

        <button 
          onClick={() => setActiveFrame('3yr')}
          className="cyber-btn"
          style={{ 
            background: activeFrame === '3yr' ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
            borderColor: activeFrame === '3yr' ? '#8b5cf6' : 'transparent',
            color: activeFrame === '3yr' ? '#fff' : 'var(--color-text-secondary)'
          }}
        >
          3-Year Horizon (Graduate placement/MS)
        </button>

        <button 
          onClick={() => setActiveFrame('10yr')}
          className="cyber-btn"
          style={{ 
            background: activeFrame === '10yr' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
            borderColor: activeFrame === '10yr' ? '#f59e0b' : 'transparent',
            color: activeFrame === '10yr' ? '#fff' : 'var(--color-text-secondary)'
          }}
        >
          10-Year Horizon (Tech Entrepreneurship)
        </button>
      </div>

      {/* Main split dashboard */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        
        {/* Goal Tree pane */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="var(--area-leadership)" /> Current Milestones checklist
          </h3>

          {activeVisions.length === 0 ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No objectives recorded for this horizon yet. Use the pane on the right to project one!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeVisions.map((goal) => {
                const completedSteps = goal.steps.filter(s => s.completed).length;
                const totalSteps = goal.steps.length;
                const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : (goal.completed ? 100 : 0);
                const isExpanded = expandedGoalId === goal.id;

                return (
                  <div 
                    key={goal.id} 
                    className="glass-panel"
                    style={{ 
                      padding: '16px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '12px',
                      borderLeft: goal.completed ? '4px solid #10b981' : '1px solid var(--color-border)',
                      borderColor: goal.completed ? '#10b981' : 'inherit'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1, cursor: 'pointer' }} onClick={() => setExpandedGoalId(isExpanded ? null : goal.id)}>
                        <h4 style={{ fontWeight: 700, fontSize: '1rem', textDecoration: goal.completed ? 'line-through' : 'none', color: goal.completed ? 'var(--color-text-muted)' : '#fff' }}>
                          {goal.title}
                        </h4>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                          <div style={{ width: '120px', height: '4px', background: 'rgba(255,255,255,0.03)', borderRadius: '999px', overflow: 'hidden' }}>
                            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)' }}></div>
                          </div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>{progress}% ({completedSteps}/{totalSteps} steps)</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <button 
                          onClick={() => setExpandedGoalId(isExpanded ? null : goal.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                        
                        <button 
                          onClick={() => handleRemoveGoal(goal.id)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Expandable decomposition sub steps tree */}
                    {isExpanded && (
                      <div style={{ 
                        borderTop: '1px solid rgba(255,255,255,0.05)', 
                        paddingTop: '12px', 
                        paddingLeft: '8px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '10px',
                        animation: 'popUp 0.2s ease'
                      }}>
                        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em', marginBottom: '4px', display: 'block' }}>Goal Decomposition Checklist</span>
                        
                        {goal.steps.map(step => (
                          <div 
                            key={step.id} 
                            onClick={() => handleToggleStep(goal.id, step.id)}
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              gap: '8px', 
                              fontSize: '0.85rem', 
                              cursor: 'pointer',
                              color: step.completed ? 'var(--color-text-secondary)' : '#fff' 
                            }}
                          >
                            {step.completed ? (
                              <CheckCircle2 size={16} color="#10b981" />
                            ) : (
                              <Circle size={16} color="var(--color-text-muted)" />
                            )}
                            <span style={{ textDecoration: step.completed ? 'line-through' : 'none' }}>{step.title}</span>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Goal Creator Form */}
        <div className="glass-panel" style={{ padding: '24px', height: 'fit-content' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} color="var(--area-leadership)" /> Project Life Objective
          </h3>

          <form onSubmit={handleAddGoal} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>OBJECTIVE TITLE</label>
              <input 
                type="text" 
                placeholder="e.g. Publish 1st Author ML paper" 
                className="cyber-input" 
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>GOAL DECOMPOSITION STEPS (one per line)</label>
              <textarea 
                className="cyber-input" 
                rows="4"
                style={{ resize: 'none', fontSize: '0.85rem', lineHeight: '1.4', fontFamily: 'monospace' }}
                value={newGoalStepsText}
                onChange={(e) => setNewGoalStepsText(e.target.value)}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="cyber-btn cyber-btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Sparkles size={16} /> Deploy Objective (+25 XP)
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
