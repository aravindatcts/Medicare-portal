import React from 'react';

function Bone({ w, h, r = 6, style = {} }: { w: string | number; h: number; r?: number; style?: React.CSSProperties }) {
  return <div className="_skel" style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }} />;
}

export const WebMemberWelcomeCard = ({ context }: { context?: any }) => {
  const { member, memberLoading, plan } = context || {};
  const isLoading = memberLoading || !member;

  return (
    <div style={{
      background: '#fff', borderRadius: 20, padding: '32px 28px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      height: '100%', boxSizing: 'border-box'
    }} className={!isLoading ? '_fadeUp' : ''}>
      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Bone w={80} h={18} r={20} />
          <Bone w="70%" h={36} />
          <Bone w="50%" h={14} />
          <Bone w="100%" h={56} r={12} style={{ marginTop: 12 }} />
        </div>
      ) : (
        <>
          <div>
            <span style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: '#00658d', background: '#e0f2fe', padding: '4px 10px', borderRadius: 20,
            }}>Active Member</span>
            <h1 style={{
              fontFamily: 'Manrope, sans-serif', fontSize: 32, fontWeight: 800,
              color: '#003461', margin: '14px 0 4px', letterSpacing: '-0.02em',
            }}>{member.name}</h1>
            <p style={{ color: '#727781', fontSize: 14, fontWeight: 500, margin: '0 0 20px' }}>
              Member ID: {member.memberId}
            </p>
          </div>
          <div style={{
            background: '#f0f6ff', borderRadius: 12, padding: '14px 18px',
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <span style={{ color: '#1e40af', fontWeight: 700, fontSize: 15 }}>{plan ? plan.name : 'AmeriHealth Premier Choice'}</span>
            <span style={{ color: '#727781', fontSize: 12 }}>Medicare Advantage HMO</span>
          </div>
        </>
      )}
    </div>
  );
};
