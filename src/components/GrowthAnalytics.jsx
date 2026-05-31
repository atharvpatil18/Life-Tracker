import React from 'react';
import { LineChart, TrendingUp, TrendingDown, Target, BrainCircuit, Activity } from 'lucide-react';

export default function GrowthAnalytics({ state }) {
  const { last90Days } = state.growthAnalytics;

  // Let's draw a beautiful SVG Radar Chart dynamically based on real data
  const academicsVal = state.academicMetrics.cgpa * 10;
  const dsaVal = Math.min((state.dsaMetrics.solvedCount / 300) * 100, 100);
  const researchVal = Math.min((state.aimlMetrics.papersReadCount * 3 + state.aimlMetrics.modelsBuilt * 10), 100);
  const careerVal = state.careerMetrics.resumeScore;
  const leadershipVal = state.leadershipMetrics.score;
  const personalVal = state.personalMetrics.relationshipHealth;

  const radarData = [
    { label: "Academics", value: academicsVal, angle: 0 },
    { label: "DSA", value: dsaVal, angle: 60 },
    { label: "Research", value: researchVal, angle: 120 },
    { label: "Career", value: careerVal, angle: 180 },
    { label: "Leadership", value: leadershipVal, angle: 240 },
    { label: "Personal", value: personalVal, angle: 300 },
  ];

  // Convert polar coordinates to Cartesian for Radar SVG
  const getCoordinates = (value, angle) => {
    const r = (value / 100) * 90; // scale value to max radius of 90px
    const radians = (angle - 90) * (Math.PI / 180); // rotate 90 deg so Academics is at top
    return {
      x: 125 + r * Math.cos(radians), // center at (125, 125)
      y: 125 + r * Math.sin(radians),
    };
  };

  // Generate polygon points
  const pointsStr = radarData.map(d => {
    const coords = getCoordinates(d.value, d.angle);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  // Grid lines
  const gridRadii = [25, 50, 75, 90];

  return (
    <div className="animate-pop-up" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LineChart size={28} color="var(--area-academics)" /> Growth Analytics Ledger
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Analyze growth indexes over rolling 90-day intervals. Synthesize life balance profiles via radar maps.
        </p>
      </div>

      {/* Main Analysis Pane */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Radar balance map */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <BrainCircuit size={20} color="var(--area-academics)" /> Life Area Balance Radar
          </h3>

          <div style={{ position: 'relative', width: '250px', height: '250px' }}>
            <svg width="250" height="250">
              
              {/* Radar Grid Circles */}
              {gridRadii.map(r => (
                <circle 
                  key={r} cx="125" cy="125" r={r} 
                  fill="transparent" 
                  stroke="rgba(255,255,255,0.04)" 
                  strokeWidth="1"
                />
              ))}

              {/* Angle Line Spokes */}
              {radarData.map(d => {
                const end = getCoordinates(100, d.angle);
                return (
                  <line 
                    key={d.label} x1="125" y1="125" x2={end.x} y2={end.y} 
                    stroke="rgba(255,255,255,0.04)" 
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data Polygon */}
              <polygon 
                points={pointsStr} 
                fill="rgba(16, 185, 129, 0.15)" 
                stroke="var(--area-academics)" 
                strokeWidth="2.5"
                style={{ filter: 'drop-shadow(0 0 6px var(--area-academics-glow))' }}
              />

              {/* Axis Label nodes */}
              {radarData.map(d => {
                const textCoords = getCoordinates(120, d.angle);
                return (
                  <text 
                    key={d.label} 
                    x={textCoords.x} 
                    y={textCoords.y} 
                    fill="var(--color-text-secondary)" 
                    fontSize="9.5" 
                    fontWeight="700"
                    textAnchor="middle" 
                    alignmentBaseline="middle"
                  >
                    {d.label}
                  </text>
                );
              })}

            </svg>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'center', lineHeight: '1.4' }}>
            Radar outlines balances across all 6 core categories. A perfect circle indicates ultimate growth balance.
          </div>
        </div>

        {/* 90-Day Trends */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={20} color="var(--area-academics)" /> Rolling 90-Day Indicators
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            
            {/* Coding */}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>DSA PROBLEM SOLVING</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                <TrendingUp size={20} color="var(--area-academics)" />
                <strong style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>+{last90Days.coding}%</strong>
              </div>
            </div>

            {/* Learning */}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>TECHNICAL STUDY</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                <TrendingUp size={20} color="var(--area-academics)" />
                <strong style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>+{last90Days.learning}%</strong>
              </div>
            </div>

            {/* Fitness */}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>GYM WORKOUTS</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                <TrendingUp size={20} color="var(--area-academics)" />
                <strong style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)' }}>+{last90Days.fitness}%</strong>
              </div>
            </div>

            {/* Sleep */}
            <div style={{ padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.03)' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', display: 'block', fontWeight: 600 }}>SLEEP QUALITY</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                <TrendingDown size={20} color="var(--area-health)" />
                <strong style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: 'var(--area-health)' }}>{last90Days.sleep}%</strong>
              </div>
            </div>

          </div>

          <div className="glass-panel" style={{ padding: '12px', display: 'flex', gap: '8px', alignItems: 'center', borderColor: 'rgba(244, 63, 94, 0.25)', background: 'rgba(244, 63, 94, 0.03)', fontSize: '0.8rem' }}>
            <Target size={16} color="var(--area-health)" style={{ flexShrink: 0 }} />
            <span style={{ color: 'var(--color-text-secondary)' }}>
              <strong>Audit insight:</strong> High coding streaks are compounding well, but your sleep deficit is down 8%. Schedule rest intervals.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
