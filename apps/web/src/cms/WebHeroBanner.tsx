import React from 'react';
import { CmsHeroBannerProps } from '@medicare/shared';

function Bone({ w, h, r = 6, style = {} }: { w: string | number; h: number; r?: number; style?: React.CSSProperties }) {
  return <div className="_skel" style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }} />;
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function getTodayLabel(): string {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export const WebHeroBanner = (props: CmsHeroBannerProps & { context?: any }) => {
  const { subtext } = props;
  const { member, memberLoading, plan } = props.context || {};

  return (
    <div
      className={!memberLoading ? '_fadeUp' : ''}
      style={{
        background: 'linear-gradient(110deg, #003461 0%, #004882 45%, #00658d 100%)',
        borderRadius: 20,
        padding: '28px 36px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,52,97,0.22)',
      }}
    >
      {/* decorative rings */}
      <div style={{ position:'absolute', right:-80, top:-80, width:280, height:280, borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.08)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', right:-40, top:-40, width:200, height:200, borderRadius:'50%', border:'1.5px solid rgba(255,255,255,0.06)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', right:60, top:-100, width:240, height:240, borderRadius:'50%', background:'rgba(65,190,253,0.07)', pointerEvents:'none' }}/>

      {/* text */}
      <div style={{ position:'relative' }}>
        {memberLoading ? (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <Bone w={160} h={14} r={6} />
            <Bone w={280} h={32} r={8} />
            <Bone w={200} h={12} r={6} />
          </div>
        ) : (
          <>
            <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'rgba(255,255,255,0.6)', marginBottom:6 }}>
              {getTodayLabel()}
            </div>
            <h1 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 28,
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 6px',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
            }}>
              {getGreeting()}, {member?.name?.split(' ')[0] || 'Member'}! 👋
            </h1>
            <p style={{ color:'rgba(255,255,255,0.65)', fontSize:14, fontWeight:500, margin:0 }}>
              {subtext || "Here's a summary of your health coverage and recent activity."}
            </p>
          </>
        )}
      </div>

      {/* right-side pill stats */}
      {!memberLoading && plan && (
        <div style={{ display:'flex', gap:12, flexShrink:0, position:'relative' }}>
          {[
            { icon:'verified_user', label:'Plan Active',    value: plan?.name?.split(' ').slice(-1)[0] ?? 'Active' },
            { icon:'calendar_month', label:'Coverage Thru', value: plan?.coverageThrough ?? 'Dec 2024' },
          ].map(({ icon, label, value }) => (
            <div key={label} style={{
              background:'rgba(255,255,255,0.1)',
              border:'1px solid rgba(255,255,255,0.15)',
              borderRadius:14,
              padding:'12px 18px',
              display:'flex', flexDirection:'column', alignItems:'center', gap:5,
              minWidth:110, textAlign:'center',
            }}>
              <span className="material-symbols-outlined" style={{ fontSize:20, color:'#41befd', fontVariationSettings:"'FILL' 1" }}>{icon}</span>
              <div style={{ fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{label}</div>
              <div style={{ fontSize:13, fontWeight:800, color:'#fff' }}>{value}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
