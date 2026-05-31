import React, { useState } from 'react';
import { Database, Plus, Trash2, Search, Calendar, Sparkles, BookOpen } from 'lucide-react';

export default function KnowledgeVault({ state, updateState, awardXP }) {
  const { notes } = state;
  const [selectedNoteId, setSelectedNoteId] = useState(notes[0]?.id || null);
  const [searchText, setSearchText] = useState('');

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('# New Note\n\nWrite some details here...');
  const [newArea, setNewArea] = useState('research');

  const selectedNote = notes.find(n => n.id === selectedNoteId) || notes[0];

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newNote = {
      id: 'n_' + Date.now(),
      title: newTitle,
      content: newContent,
      date: new Date().toISOString().split('T')[0],
      area: newArea,
      tags: ["note"]
    };

    updateState(prev => ({
      ...prev,
      notes: [newNote, ...prev.notes]
    }));

    setSelectedNoteId(newNote.id);
    setNewTitle('');
    setNewContent('# New Note\n\nWrite some details here...');
    awardXP(15, `Saved Knowledge Note: "${newTitle}"`);
  };

  const handleRemoveNote = (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      updateState(prev => ({
        ...prev,
        notes: prev.notes.filter(n => n.id !== noteId)
      }));
      const remaining = notes.filter(n => n.id !== noteId);
      setSelectedNoteId(remaining[0]?.id || null);
    }
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchText.toLowerCase()) || 
    n.content.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Database size={28} color="var(--area-research)" /> Personal Knowledge Vault
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Store academic lecture records, ML technical summaries, and language vocab logs in a lightning-fast PKM hub.
        </p>
      </div>

      {/* Main split layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gap: '24px' }}>
        
        {/* Left Side: Note List & Note Creator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Note List */}
          <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--color-text-muted)' }} />
              <input 
                type="text" 
                placeholder="Search notes or keywords..." 
                className="cyber-input"
                style={{ paddingLeft: '38px', fontSize: '0.85rem' }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

            {/* Note Listing */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', maxHeight: '280px', paddingRight: '4px' }}>
              {filteredNotes.map(n => {
                const isActive = selectedNote?.id === n.id;
                return (
                  <div
                    key={n.id}
                    onClick={() => setSelectedNoteId(n.id)}
                    className="glass-panel"
                    style={{ 
                      padding: '10px 14px', 
                      cursor: 'pointer',
                      background: isActive ? 'rgba(139, 92, 246, 0.08)' : 'rgba(15, 23, 42, 0.4)',
                      borderColor: isActive ? '#8b5cf6' : 'rgba(255,255,255,0.03)',
                      borderLeft: `3px solid ${isActive ? '#8b5cf6' : 'transparent'}`,
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h4 style={{ fontWeight: 700, fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: isActive ? '#8b5cf6' : '#fff' }}>{n.title}</h4>
                      <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>{n.date} ● {n.area}</span>
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveNote(n.id);
                      }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', marginLeft: '8px' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Add Note Form */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={16} color="var(--area-research)" /> Add Knowledge Note
            </h3>

            <form onSubmit={handleAddNote} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <input 
                  type="text" 
                  placeholder="Note Title..." 
                  className="cyber-input" 
                  style={{ fontSize: '0.85rem' }}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div>
                <select 
                  className="cyber-select"
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  style={{ fontSize: '0.85rem', padding: '8px' }}
                >
                  <option value="research">AI/ML Research</option>
                  <option value="academics">Academics</option>
                  <option value="dsa">DSA & Algorithms</option>
                  <option value="personal">Personal / Language</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="cyber-btn cyber-btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
              >
                <Sparkles size={14} /> Create Node (+15 XP)
              </button>
            </form>
          </div>

        </div>

        {/* Right Side: Note details viewer / editor */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {selectedNote ? (
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '380px' }}>
              <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '12px' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>ORGANIZED IN AREA: {selectedNote.area.toUpperCase()} ● CREATED: {selectedNote.date}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: '#8b5cf6', marginTop: '4px' }}>{selectedNote.title}</h3>
              </div>

              {/* Note Content Input / Editor */}
              <textarea 
                className="cyber-input"
                style={{ 
                  flex: 1, 
                  background: 'transparent', 
                  border: 'none', 
                  resize: 'none', 
                  fontFamily: 'monospace', 
                  fontSize: '0.85rem', 
                  lineHeight: '1.5',
                  padding: 0,
                  boxShadow: 'none'
                }}
                rows="12"
                value={selectedNote.content}
                onChange={(e) => {
                  const updatedVal = e.target.value;
                  updateState(prev => ({
                    ...prev,
                    notes: prev.notes.map(n => n.id === selectedNote.id ? { ...n, content: updatedVal } : n)
                  }));
                }}
              ></textarea>

            </div>
          ) : (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)', minHeight: '380px' }}>
              No note selected. Formulate or choose one from the left ledger to review its compilation vectors.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
