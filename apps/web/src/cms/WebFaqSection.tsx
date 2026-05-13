import React, { useState } from 'react';
import { CmsFaqSectionProps } from '@medicare/shared';

export const WebFaqSection = ({ title, faqs }: CmsFaqSectionProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div style={{ marginBottom: 28, background: '#fff', borderRadius: 20, padding: '24px 28px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 20, fontWeight: 700, color: '#003461', margin: '0 0 16px' }}>
        {title || 'Frequently Asked Questions'}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div key={faq.id} style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: 12 }}>
              <button 
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                style={{ 
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                  background: 'none', border: 'none', padding: '8px 0', cursor: 'pointer',
                  textAlign: 'left', fontFamily: 'inherit' 
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: '#191c1d' }}>{faq.question}</span>
                <span className="material-symbols-outlined" style={{ color: '#003461' }}>
                  {isOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>
              {isOpen && (
                <div style={{ padding: '8px 0 4px', fontSize: 14, color: '#727781', lineHeight: 1.5 }}>
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
