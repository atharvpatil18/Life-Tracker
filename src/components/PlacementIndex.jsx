import React, { useState } from 'react';
import { Award, Check, Sparkles, AlertCircle, PlayCircle, ShieldCheck, CheckSquare, Layers } from 'lucide-react';

export default function PlacementIndex({ state, updateState, awardXP }) {
  const { resumeScore, openSourcePrs } = state.careerMetrics;
  const { solvedCount, interviewReadiness, topicMastery } = state.dsaMetrics;
  const osSubject = state.academicMetrics.subjects.find(s => s.name.toLowerCase().includes('operating')) || { health: 70 };

  // Resume section checklist
  const [resumeChecks, setResumeChecks] = useState({
    education: true,
    projects: true,
    experience: false,
    skills: true,
    certifications: true,
    openSource: false
  });

  // CS Fundamentals mastery checklist
  const [fundamentals, setFundamentals] = useState({
    os: false,
    dbms: true,
    networks: false,
    coa: true,
    compiler: false
  });

  const handleToggleResumeCheck = (key) => {
    const newVal = !resumeChecks[key];
    setResumeChecks(prev => ({ ...prev, [key]: newVal }));
    
    // Dynamically increase resume score in global state
    updateState(prev => {
      const delta = newVal ? 4 : -4;
      return {
        ...prev,
        careerMetrics: {
          ...prev.careerMetrics,
          resumeScore: Math.max(0, Math.min(100, prev.careerMetrics.resumeScore + delta))
        }
      };
    });

    if (newVal) {
      awardXP(10, `Completed Resume Section Audit: #${key}`);
    }
  };

  const handleToggleFundamental = (key, name) => {
    const newVal = !fundamentals[key];
    setFundamentals(prev => ({ ...prev, [key]: newVal }));
    
    if (newVal) {
      awardXP(20, `Mastered CS Fundamentals node: "${name}"`);
    }
  };

  // Composite Calculation
  // Resume Quality Score (RQS): based on resume score + checked list count
  const resumeCheckedCount = Object.values(resumeChecks).filter(Boolean).length;
  const rqs = Math.min(resumeScore + resumeCheckedCount * 2, 100);

  // Skill Proficiency Score (SPS): based on solved count + interview readiness + fundamentals checked
  const fundamentalsCheckedCount = Object.values(fundamentals).filter(Boolean).length;
  const baseSps = (solvedCount / 350) * 50 + interviewReadiness * 0.4 + fundamentalsCheckedCount * 4;
  const sps = Math.round(Math.min(baseSps, 100));

  // Placement Readiness Index (PRI) Formula from literature
  const pri = Math.round(0.40 * rqs + 0.60 * sps);

  // Dynamic band mapping
  const getBandInfo = (score) => {
    if (score <= 40) return { label: "Beginner", color: "#f43f5e", tip: "Focus heavily on LeetCode counts and complete core resume segments." };
    if (score <= 75) return { label: "Intermediate Placement Ready", color: "#f59e0b", tip: "Improve core Operating Systems and Networking fundamentals to boost SPS." };
    return { label: "Elite Readiness Rank", color: "#10b981", tip: "Outstanding portfolio! Proceed with mock interviews and continue open source PRs." };
  };

  const band = getBandInfo(pri);

  // Determine weakest area dynamically
  const getWeakestArea = () => {
    if (solvedCount < 150) return { area: "DSA Solves Count", tip: "Increase your total questions solved to 300+", action: "Solve 5 DP & Graphs questions" };
    if (osSubject.health < 75 || !fundamentals.os) return { area: "Operating Systems", tip: "OS attendance or fundamental mastery is lagging", action: "Review OS notes in Vault or complete playlist" };
    if (!resumeChecks.experience) return { area: "Professional Internships", tip: "Resume lacks documented engineering experience", action: "Secure a research or industrial internship" };
    if (!fundamentals.networks) return { area: "Computer Networks", tip: "Networking fundamentals are unchecked", action: "Study TCP/IP & Socket programming" };
    return { area: "System Design", tip: "Boost structural architecture experience", action: "Review scalable backend configurations" };
  };

  const weakest = getWeakestArea();

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={28} color="var(--area-career)" /> Placement Readiness Index (PRI)
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Evaluate engineering employment capabilities. A predictive index combining resume scores and fundamental knowledge.
        </p>
      </div>

      {/* Main Composite Radial & Diagnostic Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Radial Index Gauge */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '32px' }}>
          <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
            {/* SVG Circle Gauge */}
            <svg style={{ transform: 'rotate(-90deg)', width: '130px', height: '130px' }}>
              <circle cx="65" cy="65" r="50" fill="transparent" stroke="rgba(0,0,0,0.05)" strokeWidth="10" />
              <circle 
                cx="65" cy="65" r="50" 
                fill="transparent" 
                stroke="url(#priGradient)" 
                strokeWidth="10" 
                strokeDasharray={2 * Math.PI * 50}
                strokeDashoffset={2 * Math.PI * 50 - (pri / 100) * (2 * Math.PI * 50)}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="priGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--area-leadership)" />
                  <stop offset="100%" stopColor="var(--area-academics)" />
                </linearGradient>
              </defs>
            </svg>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900 }}>{pri}%</span>
              <span style={{ fontSize: '0.55rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700 }}>READINESS</span>
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 700, tracking: '0.05em' }}>COMPOSITE PRI STATUS</span>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.4rem', color: band.color, margin: '4px 0' }}>
              {band.label}
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
              {band.tip}
            </p>
          </div>
        </div>

        {/* Diagnostic Panel */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderLeft: '4px solid var(--area-health)', borderColor: 'var(--area-health)' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', tracking: '0.05em', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <AlertCircle size={12} color="var(--area-health)" /> WEAKEST AREA IDENTIFIED
            </span>
            <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', marginTop: '6px', color: 'var(--color-text-primary)' }}>
              {weakest.area}
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
              Diagnostic node details: {weakest.tip}. This directly affects your SPS.
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.15)', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#f43f5e', marginTop: '10px' }}>
            <PlayCircle size={18} style={{ flexShrink: 0 }} />
            <span><strong>Suggested Action:</strong> {weakest.action}</span>
          </div>
        </div>

      </div>

      {/* Checklist Matrices */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Resume Core Segment checklists */}
        <div className="glass-panel glass-card-glow-career" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
            <ShieldCheck size={18} color="var(--area-career)" /> Resume Core Audits (RQS: {rqs}%)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(resumeChecks).map(([key, val]) => (
              <div 
                key={key} 
                onClick={() => handleToggleResumeCheck(key)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer', color: val ? 'var(--color-text-secondary)' : 'var(--color-text-primary)' }}
              >
                {val ? <CheckCircle2 size={16} color="var(--area-career)" /> : <Circle size={16} color="var(--color-text-muted)" />}
                <span style={{ textTransform: 'capitalize' }}>{key === 'openSource' ? 'Open Source Contribution Segment' : `${key} segment`}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CS Fundamentals checkpoints */}
        <div className="glass-panel glass-card-glow-research" style={{ padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
            <Layers size={18} color="var(--area-research)" /> CS Core Fundamentals (SPS: {sps}%)
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div 
              onClick={() => handleToggleFundamental('os', 'Operating Systems')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer', color: fundamentals.os ? 'var(--color-text-secondary)' : 'var(--color-text-primary)' }}
            >
              {fundamentals.os ? <CheckCircle2 size={16} color="var(--area-research)" /> : <Circle size={16} color="var(--color-text-muted)" />}
              <span>Operating Systems (Threads, Semaphores, Page Replacements)</span>
            </div>

            <div 
              onClick={() => handleToggleFundamental('dbms', 'Database Management')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer', color: fundamentals.dbms ? 'var(--color-text-secondary)' : 'var(--color-text-primary)' }}
            >
              {fundamentals.dbms ? <CheckCircle2 size={16} color="var(--area-research)" /> : <Circle size={16} color="var(--color-text-muted)" />}
              <span>Database Management (DBMS - Normalization, SQL, Transactions)</span>
            </div>

            <div 
              onClick={() => handleToggleFundamental('networks', 'Computer Networks')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer', color: fundamentals.networks ? 'var(--color-text-secondary)' : 'var(--color-text-primary)' }}
            >
              {fundamentals.networks ? <CheckCircle2 size={16} color="var(--area-research)" /> : <Circle size={16} color="var(--color-text-muted)" />}
              <span>Computer Networks (OSI layers, TCP/UDP, DNS, IP Subnets)</span>
            </div>

            <div 
              onClick={() => handleToggleFundamental('coa', 'Computer Organization')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer', color: fundamentals.coa ? 'var(--color-text-secondary)' : 'var(--color-text-primary)' }}
            >
              {fundamentals.coa ? <CheckCircle2 size={16} color="var(--area-research)" /> : <Circle size={16} color="var(--color-text-muted)" />}
              <span>Computer Architecture (COA - Cache mapping, Pipelining, Hazards)</span>
            </div>

            <div 
              onClick={() => handleToggleFundamental('compiler', 'Compiler Design')}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer', color: fundamentals.compiler ? 'var(--color-text-secondary)' : 'var(--color-text-primary)' }}
            >
              {fundamentals.compiler ? <CheckCircle2 size={16} color="var(--area-research)" /> : <Circle size={16} color="var(--color-text-muted)" />}
              <span>Compiler Design & TOC (Parsers, Lexical Analysis, NFAs/DFAs)</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
