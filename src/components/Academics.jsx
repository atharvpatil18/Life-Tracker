import React, { useState } from 'react';
import { GraduationCap, Award, Check, Plus, Trash2, Calendar } from 'lucide-react';

export default function Academics({ state, updateState, awardXP }) {
  const { cgpa, targetCgpa, subjects } = state.academicMetrics;
  const [newSubName, setNewSubName] = useState('');
  const [editingCgpa, setEditingCgpa] = useState(false);
  const [cgpaInput, setCgpaInput] = useState(cgpa);
  const [targetInput, setTargetInput] = useState(targetCgpa);

  const calculateOverallAttendance = () => {
    let totalAttended = 0;
    let totalClasses = 0;
    subjects.forEach(sub => {
      totalAttended += sub.attendedCount;
      totalClasses += sub.classCount;
    });
    return totalClasses > 0 ? Math.round((totalAttended / totalClasses) * 100) : 100;
  };

  const handleUpdateCgpa = () => {
    updateState(prev => ({
      ...prev,
      academicMetrics: {
        ...prev.academicMetrics,
        cgpa: parseFloat(cgpaInput),
        targetCgpa: parseFloat(targetInput)
      }
    }));
    setEditingCgpa(false);
    awardXP(20, "Updated Academic Metrics and CGPA Targets");
  };

  const handleLogAttendance = (subjectName, attended) => {
    updateState(prev => {
      const updatedSubjects = prev.academicMetrics.subjects.map(sub => {
        if (sub.name === subjectName) {
          const newAttended = attended ? sub.attendedCount + 1 : sub.attendedCount;
          const newTotal = sub.classCount + 1;
          const newHealth = Math.round((newAttended / newTotal) * 100);
          return {
            ...sub,
            attendedCount: newAttended,
            classCount: newTotal,
            health: newHealth
          };
        }
        return sub;
      });

      return {
        ...prev,
        academicMetrics: {
          ...prev.academicMetrics,
          subjects: updatedSubjects
        }
      };
    });

    if (attended) {
      awardXP(10, `Attended ${subjectName} Lecture`);
    } else {
      awardXP(2, `Logged Absence for ${subjectName} Lecture`);
    }
  };

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSubName.trim()) return;

    updateState(prev => ({
      ...prev,
      academicMetrics: {
        ...prev.academicMetrics,
        subjects: [
          ...prev.academicMetrics.subjects,
          { name: newSubName, health: 100, classCount: 1, attendedCount: 1 }
        ]
      }
    }));
    setNewSubName('');
    awardXP(15, `Added New Subject Node: ${newSubName}`);
  };

  const handleRemoveSubject = (subjectName) => {
    if (window.confirm(`Are you sure you want to remove ${subjectName}?`)) {
      updateState(prev => ({
        ...prev,
        academicMetrics: {
          ...prev.academicMetrics,
          subjects: prev.academicMetrics.subjects.filter(s => s.name !== subjectName)
        }
      }));
    }
  };

  const overallAttendance = calculateOverallAttendance();

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GraduationCap size={28} color="var(--area-academics)" /> Academic Growth Center
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Maintain your 10.0 SRM CGPA, monitor lecture attendance ratios, and track subject-level health metrics.
          </p>
        </div>
      </div>

      {/* Overview stats: CGPA and Attendance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* CGPA Card */}
        <div className="glass-panel glass-card-glow-academics" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em' }}>SRM UNIVERSITY CGPA</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', margin: '8px 0' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 900, color: 'var(--area-academics)' }}>{cgpa.toFixed(2)}</span>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>/ Target: {targetCgpa.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={() => setEditingCgpa(!editingCgpa)}
              className="cyber-btn"
              style={{ fontSize: '0.75rem', padding: '6px 12px' }}
            >
              {editingCgpa ? "Cancel" : "Update Targets"}
            </button>
          </div>

          {editingCgpa && (
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', alignItems: 'flex-end', animation: 'popUp 0.2s ease' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>CURRENT CGPA</label>
                <input 
                  type="number" 
                  step="0.01" 
                  className="cyber-input" 
                  style={{ width: '100px', padding: '6px' }}
                  value={cgpaInput}
                  onChange={(e) => setCgpaInput(e.target.value)}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginBottom: '4px' }}>TARGET CGPA</label>
                <input 
                  type="number" 
                  step="0.01" 
                  className="cyber-input" 
                  style={{ width: '100px', padding: '6px' }}
                  value={targetInput}
                  onChange={(e) => setTargetInput(e.target.value)}
                />
              </div>

              <button 
                onClick={handleUpdateCgpa}
                className="cyber-btn cyber-btn-primary"
                style={{ padding: '8px 16px' }}
              >
                <Check size={16} /> Save
              </button>
            </div>
          )}
        </div>

        {/* Overall Attendance Card */}
        <div className="glass-panel glass-card-glow-academics" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
            {/* Simple Circular Progress Bar */}
            <svg style={{ transform: 'rotate(-90deg)', width: '100px', height: '100px' }}>
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(0,0,0,0.05)" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="40" 
                fill="transparent" 
                stroke="var(--area-academics)" 
                strokeWidth="8" 
                strokeDasharray={2 * Math.PI * 40}
                strokeDashoffset={2 * Math.PI * 40 - (overallAttendance / 100) * (2 * Math.PI * 40)}
                strokeLinecap="round"
              />
            </svg>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem' }}>
              {overallAttendance}%
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em' }}>LECTURE ATTENDANCE RATING</span>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', margin: '4px 0', color: 'var(--color-text-primary)' }}>
              {overallAttendance >= 75 ? "Optimal Subject Health" : "CRITICAL ATTENDANCE WARN"}
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
              {overallAttendance >= 75 
                ? "Your lecture ratio is above the 75% SRM threshold. Great academic consistency." 
                : "Warning: Your average attendance has fallen below 75%. Prioritize upcoming lectures!"}
            </p>
          </div>
        </div>

      </div>

      {/* Subjects Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem' }}>Subject Health Monitors</h3>
          
          <form onSubmit={handleAddSubject} style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="Add new subject node..." 
              className="cyber-input"
              style={{ width: '200px', padding: '6px 12px', fontSize: '0.85rem' }}
              value={newSubName}
              onChange={(e) => setNewSubName(e.target.value)}
            />
            <button type="submit" className="cyber-btn" style={{ padding: '6px 12px' }}><Plus size={16} /> Add</button>
          </form>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
          {subjects.map((sub, index) => (
            <div key={index} className="glass-panel glass-card-glow-academics" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub.name}</span>
                <button 
                  onClick={() => handleRemoveSubject(sub.name)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                  hover-color="#f43f5e"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Progress visual */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Attendance Health</span>
                  <span style={{ 
                    fontWeight: 700, 
                    color: sub.health >= 75 ? 'var(--area-academics)' : 'var(--area-health)' 
                  }}>{sub.health}%</span>
                </div>
                
                <div style={{ width: '100%', height: '6px', background: 'rgba(0,0,0,0.04)', borderRadius: '999px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                  <div style={{ 
                    width: `${sub.health}%`, 
                    height: '100%', 
                    background: sub.health >= 75 ? 'var(--area-academics)' : 'var(--area-health)',
                    borderRadius: '999px' 
                  }}></div>
                </div>
                
                <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                  Logged Lectures: <strong>{sub.attendedCount}</strong> / {sub.classCount} attended
                </p>
              </div>

              {/* Log actions */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--color-border)', paddingTop: '10px' }}>
                <button 
                  onClick={() => handleLogAttendance(sub.name, true)}
                  className="cyber-btn"
                  style={{ flex: 1, padding: '4px 8px', fontSize: '0.7rem', justifyContent: 'center', borderColor: 'rgba(16, 185, 129, 0.3)', color: 'var(--area-academics)' }}
                >
                  Attended
                </button>
                <button 
                  onClick={() => handleLogAttendance(sub.name, false)}
                  className="cyber-btn"
                  style={{ flex: 1, padding: '4px 8px', fontSize: '0.7rem', justifyContent: 'center', borderColor: 'rgba(244, 63, 94, 0.3)', color: 'var(--area-health)' }}
                >
                  Missed
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
