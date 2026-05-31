import React, { useState } from 'react';
import { Flame, Plus, Trash2, Check, Sparkles, Award } from 'lucide-react';

export default function Habits({ state, updateState, awardXP }) {
  const { habits, habitLogs } = state;
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitArea, setNewHabitArea] = useState('dsa');
  const [newHabitFreq, setNewHabitFreq] = useState('daily');
  const [newHabitXp, setNewHabitXp] = useState('10');

  const todayStr = new Date().toISOString().split('T')[0];

  const handleToggleHabit = (habitId) => {
    const logs = habitLogs[habitId] || {};
    const isCompletedToday = logs[todayStr] === true;

    updateState(prev => {
      const updatedLogs = { ...prev.habitLogs };
      const habitObj = prev.habits.find(h => h.id === habitId);
      
      let updatedStreak = habitObj.streak;
      let newLoggedDate = habitObj.lastLogged;

      if (isCompletedToday) {
        // Uncompleting habit
        updatedLogs[habitId] = { ...logs, [todayStr]: false };
        updatedStreak = Math.max(0, updatedStreak - 1);
        newLoggedDate = "";
      } else {
        // Completing habit
        updatedLogs[habitId] = { ...logs, [todayStr]: true };
        updatedStreak += 1;
        newLoggedDate = todayStr;
        
        // Award XP!
        setTimeout(() => awardXP(habitObj.xpValue, `Completed Daily Habit: "${habitObj.name}"`), 100);
      }

      const updatedHabits = prev.habits.map(h => {
        if (h.id === habitId) {
          return {
            ...h,
            streak: updatedStreak,
            lastLogged: newLoggedDate
          };
        }
        return h;
      });

      return {
        ...prev,
        habits: updatedHabits,
        habitLogs: updatedLogs
      };
    });
  };

  const handleAddHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit = {
      id: 'h_' + Date.now(),
      name: newHabitName,
      area: newHabitArea,
      streak: 0,
      lastLogged: "",
      frequency: newHabitFreq,
      xpValue: parseInt(newHabitXp) || 10
    };

    updateState(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit]
    }));

    setNewHabitName('');
    awardXP(15, `Initialized High-Impact Habit Node: "${newHabitName}"`);
  };

  const handleRemoveHabit = (habitId) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      updateState(prev => ({
        ...prev,
        habits: prev.habits.filter(h => h.id !== habitId)
      }));
    }
  };

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Flame size={28} color="#f43f5e" /> High-Impact Habit Center
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Log your core daily habits to earn XP progression. Eliminate low-impact routines and focus on consistency.
        </p>
      </div>

      {/* Split view */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '24px' }}>
        
        {/* Habit Checklist grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={20} color="#f43f5e" /> Active Core Routines
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {habits.map((habit) => {
              const logs = habitLogs[habit.id] || {};
              const isCompletedToday = logs[todayStr] === true || habit.lastLogged === todayStr;
              
              // Map areas to color codes
              const colorMaps = {
                academics: 'var(--area-academics)',
                dsa: 'var(--area-dsa)',
                research: 'var(--area-research)',
                health: 'var(--area-health)',
                leadership: 'var(--area-leadership)',
                career: 'var(--area-career)',
                personal: 'var(--area-personal)',
              };
              const activeColor = colorMaps[habit.area] || 'var(--color-text-secondary)';

              return (
                <div 
                  key={habit.id} 
                  className="glass-panel" 
                  style={{ 
                    padding: '16px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    borderLeft: `4px solid ${activeColor}`,
                    minHeight: '140px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600 }}>{habit.frequency} ● #{habit.area}</span>
                      <h4 style={{ fontWeight: 700, fontSize: '1rem', marginTop: '4px', color: isCompletedToday ? 'var(--color-text-secondary)' : '#fff', textDecoration: isCompletedToday ? 'line-through' : 'none' }}>
                        {habit.name}
                      </h4>
                    </div>

                    <button 
                      onClick={() => handleRemoveHabit(habit.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  {/* Actions & Streaks */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '10px', marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--area-leadership)' }}>
                      <Flame size={16} className="animate-float" />
                      <span>{habit.streak}d streak</span>
                    </div>

                    <button 
                      onClick={() => handleToggleHabit(habit.id)}
                      className="cyber-btn"
                      style={{ 
                        padding: '6px 12px', 
                        fontSize: '0.75rem', 
                        background: isCompletedToday ? 'rgba(16, 185, 129, 0.15)' : 'transparent',
                        borderColor: isCompletedToday ? 'var(--area-academics)' : 'rgba(255,255,255,0.1)',
                        color: isCompletedToday ? 'var(--area-academics)' : 'var(--color-text-secondary)'
                      }}
                    >
                      {isCompletedToday ? (
                        <>
                          <Check size={14} /> Completed
                        </>
                      ) : (
                        `+${habit.xpValue} XP`
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Habit Creator Panel */}
        <div className="glass-panel" style={{ padding: '24px', height: 'fit-content' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={20} color="#f43f5e" /> Initialize Habit Node
          </h3>

          <form onSubmit={handleAddHabit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>NAME</label>
              <input 
                type="text" 
                placeholder="e.g. Solve 3 DP Problems" 
                className="cyber-input" 
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>LIFE AREA</label>
                <select 
                  className="cyber-select"
                  value={newHabitArea}
                  onChange={(e) => setNewHabitArea(e.target.value)}
                >
                  <option value="dsa">DSA & Coding</option>
                  <option value="health">Fitness / Health</option>
                  <option value="research">AI/ML Research</option>
                  <option value="personal">Personal / Language</option>
                  <option value="career">Career / LinkedIn</option>
                  <option value="academics">Academics</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>FREQUENCY</label>
                <select 
                  className="cyber-select"
                  value={newHabitFreq}
                  onChange={(e) => setNewHabitFreq(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>AWARD XP ON COMPLETE</label>
              <select 
                className="cyber-select"
                value={newHabitXp}
                onChange={(e) => setNewHabitXp(e.target.value)}
              >
                <option value="5">5 XP (Low difficulty)</option>
                <option value="10">10 XP (Medium difficulty)</option>
                <option value="15">15 XP (High difficulty)</option>
                <option value="25">25 XP (Exceptional milestone)</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="cyber-btn cyber-btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: '4px' }}
            >
              <Sparkles size={16} /> Deploy Habit Node (+15 XP)
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
