import React, { useState } from 'react';
import { BrainCircuit, BookOpen, Layers, Database, Sparkles, Plus, Cpu } from 'lucide-react';

export default function AIMLResearch({ state, updateState, awardXP }) {
  const { papersReadCount, modelsBuilt, datasetsExplored, currentFocus } = state.aimlMetrics;
  const [focusInput, setFocusInput] = useState(currentFocus);
  const [editingFocus, setEditingFocus] = useState(false);
  
  const [newPaperTitle, setNewPaperTitle] = useState('');
  const [newModelName, setNewModelName] = useState('');

  const handleUpdateFocus = () => {
    updateState(prev => ({
      ...prev,
      aimlMetrics: {
        ...prev.aimlMetrics,
        currentFocus: focusInput
      }
    }));
    setEditingFocus(false);
    awardXP(10, "Updated ML Research Focus Area");
  };

  const handleLogPaper = (e) => {
    e.preventDefault();
    if (!newPaperTitle.trim()) return;

    updateState(prev => ({
      ...prev,
      aimlMetrics: {
        ...prev.aimlMetrics,
        papersReadCount: prev.aimlMetrics.papersReadCount + 1
      },
      // Automatically add a brief entry into smart journal
      journal: [
        {
          id: 'j_' + Date.now(),
          content: `Read and analyzed ML research paper: "${newPaperTitle}". Synthesized methodologies and architectures in Knowledge Vault.`,
          date: new Date().toISOString().split('T')[0],
          tags: ["learning", "research"]
        },
        ...prev.journal
      ]
    }));
    
    setNewPaperTitle('');
    awardXP(15, `Read & Analyzed ML Paper: "${newPaperTitle}"`);
  };

  const handleLogModel = (e) => {
    e.preventDefault();
    if (!newModelName.trim()) return;

    updateState(prev => ({
      ...prev,
      aimlMetrics: {
        ...prev.aimlMetrics,
        modelsBuilt: prev.aimlMetrics.modelsBuilt + 1
      },
      journal: [
        {
          id: 'j_' + Date.now(),
          content: `Successfully built, compiled and verified custom ML model: "${newModelName}". Evaluated baseline performance.`,
          date: new Date().toISOString().split('T')[0],
          tags: ["learning", "project", "research"]
        },
        ...prev.journal
      ]
    }));

    setNewModelName('');
    awardXP(20, `Built & Configured Model: "${newModelName}"`);
  };

  const handleLogDataset = () => {
    updateState(prev => ({
      ...prev,
      aimlMetrics: {
        ...prev.aimlMetrics,
        datasetsExplored: prev.aimlMetrics.datasetsExplored + 1
      }
    }));
    awardXP(10, "Explored and Cleaned New Machine Learning Dataset");
  };

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BrainCircuit size={28} color="var(--area-research)" /> AI/ML & Research Hub
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Manage your research papers collection, model compilation counters, and vector data exploration.
        </p>
      </div>

      {/* Overview Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        
        {/* Core Logging Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Main Counters Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            
            {/* Papers Read */}
            <div className="glass-panel glass-card-glow-research" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '130px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <BookOpen size={12} /> PAPERS READ
              </span>
              <strong style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', color: 'var(--area-research)' }}>{papersReadCount}</strong>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>Academic Syntheses</span>
            </div>

            {/* Models Built */}
            <div className="glass-panel glass-card-glow-research" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '130px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Cpu size={12} /> MODELS BUILT
              </span>
              <strong style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', color: 'var(--area-research)' }}>{modelsBuilt}</strong>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)' }}>TensorFlow / PyTorch</span>
            </div>

            {/* Datasets Explored */}
            <div className="glass-panel glass-card-glow-research" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '130px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Database size={12} /> DATASETS CLEANED
              </span>
              <strong style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', color: 'var(--area-research)' }}>{datasetsExplored}</strong>
              <button 
                onClick={handleLogDataset}
                className="cyber-btn"
                style={{ fontSize: '0.6rem', padding: '2px 6px', justifyContent: 'center', marginTop: '4px' }}
              >
                Log Cleaned (+10 XP)
              </button>
            </div>

          </div>

          {/* Log New Research Activity forms */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="var(--area-research)" /> Document Research Milestones
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              
              {/* Log Paper form */}
              <form onSubmit={handleLogPaper} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>LOG ACADEMIC PAPER READ</label>
                <input 
                  type="text" 
                  placeholder="Paper Title (e.g. Attention Is All You Need)" 
                  className="cyber-input" 
                  style={{ fontSize: '0.8rem' }}
                  value={newPaperTitle}
                  onChange={(e) => setNewPaperTitle(e.target.value)}
                />
                <button type="submit" className="cyber-btn" style={{ fontSize: '0.75rem', justifyContent: 'center', marginTop: '4px' }}>
                  Add Paper (+15 XP)
                </button>
              </form>

              {/* Log Model form */}
              <form onSubmit={handleLogModel} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>LOG CUSTOM ML MODEL BUILT</label>
                <input 
                  type="text" 
                  placeholder="Architecture Name (e.g. ResNet50 Crowd Classifier)" 
                  className="cyber-input" 
                  style={{ fontSize: '0.8rem' }}
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                />
                <button type="submit" className="cyber-btn" style={{ fontSize: '0.75rem', justifyContent: 'center', marginTop: '4px' }}>
                  Compile Model (+20 XP)
                </button>
              </form>

            </div>
          </div>

        </div>

        {/* Right side current focus area panel */}
        <div className="glass-panel glass-card-glow-research" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em' }}>CURRENT CORE RESEARCH VECTOR</span>
            
            {editingFocus ? (
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input 
                  type="text" 
                  className="cyber-input" 
                  value={focusInput} 
                  onChange={(e) => setFocusInput(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={handleUpdateFocus} className="cyber-btn cyber-btn-primary" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Save</button>
                  <button onClick={() => setEditingFocus(false)} className="cyber-btn" style={{ padding: '6px 12px', fontSize: '0.75rem' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--area-research)', margin: '8px 0', lineHeight: '1.2' }}>
                  {currentFocus}
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
                  Focusing on model optimization, literature review, and custom dataset annotations for publication outputs.
                </p>
                <button 
                  onClick={() => setEditingFocus(true)}
                  className="cyber-btn"
                  style={{ fontSize: '0.7rem', padding: '4px 8px', marginTop: '12px' }}
                >
                  Edit Vector
                </button>
              </div>
            )}
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Your research entries are linked dynamically into your <strong>Smart Journal</strong> and feed the context parameters of the <strong>AI Coach</strong>.
          </div>
        </div>

      </div>

    </div>
  );
}
