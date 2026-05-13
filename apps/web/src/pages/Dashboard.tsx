import React from 'react';
import { useMember, usePlan, useCmsPage } from '@medicare/shared';
import { CmsRenderer } from '../cms/CmsRenderer';

/* ── Skeleton shimmer keyframe ── */
const SHIMMER_CSS = `
@keyframes _shimmer {
  0%   { background-position: -600px 0; }
  100% { background-position:  600px 0; }
}
._skel {
  background: linear-gradient(90deg, #e8eaed 25%, #f3f4f6 50%, #e8eaed 75%);
  background-size: 600px 100%;
  animation: _shimmer 1.4s ease-in-out infinite;
  border-radius: 6px;
}
@keyframes _fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
._fadeUp { animation: _fadeUp 0.45s ease both; }
`;

function injectStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('_dash_styles')) return;
  const s = document.createElement('style');
  s.id = '_dash_styles';
  s.textContent = SHIMMER_CSS;
  document.head.appendChild(s);
}
injectStyles();

export default function Dashboard() {
  const { data: member, isLoading: memberLoading } = useMember();
  const { data: plan,   isLoading: planLoading   } = usePlan();
  const { data: cmsPage, isLoading: cmsLoading   } = useCmsPage('dashboard');

  return (
    <div style={{ background: '#f5f6f8', minHeight: '100vh', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 24px 80px', boxSizing: 'border-box' }}>
        <CmsRenderer 
          blocks={cmsPage?.blocks || []} 
          context={{ member, memberLoading, plan, planLoading }} 
        />
      </main>

      <footer style={{ background: '#f0f2f5', borderTop: '1px solid #e2e8f0', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15, color: '#003461' }}>Medicare Sanctuary</span>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Use', 'Accessibility', 'Contact Us'].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: '#727781', textDecoration: 'none', fontWeight: 500 }}>{l}</a>
            ))}
          </div>
          <span style={{ fontSize: 12, color: '#c2c6d1' }}>© 2024 AmeriHealth Sanctuary</span>
        </div>
      </footer>
    </div>
  );
}
