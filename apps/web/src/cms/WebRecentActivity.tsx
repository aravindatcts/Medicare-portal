import React from 'react';
import { useRecentActivity, ActivityItem } from '@medicare/shared';

function Bone({ w, h, r = 6, style = {} }: { w: string | number; h: number; r?: number; style?: React.CSSProperties }) {
  return <div className="_skel" style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }} />;
}

const ACTIVITY_ICON_MAP: Record<string, { icon: string; color: string; tagBg?: string; tagText?: string }> = {
  claim: { icon: 'receipt_long', color: '#0369a1', tagBg: '#dcfce7', tagText: '#166534' },
  rx: { icon: 'medication', color: '#8b5cf6', tagBg: '#f3e8ff', tagText: '#6b21a8' },
  newsletter: { icon: 'mail', color: '#ea580c' },
  visit: { icon: 'medical_services', color: '#059669' },
};

export const WebRecentActivity = () => {
  const { data: acts, isLoading: actsLoading } = useRecentActivity();

  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', height: '100%' }}
      className={!actsLoading ? '_fadeUp' : ''}>
      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 18, fontWeight: 700, color: '#003461', margin: '0 0 18px' }}>Recent Activity</h2>

      {actsLoading || !acts ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ display: 'flex', gap: 12 }}>
              <Bone w={38} h={38} r={19} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <Bone w="80%" h={14} />
                <Bone w="55%" h={11} />
                <Bone w={80} h={20} r={6} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
          {acts.map((item: ActivityItem) => {
            const meta = ACTIVITY_ICON_MAP[item.type] ?? ACTIVITY_ICON_MAP.newsletter;
            return (
              <div key={item.id} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', cursor: 'pointer' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: meta.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 19, color: meta.color, fontVariationSettings: "'FILL' 1" }}>{meta.icon}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 13.5, color: '#191c1d', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#727781', marginBottom: 6 }}>{item.subtitle} • {item.date}</div>
                  {item.detail && (
                    <span style={{ display: 'inline-block', background: meta.tagBg, color: meta.tagText, fontSize: 11, fontWeight: 700, padding: '3px 9px', borderRadius: 6 }}>
                      {item.detail}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button style={{ marginTop: 20, background: 'none', border: '1.5px solid #e2e8f0', borderRadius: 10, padding: '11px 0', color: '#003461', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', width: '100%' }}>
        View All Activity
      </button>
    </div>
  );
};
