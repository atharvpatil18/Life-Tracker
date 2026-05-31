import React, { useState } from 'react';
import { BookOpen, Search, Tag, Plus, Trash2, Calendar, HelpCircle, Sparkles } from 'lucide-react';

export default function Journal({ state, updateState, awardXP }) {
  const { journal } = state;
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [newContent, setNewContent] = useState('');
  const [tagsInput, setTagsInput] = useState('Learning');

  const availableTags = ["Learning", "Career", "Relationship", "Family", "Health", "Idea", "Project", "reflection", "research"];

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const newEntry = {
      id: 'j_' + Date.now(),
      content: newContent,
      date: new Date().toISOString().split('T')[0],
      tags: [tagsInput.toLowerCase()]
    };

    updateState(prev => ({
      ...prev,
      journal: [newEntry, ...prev.journal]
    }));

    setNewContent('');
    awardXP(10, `Saved Reflection Log under tag: #${tagsInput}`);
  };

  const handleRemoveEntry = (entryId) => {
    if (window.confirm("Are you sure you want to delete this journal entry?")) {
      updateState(prev => ({
        ...prev,
        journal: prev.journal.filter(j => j.id !== entryId)
      }));
    }
  };

  const filteredEntries = journal.filter(entry => {
    const matchesSearch = entry.content.toLowerCase().includes(searchText.toLowerCase());
    const matchesTag = selectedTag ? entry.tags.includes(selectedTag.toLowerCase()) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary)' }}>
          <BookOpen size={28} color="var(--area-personal)" /> Smart Growth Journal
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          A secure self-reflective logbook. Categorize entries with functional tags to feed your AI Coach.
        </p>
      </div>

      {/* Main split viewport */}
      <div style={{ display: 'grid', gridTemplateColumns: '4fr 5fr', gap: '24px' }}>
        
        {/* Left Pane: Past Logs with Search Filters */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* Search bar */}
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search past logs or keywords..." 
              className="cyber-input"
              style={{ paddingLeft: '38px', fontSize: '0.85rem' }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>

          {/* Tags filter chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <button 
              onClick={() => setSelectedTag('')}
              style={{ 
                fontSize: '0.7rem', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--color-border)', cursor: 'pointer',
                background: selectedTag === '' ? 'var(--area-dsa-glow)' : 'transparent',
                color: selectedTag === '' ? 'var(--area-dsa)' : 'var(--color-text-secondary)'
              }}
            >
              All Tags
            </button>
            {availableTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                style={{ 
                  fontSize: '0.7rem', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--color-border)', cursor: 'pointer',
                  background: selectedTag === tag ? 'var(--area-dsa-glow)' : 'transparent',
                  color: selectedTag === tag ? 'var(--area-dsa)' : 'var(--color-text-secondary)'
                }}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Logs timeline list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: '420px', paddingRight: '4px' }}>
            {filteredEntries.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                No entries match the active search parameters.
              </div>
            ) : (
              filteredEntries.map(entry => (
                <div key={entry.id} style={{ padding: '12px 14px', background: 'rgba(0,0,0,0.01)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={12} /> {entry.date}
                    </span>
                    <button 
                      onClick={() => handleRemoveEntry(entry.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)', lineHeight: '1.4', whiteSpace: 'pre-wrap' }}>{entry.content}</p>
                  
                  <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                    {entry.tags.map(t => (
                      <span key={t} style={{ fontSize: '0.65rem', background: 'var(--area-dsa-glow)', border: '1px solid rgba(194, 65, 12, 0.15)', color: 'var(--area-dsa)', padding: '1px 6px', borderRadius: '4px' }}>
                        #{t}
                      </span>
                    ))}
                  </div>

                </div>
              ))
            )}
          </div>

        </div>

        {/* Right Pane: Smart Writer with Prompts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Reflective Prompt Card */}
          <div className="glass-panel" style={{ padding: '16px', display: 'flex', gap: '12px', alignItems: 'flex-start', borderLeft: '4px solid var(--area-personal)', borderColor: 'var(--area-personal)' }}>
            <HelpCircle size={20} color="var(--area-personal)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', tracking: '0.05em' }}>AI REFLECTION PROMPT</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)', marginTop: '4px', lineHeight: '1.4' }}>
                "Today you finished logging attendance and pushed code updates. Write down what technical blockers you bypassed and how it impacts your career goals."
              </p>
            </div>
          </div>

          {/* Smart Editor */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-primary)' }}>
              <Sparkles size={20} color="var(--area-personal)" /> Write Reflection Log
            </h3>

            <form onSubmit={handleAddEntry} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>TAG VECTOR</label>
                <select 
                  className="cyber-select" 
                  value={tagsInput} 
                  onChange={(e) => setTagsInput(e.target.value)}
                >
                  {availableTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '6px' }}>JOURNAL CONTENT</label>
                <textarea 
                  className="cyber-input" 
                  rows="6"
                  style={{ resize: 'none', fontSize: '0.85rem', lineHeight: '1.4' }}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Record insights, breakthroughs, struggles or moods today..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="cyber-btn cyber-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Compile Entry to Vault (+10 XP)
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
