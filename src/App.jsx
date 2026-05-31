import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, GraduationCap, Briefcase, Code2, 
  BrainCircuit, Users, Heart, Compass, LineChart, 
  CheckSquare, Milestone, BookOpen, Database, GitFork, 
  Flame, Bot, Award, FolderKanban, FileBarChart2, Settings,
  Sparkles, CheckCircle2, ChevronRight
} from 'lucide-react';
import { defaultState } from './utils/mockData';

// Component imports
import Dashboard from './components/Dashboard';
import Academics from './components/Academics';
import Career from './components/Career';
import DSAPrep from './components/DSAPrep';
import AIMLResearch from './components/AIMLResearch';
import Leadership from './components/Leadership';
import PersonalLife from './components/PersonalLife';
import VisionBoard from './components/VisionBoard';
import GrowthAnalytics from './components/GrowthAnalytics';
import WeeklyReview from './components/WeeklyReview';
import Timeline from './components/Timeline';
import Journal from './components/Journal';
import KnowledgeVault from './components/KnowledgeVault';
import DecisionJournal from './components/DecisionJournal';
import Habits from './components/Habits';
import AICoach from './components/AICoach';
import PlacementIndex from './components/PlacementIndex';
import ProjectTracker from './components/ProjectTracker';
import AnnualReport from './components/AnnualReport';
import SettingsTab from './components/Settings';

