import React from 'react';
import { CmsRenderer } from './CmsRenderer';
import styles from '../App.module.css';

// ── Hero ──────────────────────────────────────────────────────────────────────

export const WebSettingsHero = () => {
  return (
    <section className="mb-12">
      <h1 className="font-headline text-5xl font-extrabold text-primary tracking-tight mb-4">
        Settings & Preferences
      </h1>
      <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
        Manage your account security, communication preferences, and personal information in one place.
      </p>
    </section>
  );
};

// ── Section Container ─────────────────────────────────────────────────────────

export const WebSettingsSection = ({ title, blocks, context }: any) => {
  return (
    <div className="mb-10">
      <h2 className="font-headline text-2xl font-bold text-primary mb-4 ml-2">
        {title}
      </h2>
      <div 
        className="bg-white rounded-3xl overflow-hidden border border-outline-variant/30 shadow-sm"
        style={{ boxShadow: '0 2px 12px rgba(0,52,97,0.06)' }}
      >
        <CmsRenderer blocks={blocks || []} context={context} />
      </div>
    </div>
  );
};

// ── Member Card ───────────────────────────────────────────────────────────────

export const WebSettingsMemberCard = ({ context }: any) => {
  const settings = context?.settings;
  const member = settings?.member;

  return (
    <div className="bg-primary text-white p-10 rounded-3xl mb-12 flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
      <div className="relative z-10">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
          Profile Details
        </span>
        <h3 className="text-3xl font-headline font-extrabold mb-1">{member?.name ?? '—'}</h3>
        <p className="text-primary-container text-lg opacity-80 mb-6">Member ID: {member?.memberId ?? '—'}</p>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div>
            <p className="text-xs font-bold uppercase opacity-60 mb-1">Phone</p>
            <p className="font-bold">{member?.phone ?? '—'}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase opacity-60 mb-1">Address</p>
            <p className="font-bold whitespace-pre-line">{member?.address ?? '—'}</p>
          </div>
        </div>
      </div>
      
      <button className="mt-8 md:mt-0 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-colors z-10">
        Edit Profile
      </button>
      
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-12 w-64 h-64 bg-secondary-container/10 rounded-full pointer-events-none" />
    </div>
  );
};

// ── Action Row ────────────────────────────────────────────────────────────────

export const WebSettingsActionRow = ({ icon, label, value, context }: any) => {
  return (
    <button className="w-full flex items-center justify-between p-6 hover:bg-surface-container-low transition-colors border-b border-outline-variant/10 last:border-0 group text-left">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <p className="font-bold text-primary">{label}</p>
          {value && <p className="text-sm text-on-surface-variant">{value}</p>}
        </div>
      </div>
      <span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
    </button>
  );
};

// ── Toggle Row ────────────────────────────────────────────────────────────────

export const WebSettingsToggleRow = ({ icon, label, prefKey, context }: any) => {
  const preferences = context?.settings?.preferences;
  const isEnabled = preferences ? preferences[prefKey] === 'electronic' || preferences[prefKey] === true : false;

  return (
    <div className="w-full flex items-center justify-between p-6 border-b border-outline-variant/10 last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-secondary/5 flex items-center justify-center text-secondary">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <p className="font-bold text-primary">{label}</p>
      </div>
      
      <button
        role="switch"
        aria-checked={isEnabled}
        className={`relative w-12 h-7 rounded-full transition-colors ${isEnabled ? 'bg-secondary' : 'bg-outline-variant'}`}
      >
        <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${isEnabled ? 'left-[22px]' : 'left-1'}`} />
      </button>
    </div>
  );
};
