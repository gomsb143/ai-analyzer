import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Process & Idea Intelligence Analyzer',
  description:
    'A decision intelligence engine that helps enterprises determine whether to optimize, automate, or apply AI — and execute in 30 days.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">

        {/* ── Subtle tinted background blobs ── */}
        <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div style={{
            position:'absolute', top:'-15%', left:'-10%',
            width:'55%', height:'55%', borderRadius:'50%',
            background:'radial-gradient(circle, rgba(46,139,87,.10) 0%, transparent 70%)',
          }} />
          <div style={{
            position:'absolute', bottom:'-10%', right:'-5%',
            width:'45%', height:'45%', borderRadius:'50%',
            background:'radial-gradient(circle, rgba(72,179,133,.08) 0%, transparent 70%)',
          }} />
        </div>

        {/* ── Header ── */}
        <header style={{
          position: 'sticky', top: 0, zIndex: 50,
          display: 'flex', flexDirection: 'row',
          alignItems: 'center', justifyContent: 'space-between',
          padding: '0 40px', height: 64, minHeight: 64,
          background: 'rgba(247,250,248,.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(46,139,87,.12)',
          boxShadow: '0 1px 0 rgba(46,139,87,.06)',
        }}>
          {/* ── Left: Logo + Title ── */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {/* Icon */}
            <div style={{
              width: 38, height: 38, borderRadius: 10, flexShrink: 0,
              background: 'linear-gradient(135deg,#2e8b57 0%,#48b385 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(46,139,87,.30)',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Title group — always in one row */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: '#1a2e22', letterSpacing: '-.01em', whiteSpace: 'nowrap' }}>
                Intelligence Analyzer
              </span>
              <span style={{
                fontSize: 9, fontWeight: 700, letterSpacing: '.12em',
                textTransform: 'uppercase', color: '#2e8b57',
                background: 'rgba(46,139,87,.08)',
                border: '1px solid rgba(46,139,87,.18)',
                borderRadius: 4, padding: '2px 6px',
                whiteSpace: 'nowrap',
              }}>
                Enterprise
              </span>
            </div>
          </div>

          {/* ── Right: Author pill ── */}
          <div style={{
            display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 7,
            padding: '6px 16px', borderRadius: 99, flexShrink: 0,
            border: '1px solid rgba(46,139,87,.22)',
            background: 'rgba(46,139,87,.06)',
          }}>
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#2e8b57',
              boxShadow: '0 0 0 2px rgba(46,139,87,.2)',
            }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#2e8b57', whiteSpace: 'nowrap' }}>
              Gomathi Balan SN
            </span>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-10 md:py-16">
          {children}
        </main>

        {/* ── Footer ── */}
        <footer style={{
          borderTop:'1px solid rgba(46,139,87,.12)',
          textAlign:'center', padding:'20px',
          fontSize:12, color:'#5a7a65', fontWeight:500,
        }}>
          © {new Date().getFullYear()} Gomathi Balan SN · Enterprise AI Consulting
        </footer>

      </body>
    </html>
  );
}
