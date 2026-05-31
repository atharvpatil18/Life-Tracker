import React, { useState } from 'react';
import { FileBarChart2, Printer, Award, BookOpen, Cpu, GraduationCap, Flame, Sparkles } from 'lucide-react';

export default function AnnualReport({ state }) {
  const [biggestAch, setBiggestAch] = useState("Published CrowdSense AI Research Paper in leading journal");
  const [biggestLesson, setBiggestLesson] = useState("Consistency > Intensity. Small, regular actions build massive compounds.");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileBarChart2 size={28} color="var(--area-research)" /> Annual Life Growth Report
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
            Collate your metrics, reflect on high-impact accomplishments, and print a physical performance summary sheet.
          </p>
        </div>

        <button 
          onClick={handlePrint}
          className="cyber-btn cyber-btn-primary"
          style={{ padding: '8px 16px' }}
        >
          <Printer size={16} /> Export / Print Report
        </button>
      </div>

      {/* Main printable report body */}
      <div id="annual-report-print-area" className="glass-panel" style={{ padding: '40px', background: '#ffffff', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '32px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
        
        {/* Branding header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--area-research)', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', letterSpacing: '-0.025em' }}>
              Atharv<span style={{ color: 'var(--area-research)' }}>OS</span> Annual Performance Report
            </h1>
            <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', letterSpacing: '0.05em', marginTop: '2px' }}>
              GROWTH METRICS AUDIT LEDGER ● YEAR 2026
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.95rem', fontFamily: 'var(--font-display)', color: 'var(--color-text-secondary)' }}>CHARACTER LEVEL</span>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--area-research)', fontFamily: 'var(--font-display)', lineHeight: '1' }}>{state.profile.level}</div>
          </div>
        </div>

        {/* Dynamic Metric summaries grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          
          <div style={{ padding: '16px', background: 'var(--color-bg-base)', borderRadius: '8px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
            <GraduationCap size={20} color="var(--area-academics)" style={{ margin: '0 auto 8px auto' }} />
            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block' }}>SRM CGPA</span>
            <strong style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>{state.academicMetrics.cgpa.toFixed(2)}</strong>
          </div>

          <div style={{ padding: '16px', background: 'var(--color-bg-base)', borderRadius: '8px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
            <Flame size={20} color="var(--area-dsa)" style={{ margin: '0 auto 8px auto' }} />
            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block' }}>LEETCODE SOLVED</span>
            <strong style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>{state.dsaMetrics.solvedCount}</strong>
          </div>

          <div style={{ padding: '16px', background: 'var(--color-bg-base)', borderRadius: '8px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
            <Cpu size={20} color="var(--area-research)" style={{ margin: '0 auto 8px auto' }} />
            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block' }}>PAPERS READ</span>
            <strong style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>{state.aimlMetrics.papersReadCount}</strong>
          </div>

          <div style={{ padding: '16px', background: 'var(--color-bg-base)', borderRadius: '8px', border: '1px solid var(--color-border)', textAlign: 'center' }}>
            <Award size={20} color="var(--area-career)" style={{ margin: '0 auto 8px auto' }} />
            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block' }}>RESUME SCORE</span>
            <strong style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>{state.careerMetrics.resumeScore}%</strong>
          </div>

        </div>

        {/* Written summaries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
          
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--area-research)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Award size={18} /> BIGGEST ARCHIEVEMENT
            </h3>
            
            <textarea 
              className="cyber-input no-print"
              rows="2"
              value={biggestAch}
              onChange={(e) => setBiggestAch(e.target.value)}
              style={{ fontSize: '0.9rem', resize: 'none' }}
            />
            <p className="print-only" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>{biggestAch}</p>
          </div>

          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--area-research)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <BookOpen size={18} /> BIGGEST LIFE LESSON
            </h3>
            
            <textarea 
              className="cyber-input no-print"
              rows="2"
              value={biggestLesson}
              onChange={(e) => setBiggestLesson(e.target.value)}
              style={{ fontSize: '0.9rem', resize: 'none' }}
            />
            <p className="print-only" style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>{biggestLesson}</p>
          </div>

        </div>

        {/* Sign-off area */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--color-border)', paddingTop: '24px', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          <span>Compiled under AtharvOS Node 14.8.2</span>
          <span>Verified Signature: _______________________</span>
        </div>

      </div>

    </div>
  );
}
