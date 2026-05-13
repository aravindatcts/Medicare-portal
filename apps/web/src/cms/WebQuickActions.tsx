import React from 'react';
import { useQuickActions, QuickAction } from '@medicare/shared';

function Bone({ w, h, r = 6, style = {} }: { w: string | number; h: number; r?: number; style?: React.CSSProperties }) {
  return <div className="_skel" style={{ width: w, height: h, borderRadius: r, flexShrink: 0, ...style }} />;
}

const ICON_MAP: Record<string, string> = {
  'medical-bag':           'medical_services',
  'pill':                  'medication',
  'file-document-outline': 'receipt_long',
  'help-circle-outline':   'help',
  'search':                'search',
  'local_pharmacy':        'local_pharmacy',
  'payments':              'payments',
  'map':                   'map',
  'chat':                  'chat',
  'settings':              'settings',
};

export const WebQuickActions = () => {
  const { data: qas, isLoading: qasLoading } = useQuickActions();

  return (
    <section style={{ marginBottom: 28 }} className={!qasLoading ? '_fadeUp' : ''}>
      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 700, color: '#191c1d', margin: '0 0 16px' }}>Quick Actions</h2>
      <div style={{
        background: '#fff', borderRadius: 20, padding: '24px 20px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      }}>
        {qasLoading || !qas ? (
          [0,1,2,3,4,5].map(i => <Bone key={i} w={70} h={80} r={14} />)
        ) : (
          qas.map((action: QuickAction, i: number) => {
            const isLast = i === qas.length - 1;
            const matIcon = ICON_MAP[action.icon] ?? action.icon;
            return (
              <button key={action.id} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10,
                background: isLast ? '#003461' : '#f5f6f8',
                border: 'none', borderRadius: isLast ? '50%' : 14,
                padding: isLast ? '16px' : '16px 22px',
                cursor: 'pointer', fontFamily: 'inherit',
                width: isLast ? 56 : undefined, height: isLast ? 56 : undefined,
                boxShadow: isLast ? '0 4px 12px rgba(0,52,97,0.3)' : 'none',
                transition: 'transform 0.15s',
              }}
                className="hover:-translate-y-0.5 transition-transform"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 22, color: isLast ? '#fff' : '#003461' }}>{matIcon}</span>
                {!isLast && <span style={{ fontSize: 12, fontWeight: 600, color: '#424750', whiteSpace: 'nowrap' }}>{action.label}</span>}
              </button>
            );
          })
        )}
      </div>
    </section>
  );
};