export default function App() {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('atharv_os_state');
    return saved ? JSON.parse(saved) : defaultState;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [xpNotification, setXpNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('atharv_os_state', JSON.stringify(state));
  }, [state]);

  // Global XP Helper
  const awardXP = (amount, reason) => {
    setState(prev => {
      let newXp = prev.profile.xp + amount;
      let newLevel = prev.profile.level;
      let levelUp = false;
      
      if (newXp >= prev.profile.xpForNextLevel) {
        newXp = newXp - prev.profile.xpForNextLevel;
        newLevel += 1;
        levelUp = true;
      }
      
      const titles = ["Student", "Apprentice", "Coder", "Builder", "Tech Lead", "Engineer", "Elite Builder", "Product Architect", "Elite Creator"];
      const newTitle = titles[Math.min(Math.floor(newLevel / 5), titles.length - 1)];

      // Add dynamic experience log entry
      const newXpLog = {
        id: 'xp_' + Date.now(),
        xpChange: amount,
        reason,
        date: new Date().toISOString().split('T')[0]
      };

      // Show floating notification
      setXpNotification({ amount, reason, levelUp, level: newLevel });
      setTimeout(() => setXpNotification(null), 3500);

      // Add to achievements if certain thresholds are hit
      const updatedAchievements = [...prev.achievements];
      if (levelUp && newLevel === 15) {
        updatedAchievements.push({
          id: 'ach_lvl15',
          title: "Ascended Tech Leader",
          desc: "Reached Character Level 15 in AtharvOS",
          icon: "Sparkles",
          dateUnlocked: new Date().toISOString().split('T')[0]
        });
      }

      return {
        ...prev,
        profile: {
          ...prev.profile,
          xp: newXp,
          level: newLevel,
          title: newTitle
        },
        achievements: updatedAchievements
      };
    });
  };

  const updateState = (updater) => {
    setState(prev => {
      const updated = updater(prev);
      return updated;
    });
  };

  // Nav Items configuration
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'core' },
    { id: 'habits', label: 'Habits Tracker', icon: Flame, category: 'core' },
    { id: 'tasks', label: 'Task Board', icon: FolderKanban, category: 'core' },
    { id: 'ai-coach', label: 'AI Coach', icon: Bot, category: 'core' },
    
    { id: 'academics', label: 'Academics', icon: GraduationCap, category: 'life' },
    { id: 'dsa', label: 'DSA Prep', icon: Code2, category: 'life' },
    { id: 'research', label: 'AI/ML & Research', icon: BrainCircuit, category: 'life' },
    { id: 'career', label: 'Career & OS', icon: Briefcase, category: 'life' },
    { id: 'leadership', label: 'Leadership', icon: Users, category: 'life' },
    { id: 'personal', label: 'Personal Life', icon: Heart, category: 'life' },
    
    { id: 'vision', label: 'Vision Board', icon: Compass, category: 'strategy' },
    { id: 'placement-index', label: 'Placement Index (PRI)', icon: Award, category: 'strategy' },
    { id: 'decision', label: 'Decision Journal', icon: GitFork, category: 'strategy' },
    
    { id: 'journal', label: 'Smart Journal', icon: BookOpen, category: 'reflection' },
    { id: 'vault', label: 'Knowledge Vault', icon: Database, category: 'reflection' },
    { id: 'weekly-review', label: 'Weekly Review', icon: CheckSquare, category: 'reflection' },
    { id: 'timeline', label: 'Life Timeline', icon: Milestone, category: 'reflection' },
    { id: 'analytics', label: 'Growth Analytics', icon: LineChart, category: 'reflection' },
    { id: 'annual-report', label: 'Annual Report', icon: FileBarChart2, category: 'reflection' },
    
    { id: 'settings', label: 'Settings & APIs', icon: Settings, category: 'system' }
  ];

  // Render active component
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard state={state} awardXP={awardXP} updateState={updateState} setActiveTab={setActiveTab} />;
      case 'academics':
        return <Academics state={state} updateState={updateState} awardXP={awardXP} />;
      case 'career':
        return <Career state={state} updateState={updateState} awardXP={awardXP} />;
      case 'dsa':
        return <DSAPrep state={state} updateState={updateState} awardXP={awardXP} />;
      case 'research':
        return <AIMLResearch state={state} updateState={updateState} awardXP={awardXP} />;
      case 'leadership':
        return <Leadership state={state} updateState={updateState} awardXP={awardXP} />;
      case 'personal':
        return <PersonalLife state={state} updateState={updateState} awardXP={awardXP} />;
      case 'vision':
        return <VisionBoard state={state} updateState={updateState} awardXP={awardXP} />;
      case 'analytics':
        return <GrowthAnalytics state={state} />;
      case 'weekly-review':
        return <WeeklyReview state={state} updateState={updateState} awardXP={awardXP} />;
      case 'timeline':
        return <Timeline state={state} />;
      case 'journal':
        return <Journal state={state} updateState={updateState} awardXP={awardXP} />;
      case 'vault':
        return <KnowledgeVault state={state} updateState={updateState} awardXP={awardXP} />;
      case 'decision':
        return <DecisionJournal state={state} updateState={updateState} awardXP={awardXP} />;
      case 'habits':
        return <Habits state={state} updateState={updateState} awardXP={awardXP} />;
      case 'ai-coach':
        return <AICoach state={state} updateState={updateState} />;
      case 'placement-index':
        return <PlacementIndex state={state} updateState={updateState} awardXP={awardXP} />;
      case 'tasks':
        return <ProjectTracker state={state} updateState={updateState} awardXP={awardXP} />;
      case 'annual-report':
        return <AnnualReport state={state} />;
      case 'settings':
        return <SettingsTab state={state} updateState={updateState} />;
      default:
        return <Dashboard state={state} awardXP={awardXP} updateState={updateState} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* Sidebar Navigation */}
      <aside className="os-sidebar">
        {/* Branding header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingLeft: '8px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            width: '36px', height: '36px', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(139, 92, 246, 0.4)'
          }}>
            <Sparkles size={20} color="#fff" />
          </div>
          <div>
            <h1 className="logo-text" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', tracking: '-0.025em', display: 'flex', alignItems: 'center', gap: '4px' }}>
              Atharv<span style={{ color: '#8b5cf6' }}>OS</span>
            </h1>
            <p className="logo-text" style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', tracking: '0.05em', fontWeight: 600 }}>Digital Growth Twin</p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="glass-panel" style={{ padding: '12px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={state.profile.avatar} 
              alt={state.profile.name} 
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(168, 85, 247, 0.4)' }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{state.profile.name}</p>
              <p style={{ fontSize: '0.7rem', color: '#c084fc', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                {state.profile.title}
              </p>
            </div>
            <div className="level-badge">Lvl {state.profile.level}</div>
          </div>
          
          {/* XP Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', marginBottom: '3px', color: 'var(--color-text-secondary)' }}>
              <span>Experience (XP)</span>
              <span>{state.profile.xp} / {state.profile.xpForNextLevel} XP</span>
            </div>
            <div style={{ width: '100%', height: '5px', background: 'rgba(15, 23, 42, 0.8)', borderRadius: '999px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ 
                width: `${(state.profile.xp / state.profile.xpForNextLevel) * 100}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, #7c3aed 0%, #c084fc 100%)',
                boxShadow: '0 0 8px rgba(168, 85, 247, 0.6)',
                transition: 'width 0.5s ease-out' 
              }}></div>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px', paddingRight: '4px' }}>
          
          <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', tracking: '0.1em', fontWeight: 700, margin: '8px 0 4px 8px' }} className="nav-label">Core Modules</div>
          {navItems.filter(item => item.category === 'core').map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: active ? 600 : 500, textAlign: 'left',
                  background: active ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                  color: active ? '#3b82f6' : 'var(--color-text-secondary)',
                  borderLeft: active ? '3px solid #3b82f6' : '3px solid transparent',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="nav-btn"
              >
                <Icon size={18} style={{ color: active ? '#3b82f6' : 'inherit' }} />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}

          <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', tracking: '0.1em', fontWeight: 700, margin: '12px 0 4px 8px' }} className="nav-label">Life Areas</div>
          {navItems.filter(item => item.category === 'life').map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: active ? 600 : 500, textAlign: 'left',
                  background: active ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
                  color: active ? '#8b5cf6' : 'var(--color-text-secondary)',
                  borderLeft: active ? '3px solid #8b5cf6' : '3px solid transparent',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="nav-btn"
              >
                <Icon size={18} style={{ color: active ? '#8b5cf6' : 'inherit' }} />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}

          <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', tracking: '0.1em', fontWeight: 700, margin: '12px 0 4px 8px' }} className="nav-label">Strategy & Goals</div>
          {navItems.filter(item => item.category === 'strategy').map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: active ? 600 : 500, textAlign: 'left',
                  background: active ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
                  color: active ? '#f59e0b' : 'var(--color-text-secondary)',
                  borderLeft: active ? '3px solid #f59e0b' : '3px solid transparent',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="nav-btn"
              >
                <Icon size={18} style={{ color: active ? '#f59e0b' : 'inherit' }} />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}

          <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', tracking: '0.1em', fontWeight: 700, margin: '12px 0 4px 8px' }} className="nav-label">Reflection & Vault</div>
          {navItems.filter(item => item.category === 'reflection').map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: active ? 600 : 500, textAlign: 'left',
                  background: active ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
                  color: active ? '#10b981' : 'var(--color-text-secondary)',
                  borderLeft: active ? '3px solid #10b981' : '3px solid transparent',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="nav-btn"
              >
                <Icon size={18} style={{ color: active ? '#10b981' : 'inherit' }} />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}

          <div style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', tracking: '0.1em', fontWeight: 700, margin: '12px 0 4px 8px' }} className="nav-label">System</div>
          {navItems.filter(item => item.category === 'system').map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: active ? 600 : 500, textAlign: 'left',
                  background: active ? 'rgba(255, 255, 255, 0.04)' : 'transparent',
                  color: active ? '#f9fafb' : 'var(--color-text-secondary)',
                  borderLeft: active ? '3px solid rgba(255,255,255,0.4)' : '3px solid transparent',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="nav-btn"
              >
                <Icon size={18} style={{ color: active ? '#f9fafb' : 'inherit' }} />
                <span className="nav-label">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="os-main-content" style={{ flex: 1 }}>
        {renderContent()}
      </main>

      {/* Floating XP Rewards Notification Toast */}
      {xpNotification && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'rgba(15, 10, 25, 0.85)',
          backdropFilter: 'blur(12px)',
          border: xpNotification.levelUp ? '2px solid #8b5cf6' : '1px solid rgba(168, 85, 247, 0.35)',
          borderRadius: '12px',
          padding: '16px',
          boxShadow: xpNotification.levelUp ? '0 0 25px rgba(139, 92, 246, 0.5)' : '0 8px 32px 0 rgba(168, 85, 247, 0.2)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          animation: 'popUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          {xpNotification.levelUp ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c084fc', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
                <Sparkles size={20} className="animate-float" />
                <span>LEVEL UP! ATHARV ASCENDED</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-primary)' }}>
                You have reached <strong style={{ color: '#a855f7' }}>Level {xpNotification.level}</strong>! Keep building!
              </p>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#a855f7', fontWeight: 700 }}>
                <CheckCircle2 size={18} color="#a855f7" />
                <span>+{xpNotification.amount} XP Awarded</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                Reason: {xpNotification.reason}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
