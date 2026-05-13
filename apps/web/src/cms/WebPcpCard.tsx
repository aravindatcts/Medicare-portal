import React from 'react';

function Bone({ w, h, r = 6, style = {} }: { w: string | number; h: number; r?: number; style?: React.CSSProperties }) {
  return <div className="_skel" style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }} />;
}

export const WebPcpCard = ({ context }: { context?: any }) => {
  const { memberLoading } = context || {};
  const isLoading = memberLoading;

  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
      className={!isLoading ? '_fadeUp' : ''}>
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', background: '#e0f2fe', color: '#0369a1', padding: '3px 10px', borderRadius: 20 }}>
        Primary Care Provider
      </span>
      {isLoading ? (
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginTop: 16 }}>
          <Bone w={80} h={80} r={40} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Bone w="60%" h={22} />
            <Bone w="40%" h={14} />
            <Bone w="80%" h={12} />
            <Bone w="120" h={40} r={10} style={{ marginTop: 8 }} />
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', marginTop: 14 }}>
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Dr. Sarah Jenkins"
            style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '3px solid #d3e4ff' }} />
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#003461', margin: '0 0 4px' }}>Dr. Sarah Jenkins</h3>
            <p style={{ fontSize: 13, color: '#00658d', fontWeight: 600, margin: '0 0 12px' }}>Internal Medicine Specialist</p>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#727781' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#003461' }}>location_on</span>1200 Sanctuary Plaza, Suite 400
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: '#727781' }}>
                <span className="material-symbols-outlined" style={{ fontSize: 15, color: '#003461' }}>call</span>(555) 234-8900
              </span>
            </div>
            <button style={{ marginTop: 16, background: '#003461', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 20px', fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}>
              Schedule Appointment <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
