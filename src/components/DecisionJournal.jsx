import React, { useState } from 'react';
import { GitFork, Plus, CheckCircle2, AlertTriangle, HelpCircle, Calendar, Sparkles } from 'lucide-react';

export default function DecisionJournal({ state, updateState, awardXP }) {
  const { decisions } = state;
  const [newChoice, setNewChoice] = useState('');
  const [newReasoning, setNewReasoning] = useState('');
  const [newExpectations, setNewExpectations] = useState('');
  const [newMood, setNewMood] = useState('Confident');

  const [expandedDecId, setExpandedDecId] = useState(null);
  const [outcomeText, setOutcomeText] = useState('');
  const [decisionAccuracy, setDecisionAccuracy] = useState('Correct');

  const handleAddDecision = (e) => {
    e.preventDefault();
    if (!newChoice.trim()) return;

    const newDecision = {
      id: 'd_' + Date.now(),
      chosenChoice: newChoice,
      reasoning: newReasoning,
      expectations: newExpectations,
      date: new Date().toISOString().split('T')[0],
      mood: newMood,
      outcome: "",
      outcomeDate: "",
      checked: false
    };

    updateState(prev => ({
      ...prev,
      decisions: [newDecision, ...prev.decisions]
    }));

    setNewChoice('');
    setNewReasoning('');
    setNewExpectations('');
    setNewMood('Confident');
    awardXP(20, `Logged High-Impact Decision Node: "${newChoice}"`);
  };

  const handleResolveOutcome = (decId) => {
    if (!outcomeText.trim()) return;

    updateState(prev => {
      const updatedDecisions = prev.decisions.map(d => {
        if (d.id === decId) {
          return {
            ...d,
            outcome: `${decisionAccuracy} Decision. ${outcomeText}`,
            outcomeDate: new Date().toISOString().split('T')[0],
            checked: true
          };
        }
        return d;
      });

      return {
        ...prev,
        decisions: updatedDecisions
      };
    });

    setOutcomeText('');
    setExpandedDecId(null);
    awardXP(50, "Resolved Decision Outcome & Completed Reflection (+50 XP Self-Awareness Bonus)");
  };

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GitFork size={28} color="var(--area-personal)" /> Rational Decision Journal
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Document high-stakes decisions, compile your expectations, and audit outcomes to eliminate cognitive biases.
        </p>
      </div>

      {/* Split View */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Decisions History Log */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem' }}>Decision Audit Ledger</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {decisions.map((dec) => (
              <div 
                key={dec.id} 
                className="glass-panel" 
                style={{ 
                  padding: '20px', 
                  borderLeft: dec.checked ? '4px solid #10b981' : '4px solid #f59e0b',
                  borderColor: dec.checked ? '#10b981' : '#f59e0b'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> LOGGED: {dec.date}
                    </span>
                    <h4 style={{ fontWeight: 800, fontSize: '1.1rem', marginTop: '6px', color: 'var(--color-text-primary)' }}>{dec.chosenChoice}</h4>
                  </div>
                  
                  <span style={{ 
                    fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', fontWeight: 600,
                    background: dec.checked ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                    color: dec.checked ? 'var(--area-academics)' : 'var(--area-leadership)',
                    border: dec.checked ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(245, 158, 11, 0.2)',
                  }}>
                    {dec.checked ? "Audit Complete" : "Pending Audit"}
                  </span>
                </div>

                <div style={{ margin: '14px 0', fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <p><strong>Rationale:</strong> {dec.reasoning}</p>
                  <p><strong>Expected Outcome:</strong> {dec.expectations}</p>
                  <p><strong>Mood State:</strong> <span style={{ color: 'var(--area-personal)', fontWeight: 600 }}>{dec.mood}</span></p>
                </div>

                {dec.checked ? (
                  <div style={{ 
                    borderTop: '1px solid var(--color-border)', 
                    paddingTop: '12px', 
                    marginTop: '12px', 
                    background: 'rgba(16, 185, 129, 0.03)', 
                    padding: '10px', 
                    borderRadius: '6px', 
                    border: '1px solid rgba(16, 185, 129, 0.1)',
                    fontSize: '0.85rem' 
                  }}>
                    <strong style={{ color: 'var(--area-academics)', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                      <CheckCircle2 size={14} /> Audit Outcome ({dec.outcomeDate}):
                    </strong>
                    <p style={{ color: 'var(--color-text-secondary)' }}>{dec.outcome}</p>
                  </div>
                ) : (
                  <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '12px', marginTop: '12px' }}>
                    {expandedDecId === dec.id ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', animation: 'popUp 0.2s ease' }}>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>OUTCOME REFLECTION</label>
                            <input 
                              type="text" 
                              placeholder="Describe actual outcome details..." 
                              className="cyber-input" 
                              value={outcomeText}
                              onChange={(e) => setOutcomeText(e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>ACCURACY</label>
                            <select 
                              className="cyber-select" 
                              value={decisionAccuracy}
                              onChange={(e) => setDecisionAccuracy(e.target.value)}
                              style={{ padding: '12px 24px 12px 12px' }}
                            >
                              <option value="Correct">Correct</option>
                              <option value="Mistake">Mistake</option>
                              <option value="Neutral">Neutral</option>
                            </select>
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => handleResolveOutcome(dec.id)} className="cyber-btn cyber-btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Save Audit</button>
                          <button onClick={() => setExpandedDecId(null)} className="cyber-btn" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        onClick={() => {
                          setExpandedDecId(dec.id);
                          setOutcomeText('');
                        }} 
                        className="cyber-btn" 
                        style={{ fontSize: '0.75rem', padding: '6px 12px', width: '100%', justifyContent: 'center' }}
                      >
                        <Sparkles size={14} /> Resolve & Audit Outcome (+50 XP)
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Decision Creator Form */}
        <div className="glass-panel" style={{ padding: '24px', height: 'fit-content' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} color="var(--area-personal)" /> Log Decision Node
          </h3>

          <form onSubmit={handleAddDecision} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>DECISION choice</label>
              <input 
                type="text" 
                placeholder="e.g. Focus on AI vs Web Dev" 
                className="cyber-input" 
                value={newChoice}
                onChange={(e) => setNewChoice(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>RATIONALE (WHY)</label>
              <textarea 
                className="cyber-input" 
                placeholder="Strong interest in ML and MS prospects..."
                rows="3"
                style={{ resize: 'none', fontSize: '0.85rem' }}
                value={newReasoning}
                onChange={(e) => setNewReasoning(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>EXPECTED OUTCOME</label>
              <textarea 
                className="cyber-input" 
                placeholder="Publish paper, stronger portfolio website..."
                rows="2"
                style={{ resize: 'none', fontSize: '0.85rem' }}
                value={newExpectations}
                onChange={(e) => setNewExpectations(e.target.value)}
              ></textarea>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>EMOTIONAL STATE (MOOD)</label>
              <select 
                className="cyber-select" 
                value={newMood} 
                onChange={(e) => setNewMood(e.target.value)}
              >
                <option value="Confident">Confident</option>
                <option value="Excited">Excited</option>
                <option value="Hesitant">Hesitant</option>
                <option value="Anxious">Anxious</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="cyber-btn cyber-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }}
            >
              <Sparkles size={16} /> Record Decision Node (+20 XP)
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
