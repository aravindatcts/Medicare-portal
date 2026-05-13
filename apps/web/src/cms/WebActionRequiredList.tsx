import React, { useState } from 'react';

function Bone({ w, h, r = 6, style = {} }: { w: string | number; h: number; r?: number; style?: React.CSSProperties }) {
  return <div className="_skel" style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }} />;
}

export const WebActionRequiredList = ({ context }: { context?: any }) => {
  const [alertMinimized, setAlertMinimized] = useState(false);
  const { planLoading } = context || {};
  const isLoading = planLoading;

  return (
    <section style={{ marginBottom: 28 }} className={!isLoading ? '_fadeUp' : ''}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: alertMinimized ? 0 : 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 700, color: '#191c1d', margin: 0 }}>Action Required</h2>
          <span style={{
            background: '#ba1a1a', color: '#fff', borderRadius: '50%',
            width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700,
          }}>2</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <a href="#" style={{
            fontSize: 13, fontWeight: 700, color: '#003461', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '6px 12px', borderRadius: 8, background: '#eff6ff',
            transition: 'background 0.18s',
          }}
            className="hover:bg-blue-100 transition-colors"
          >
            <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#003461' }}>notifications</span>
            View All Notifications
          </a>
          <button
            onClick={() => setAlertMinimized(v => !v)}
            title={alertMinimized ? 'Expand' : 'Minimize'}
            className="hover:bg-slate-100 transition-colors"
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'none', border: '1.5px solid #e2e8f0', borderRadius: 8,
              padding: '6px 10px', cursor: 'pointer', color: '#424750',
              fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
            }}
          >
            <span className="material-symbols-outlined" style={{
              fontSize: 18,
              transition: 'transform 0.25s',
              transform: alertMinimized ? 'rotate(-90deg)' : 'rotate(0deg)',
            }}>
              expand_less
            </span>
            {alertMinimized ? 'Show' : 'Hide'}
          </button>
        </div>
      </div>

      {/* Collapsible body */}
      <div style={{
        overflow: 'hidden',
        maxHeight: alertMinimized ? 0 : 400,
        opacity: alertMinimized ? 0 : 1,
        transition: 'max-height 0.35s ease, opacity 0.25s ease',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {planLoading ? (
            [0, 1].map(i => <Bone key={i} w="100%" h={120} r={16} />)
          ) : (
            [
              { icon: 'medical_services', iconBg: '#572500', title: 'Annual Wellness Visit Overdue', body: 'Your free annual physical is now due. Staying proactive is the key to maintaining your sanctuary of health.', cta: 'Schedule Visit', ctaBg: '#572500', border: '#572500' },
              { icon: 'person',           iconBg: '#003461', title: 'Update Primary Contact',       body: 'Please confirm your current mailing address to ensure your new member benefits package arrives safely.',   cta: 'Review Details', ctaBg: '#003461', border: '#003461' },
            ].map(a => (
              <div key={a.title} style={{
                background: '#fff', borderRadius: 16, padding: '20px 20px 20px 16px',
                borderLeft: `4px solid ${a.border}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: a.iconBg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: "'FILL' 1" }}>{a.icon}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15, color: '#191c1d', marginBottom: 5 }}>{a.title}</div>
                    <div style={{ fontSize: 13, color: '#727781', lineHeight: 1.5 }}>{a.body}</div>
                  </div>
                </div>
                <button style={{ alignSelf: 'flex-start', background: a.ctaBg, color: '#fff', border: 'none', borderRadius: 8, padding: '9px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {a.cta}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
