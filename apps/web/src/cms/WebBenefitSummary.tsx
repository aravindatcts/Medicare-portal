import React, { useState } from 'react';
import { useBenefits, CostItem } from '@medicare/shared';

function Bone({ w, h, r = 6, style = {} }: { w: string | number; h: number; r?: number; style?: React.CSSProperties }) {
  return <div className="_skel" style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }} />;
}

export const WebBenefitSummary = () => {
  const [benefitTab, setBenefitTab] = useState<'Medical' | 'Vision' | 'Dental'>('Medical');
  const { data: bens, isLoading: bensLoading } = useBenefits();

  return (
    <div style={{ background: '#fff', borderRadius: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.05)', overflow: 'hidden' }}
      className={!bensLoading ? '_fadeUp' : ''}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px 16px' }}>
        <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#003461', margin: 0 }}>Benefit Summary</h2>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['Medical', 'Vision', 'Dental'] as const).map(tab => (
            <button key={tab} onClick={() => setBenefitTab(tab)} style={{
              background: benefitTab === tab ? '#003461' : '#f1f5f9',
              color: benefitTab === tab ? '#fff' : '#475569',
              border: 'none', borderRadius: 8, padding: '6px 14px',
              fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s',
            }}>{tab}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        {bensLoading || !bens ? (
          <>
            <Bone w="100%" h={72} r={8} />
            <Bone w="100%" h={72} r={8} />
            <Bone w="100%" h={72} r={12} />
          </>
        ) : (
          <>
            {bens.costs.map((c: CostItem) => {
              const pct = Math.round((c.spent / c.total) * 100);
              return (
                <div key={c.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#727781' }}>{c.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#003461' }}>{pct}% Used</span>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 800, color: '#003461' }}>
                      ${c.spent.toLocaleString()} <span style={{ fontSize: 13, fontWeight: 500, color: '#727781' }}>/ ${c.total.toLocaleString()}</span>
                    </span>
                  </div>
                  <div style={{ background: '#e2e8f0', borderRadius: 99, height: 8, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: '#003461', borderRadius: 99, transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              );
            })}
            <div style={{ background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', borderRadius: 12, padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#065f46', marginBottom: 4 }}>Wellness Credits Earned</div>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: 28, fontWeight: 800, color: '#064e3b' }}>$125.00</span>
              </div>
              <button style={{ background: '#059669', color: '#fff', border: 'none', borderRadius: 10, padding: '11px 20px', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit' }}>
                Redeem Credits
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
