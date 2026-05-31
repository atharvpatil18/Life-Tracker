import React, { useState } from 'react';
import { FolderKanban, Plus, Trash2, ArrowUpRight, CheckCircle2, Circle, Layers, Sparkles } from 'lucide-react';

export default function ProjectTracker({ state, updateState, awardXP }) {
  const { projects, tasks } = state;
  const [selectedProjId, setSelectedProjId] = useState(projects[0]?.id || null);

  const [newProjName, setNewProjName] = useState('');
  const [newProjDesc, setNewProjDesc] = useState('');
  const [newProjArea, setNewProjArea] = useState('career');

  const selectedProj = projects.find(p => p.id === selectedProjId) || projects[0];

  const handleUpdateComponent = (projId, componentKey, delta) => {
    updateState(prev => {
      const updatedProjects = prev.projects.map(p => {
        if (p.id === projId) {
          const currentVal = p.components[componentKey] || 0;
          const newVal = Math.max(0, Math.min(100, currentVal + delta));
          const updatedComponents = {
            ...p.components,
            [componentKey]: newVal
          };
          
          // Re-calculate overall project progress as average of all active components
          const vals = Object.values(updatedComponents);
          const newProgress = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
          const isDone = newProgress === 100;

          if (isDone && p.progress < 100) {
            // Completed project XP!
            setTimeout(() => awardXP(150, `COMPLETED MAJOR ENGINEERING PROJECT: "${p.name}" (+150 XP Architecture Bonus)`), 200);
          } else if (newVal > currentVal) {
            // Award micro XP for making progress
            setTimeout(() => awardXP(10, `Pushed Component Progress on "${p.name}" - ${componentKey}`), 100);
          }

          return {
            ...p,
            components: updatedComponents,
            progress: newProgress,
            status: isDone ? "Completed" : "In Progress"
          };
        }
        return p;
      });

      return {
        ...prev,
        projects: updatedProjects
      };
    });
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProjName.trim()) return;

    const newProj = {
      id: 'p_' + Date.now(),
      name: newProjName,
      description: newProjDesc,
      status: "In Progress",
      area: newProjArea,
      progress: 0,
      components: {
        frontend: 0,
        backend: 0,
        database: 0,
        research: 0,
        documentation: 0
      }
    };

    updateState(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));

    setSelectedProjId(newProj.id);
    setNewProjName('');
    setNewProjDesc('');
    awardXP(30, `Initialized New Architecture Node: "${newProjName}"`);
  };

  const handleRemoveProject = (projId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      updateState(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== projId)
      }));
      // Reset selected project
      const remaining = projects.filter(p => p.id !== projId);
      setSelectedProjId(remaining[0]?.id || null);
    }
  };

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FolderKanban size={28} color="var(--area-dsa)" /> Architecture Project Tracker
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Decompose engineering systems into visual component layers. Maintain project balance and trace features.
        </p>
      </div>

      {/* Main split dashboard layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '24px' }}>
        
        {/* Left Side: Projects Listing & Add Project */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Projects lists */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem' }}>Core Codebases</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {projects.map((proj) => {
                const isActive = selectedProj?.id === proj.id;
                return (
                  <div 
                    key={proj.id} 
                    onClick={() => setSelectedProjId(proj.id)}
                    className="glass-panel"
                    style={{ 
                      padding: '12px 16px', 
                      cursor: 'pointer',
                      background: isActive ? 'var(--area-dsa-glow)' : 'var(--color-bg-card)',
                      borderColor: isActive ? 'var(--area-dsa)' : 'var(--color-border)',
                      borderLeft: `4px solid ${isActive ? 'var(--area-dsa)' : 'transparent'}`,
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <h4 style={{ fontWeight: 700, fontSize: '0.9rem', color: isActive ? 'var(--area-dsa)' : 'var(--color-text-primary)' }}>{proj.name}</h4>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{proj.area}</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>●</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>{proj.status}</span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <strong style={{ fontSize: '0.95rem' }}>{proj.progress}%</strong>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveProject(proj.id);
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add project Form */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={20} color="var(--area-dsa)" /> Initialize Project Node
            </h3>

            <form onSubmit={handleAddProject} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>NAME</label>
                <input 
                  type="text" 
                  placeholder="e.g. CrowdSense AI" 
                  className="cyber-input" 
                  value={newProjName}
                  onChange={(e) => setNewProjName(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>DESCRIPTION</label>
                <input 
                  type="text" 
                  placeholder="ML research on crowdsourced data modeling" 
                  className="cyber-input" 
                  value={newProjDesc}
                  onChange={(e) => setNewProjDesc(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>LIFE AREA FOCUS</label>
                <select 
                  className="cyber-select"
                  value={newProjArea}
                  onChange={(e) => setNewProjArea(e.target.value)}
                >
                  <option value="career">Career / Placements</option>
                  <option value="research">AI/ML & Research</option>
                  <option value="leadership">SRM ACM SIGCHI</option>
                  <option value="academics">Academics</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="cyber-btn cyber-btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }}
              >
                <Sparkles size={16} /> Deploy Codebase (+30 XP)
              </button>
            </form>
          </div>

        </div>

        {/* Right Side: Detailed Project Decompositions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {selectedProj ? (
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', tracking: '0.05em' }}>SELECTED OBJECTIVE COMPILER</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', marginTop: '4px', color: 'var(--area-dsa)' }}>{selectedProj.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>{selectedProj.description}</p>
              </div>

              {/* Components breakdown progress sliders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={16} color="var(--area-dsa)" /> Architectural Component Modules
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {Object.entries(selectedProj.components).map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
                        <span style={{ textTransform: 'capitalize', fontWeight: 600 }}>{key}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button 
                            onClick={() => handleUpdateComponent(selectedProj.id, key, -10)}
                            className="cyber-btn"
                            style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                          >
                            -10%
                          </button>
                          <strong style={{ minWidth: '36px', textAlign: 'center' }}>{val}%</strong>
                          <button 
                            onClick={() => handleUpdateComponent(selectedProj.id, key, 10)}
                            className="cyber-btn"
                            style={{ padding: '2px 8px', fontSize: '0.7rem' }}
                          >
                            +10%
                          </button>
                        </div>
                      </div>

                      <div style={{ width: '100%', height: '8px', background: 'rgba(0, 0, 0, 0.04)', borderRadius: '999px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                        <div style={{ width: `${val}%`, height: '100%', background: 'linear-gradient(90deg, var(--area-dsa) 0%, var(--area-research) 100%)', borderRadius: '999px', transition: 'width 0.3s ease' }}></div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              No codebase initialized. Deploy one from the left panel to examine its decomposition vector.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
