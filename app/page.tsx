'use client';

import React, { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
type Mode = 'process' | 'idea';

interface BusinessImpact {
  time_savings: string;
  efficiency: string;
  cost_reduction: string;
  impact: string;
}
interface AnalysisResult {
  classification: string;
  reasoning: string;
  opportunities: string[];
  implementation_plan: string[];
  business_impact: BusinessImpact;
  mode: string;
}

// ─── Tiny design helpers ──────────────────────────────────────────────────────
const SG = {
  50:  '#effaf5',
  100: '#d7f3e4',
  200: '#b2e6cc',
  300: '#7fd0aa',
  400: '#48b385',
  500: '#2e8b57',
  600: '#247047',
  700: '#1e5c3b',
  800: '#1a4a30',
  900: '#163d27',
} as const;

const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: `1px solid ${SG[100]}`,
  borderRadius: 20,
  boxShadow: `0 1px 3px rgba(46,139,87,.06), 0 4px 16px rgba(46,139,87,.04)`,
};

// ─── Icons (inline SVG, no extra deps) ───────────────────────────────────────
const IconProcess = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
  </svg>
);
const IconIdea = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6M12 2a7 7 0 0 1 4 12.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26A7 7 0 0 1 12 2z"/>
  </svg>
);
const IconCheck = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconChart = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>
);
const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
export default function Home() {
  const [mode, setMode]             = useState<Mode>('process');
  const [inputText, setInputText]   = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult]         = useState<AnalysisResult | null>(null);
  const [error, setError]           = useState('');

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleAnalyze = async () => {
    if (!inputText.trim()) { setError('Please describe your process or idea first.'); return; }
    setError(''); setIsAnalyzing(true); setResult(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, input_text: inputText }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: AnalysisResult = await res.json();
      if (!data.classification || !data.business_impact) throw new Error('Incomplete response');

      setTimeout(() => { setResult(data); setIsAnalyzing(false); }, 1400);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unexpected error. Please try again.');
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => { setResult(null); setInputText(''); setError(''); setIsAnalyzing(false); };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', paddingTop: 8 }}>

        {/* pill badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: SG[50], border: `1px solid ${SG[200]}`,
          borderRadius: 99, padding: '5px 14px', marginBottom: 20,
          color: SG[600], fontSize: 12, fontWeight: 600, letterSpacing: '.04em',
        }}>
          <IconStar /> Decision Intelligence Engine
        </div>

        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 800, lineHeight: 1.15, marginBottom: 16,
          color: '#0f1f16', letterSpacing: '-.02em',
        }}>
          Optimize · Automate ·{' '}
          <span style={{
            background: `linear-gradient(135deg, ${SG[500]} 0%, ${SG[300]} 100%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Transform with AI</span>
        </h1>

        <p style={{ color: '#4a6654', fontSize: 16, fontWeight: 450, maxWidth: 480, margin: '0 auto', lineHeight: 1.65 }}>
          Paste your process or idea. Get a consulting-grade recommendation and a 30-day execution plan — instantly.
        </p>
      </div>

      {/* ── INPUT CARD ──────────────────────────────────────────────────────── */}
      {!result && !isAnalyzing && (
        <div style={{ ...cardStyle, overflow: 'hidden' }} className="animate-slide-up">

          {/* Top stripe */}
          <div style={{ height: 3, background: `linear-gradient(90deg, ${SG[400]} 0%, ${SG[200]} 100%)` }} />

          {/* Mode toggle */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: 6, padding: '10px 10px 0',
            background: SG[50],
            borderBottom: `1px solid ${SG[100]}`,
          }}>
            {([ 
              { val: 'process' as Mode, label: 'Analyze My Process', Icon: IconProcess },
              { val: 'idea'    as Mode, label: 'Validate My AI Idea', Icon: IconIdea },
            ]).map(({ val, label, Icon }) => {
              const active = mode === val;
              return (
                <button
                  key={val}
                  onClick={() => { setMode(val); setError(''); }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: 8, padding: '12px 16px',
                    borderRadius: 12, border: 'none', cursor: 'pointer',
                    fontFamily: 'inherit', fontWeight: 600, fontSize: 13,
                    transition: 'all .18s ease',
                    background: active ? '#fff' : 'transparent',
                    color:      active ? SG[600] : '#7a9986',
                    boxShadow:  active ? `0 1px 6px rgba(46,139,87,.14), 0 0 0 1px ${SG[200]}` : 'none',
                    marginBottom: 10,
                  }}
                >
                  <span style={{ color: active ? SG[500] : '#b2c9bb' }}><Icon /></span>
                  {label}
                </button>
              );
            })}
          </div>

          {/* Textarea */}
          <div style={{ padding: '28px 28px 24px' }}>
            <label
              htmlFor="main-input"
              style={{ display: 'block', fontSize: 11, fontWeight: 700,
                letterSpacing: '.08em', textTransform: 'uppercase',
                color: SG[500], marginBottom: 10 }}
            >
              {mode === 'process' ? 'Describe your business workflow' : 'Describe your AI concept'}
            </label>

            <textarea
              id="main-input"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              rows={6}
              placeholder={mode === 'process'
                ? 'Example: We receive invoices by email, manually extract data into a spreadsheet, then enter it into our ERP system…'
                : 'Example: I want to build a chatbot that reads internal documents and answers employee questions instantly…'}
              style={{
                width: '100%', display: 'block',
                padding: '16px 18px', borderRadius: 12,
                border: `1.5px solid ${SG[100]}`,
                background: SG[50], color: '#1a2e22',
                fontSize: 15, lineHeight: 1.65, fontFamily: 'inherit',
                fontWeight: 450, resize: 'vertical',
                outline: 'none', transition: 'border-color .18s',
              }}
              onFocus={e  => (e.target.style.borderColor = SG[400])}
              onBlur={e   => (e.target.style.borderColor = SG[100])}
            />

            {error && (
              <p style={{
                marginTop: 10, fontSize: 13, color: '#c0392b',
                display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500,
              }}>
                <span style={{
                  display:'inline-flex', width:18, height:18, borderRadius:99,
                  background:'#fde8e8', alignItems:'center', justifyContent:'center',
                  fontSize:10, color:'#c0392b', flexShrink:0,
                }}>!</span>
                {error}
              </p>
            )}

            <button
              id="analyze-btn"
              onClick={handleAnalyze}
              style={{
                marginTop: 20, width: '100%',
                padding: '15px 24px',
                background: `linear-gradient(135deg, ${SG[600]} 0%, ${SG[500]} 60%, ${SG[400]} 100%)`,
                color: '#fff', border: 'none', borderRadius: 12,
                fontSize: 15, fontWeight: 700, fontFamily: 'inherit',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 10,
                boxShadow: `0 4px 16px rgba(46,139,87,.35)`,
                transition: 'opacity .18s, transform .18s',
                letterSpacing: '.01em',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.opacity = '.9'; (e.target as HTMLElement).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.opacity = '1';  (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
            >
              Analyze & Generate Execution Plan
              <IconArrow />
            </button>
          </div>
        </div>
      )}

      {/* ── LOADING ─────────────────────────────────────────────────────────── */}
      {isAnalyzing && (
        <div style={{
          ...cardStyle, padding: '72px 40px',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', textAlign: 'center', gap: 28,
        }}>
          {/* Spinner */}
          <div style={{ position: 'relative', width: 72, height: 72 }}>
            <div className="animate-spin-cw" style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: `3px solid ${SG[100]}`,
              borderTopColor: SG[500],
            }}/>
            <div className="animate-spin-ccw" style={{
              position: 'absolute', inset: 8, borderRadius: '50%',
              border: `2px solid ${SG[200]}`,
              borderBottomColor: SG[400],
            }}/>
            <div className="animate-breathe" style={{
              position: 'absolute', inset: '50%', transform: 'translate(-50%,-50%)',
              width: 12, height: 12, borderRadius: '50%',
              background: SG[500],
            }}/>
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 17, color: '#1a2e22', marginBottom: 6 }}>
              Analyzing your {mode === 'process' ? 'workflow' : 'idea'}…
            </p>
            <p style={{ fontSize: 13, color: '#7a9986', fontWeight: 500 }}>
              Identifying opportunities · Building roadmap
            </p>
          </div>
        </div>
      )}

      {/* ── RESULTS ─────────────────────────────────────────────────────────── */}
      {result && !isAnalyzing && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="animate-slide-up">

          {/* Header row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: SG[500], marginBottom: 4 }}>
                Intelligence Report
              </p>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0f1f16', letterSpacing: '-.01em' }}>
                Strategic Analysis
              </h2>
            </div>
            <button
              id="new-analysis-btn"
              onClick={handleReset}
              style={{
                padding: '9px 20px', borderRadius: 10, border: `1.5px solid ${SG[200]}`,
                background: '#fff', color: SG[600], fontSize: 13, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: `0 1px 4px rgba(46,139,87,.08)`,
                transition: 'all .18s',
              }}
            >
              ← New Analysis
            </button>
          </div>

          {/* ── 1. Classification Banner ── */}
          <div style={{
            background: `linear-gradient(135deg, ${SG[600]} 0%, ${SG[500]} 100%)`,
            borderRadius: 20, padding: '32px 36px', color: '#fff',
            display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap',
            boxShadow: `0 8px 28px rgba(46,139,87,.28)`,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(255,255,255,.18)', backdropFilter: 'blur(6px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <IconCheck />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', opacity: .75, marginBottom: 6 }}>
                Recommendation
              </p>
              <h3 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-.01em', marginBottom: 10 }}>
                {result.classification}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.65, opacity: .88, maxWidth: 680 }}>
                {result.reasoning}
              </p>
            </div>
          </div>

          {/* ── 2 + 3. Two-column: Insights & Impact ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>

            {/* Insights */}
            <div style={{ ...cardStyle, padding: '28px 28px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9,
                  background: SG[50], border: `1px solid ${SG[200]}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: SG[500],
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <h4 style={{ fontWeight: 700, fontSize: 14, color: '#1a2e22' }}>
                  {result.mode === 'process' ? 'Inefficiencies & Opportunities' : 'Feasibility & Risks'}
                </h4>
              </div>

              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {result.opportunities.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                    <span style={{
                      width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                      background: SG[50], border: `1px solid ${SG[200]}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 700, color: SG[600],
                    }}>{i + 1}</span>
                    <p style={{ fontSize: 13, color: '#3a5443', lineHeight: 1.6, paddingTop: 2, fontWeight: 450 }}>{item}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Business Impact */}
            <div style={{ ...cardStyle, padding: '28px 28px 24px', background: SG[50] }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
                <div style={{
                  width: 34, height: 34, borderRadius: 9,
                  background: '#fff', border: `1px solid ${SG[200]}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: SG[500],
                }}>
                  <IconChart />
                </div>
                <h4 style={{ fontWeight: 700, fontSize: 14, color: '#1a2e22' }}>Business Impact</h4>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Time Savings',    value: result.business_impact.time_savings },
                  { label: 'Efficiency Gain', value: result.business_impact.efficiency },
                  { label: 'Cost Reduction',  value: result.business_impact.cost_reduction },
                ].map(({ label, value }) => (
                  <div key={label} style={{
                    background: '#fff', borderRadius: 12,
                    border: `1px solid ${SG[200]}`, padding: '14px 16px',
                  }}>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase', color: SG[400], marginBottom: 4 }}>
                      {label}
                    </p>
                    <p style={{ fontSize: 20, fontWeight: 800, color: SG[600], letterSpacing: '-.01em' }}>{value}</p>
                  </div>
                ))}

                <div style={{
                  borderTop: `1px solid ${SG[200]}`, paddingTop: 14, marginTop: 2,
                  fontSize: 12, color: '#4a6654', lineHeight: 1.65, fontStyle: 'italic', fontWeight: 450,
                }}>
                  &ldquo;{result.business_impact.impact}&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* ── 4. 30-Day Roadmap ── */}
          <div style={{ ...cardStyle, padding: '28px 28px 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: SG[50], border: `1px solid ${SG[200]}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: SG[500],
              }}>
                <IconClock />
              </div>
              <h4 style={{ fontWeight: 700, fontSize: 14, color: '#1a2e22' }}>30-Day Execution Roadmap</h4>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, position: 'relative' }}>
              {result.implementation_plan.map((step, i) => (
                <div key={i} style={{
                  background: i % 2 === 0 ? SG[50] : '#fff',
                  border: `1px solid ${SG[100]}`,
                  borderRadius: 16, padding: '20px 18px 18px',
                  position: 'relative', overflow: 'hidden',
                  transition: 'box-shadow .18s, transform .18s',
                }}>
                  {/* Accent line */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                    background: `linear-gradient(90deg, ${SG[500]} 0%, ${SG[300]} 100%)`,
                    borderRadius: '16px 16px 0 0',
                  }}/>
                  {/* Week badge */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 28, height: 28, borderRadius: 8,
                    background: SG[500], color: '#fff',
                    fontSize: 12, fontWeight: 800, marginBottom: 10,
                  }}>
                    W{i + 1}
                  </div>
                  <p style={{ fontSize: 11, fontWeight: 700, color: SG[600], letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                    Week {i + 1}
                  </p>
                  <p style={{ fontSize: 13, color: '#3a5443', lineHeight: 1.65, fontWeight: 450 }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
