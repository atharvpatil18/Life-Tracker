import React, { useState } from 'react';
import { Save, RefreshCw, Key, Code, Sparkles, Check } from 'lucide-react';
import { defaultState } from '../utils/mockData';

const Github = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function SettingsTab({ state, updateState }) {
  const [geminiKey, setGeminiKey] = useState(state.settings.geminiApiKey || '');
  const [ghUser, setGhUser] = useState(state.settings.githubUsername || '');
  const [lcUser, setLcUser] = useState(state.settings.leetcodeUsername || '');
  const [profileName, setProfileName] = useState(state.profile.name || '');
  const [profileTitle, setProfileTitle] = useState(state.profile.title || '');
  const [savedMsg, setSavedMsg] = useState(false);

  const handleSave = () => {
    updateState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        geminiApiKey: geminiKey,
        githubUsername: ghUser,
        leetcodeUsername: lcUser,
      },
      profile: {
        ...prev.profile,
        name: profileName,
        title: profileTitle,
      }
    }));
    
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to restore default mock data? This will overwrite your current logs.")) {
      updateState(() => defaultState);
      setGeminiKey(defaultState.settings.geminiApiKey);
      setGhUser(defaultState.settings.githubUsername);
      setLcUser(defaultState.settings.leetcodeUsername);
      setProfileName(defaultState.profile.name);
      setProfileTitle(defaultState.profile.title);
    }
  };

  return (
    <div className="animate-pop-up" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', marginBottom: '8px' }}>
          System Settings & Integrations
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Configure your Gemini intelligence layer, link LeetCode and GitHub profiles, and customize your growth twin parameters.
        </p>
      </div>

      {/* Profile settings */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', color: '#c084fc', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={20} /> Personal Profile
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>CHARACTER NAME</label>
            <input 
              type="text" 
              className="cyber-input" 
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>CURRENT TITLE</label>
            <input 
              type="text" 
              className="cyber-input" 
              value={profileTitle}
              onChange={(e) => setProfileTitle(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Gemini Integration */}
      <div className="glass-panel shadow-academics" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Key size={20} /> Gemini Core API Configuration
        </h3>
        
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
          By entering your personal Google Gemini API key, the <strong>AI Coach</strong> will use actual generative AI to analyze your dashboard, logs, habits, and journals. 
          Your key is saved locally in your browser's secure cache (<code>localStorage</code>) and is sent directly to Google's API endpoints.
        </p>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600 }}>GEMINI API KEY</label>
          <input 
            type="password" 
            placeholder="AIzaSy..." 
            className="cyber-input" 
            value={geminiKey}
            onChange={(e) => setGeminiKey(e.target.value)}
            style={{ fontFamily: 'monospace' }}
          />
        </div>
      </div>

      {/* GitHub & LeetCode username settings */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code size={20} /> Live Developer Profiles
        </h3>
        
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
          AtharvOS connects to public developer APIs to pull statistics. Scrapers and GraphQL parsers query solve totals and project contributions.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Github size={14} /> GITHUB USERNAME
            </label>
            <input 
              type="text" 
              placeholder="github_username" 
              className="cyber-input" 
              value={ghUser}
              onChange={(e) => setGhUser(e.target.value)}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '6px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Code size={14} /> LEETCODE USERNAME
            </label>
            <input 
              type="text" 
              placeholder="leetcode_username" 
              className="cyber-input" 
              value={lcUser}
              onChange={(e) => setLcUser(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          onClick={handleReset} 
          className="cyber-btn"
          style={{ borderColor: 'rgba(244, 63, 94, 0.3)', color: '#f43f5e' }}
        >
          <RefreshCw size={16} /> Restore Default Mock Data
        </button>

        <button 
          onClick={handleSave} 
          className="cyber-btn cyber-btn-primary"
        >
          {savedMsg ? (
            <>
              <Check size={16} /> Config Saved!
            </>
          ) : (
            <>
              <Save size={16} /> Save Changes
            </>
          )}
        </button>
      </div>

    </div>
  );
}
