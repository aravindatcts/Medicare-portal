import React from 'react';
import { CmsRenderer } from './CmsRenderer';

export const WebNotificationsHero = () => {
  return (
    <section className="mb-12">
      <h1 className="font-headline text-5xl font-extrabold text-primary tracking-tight mb-4">
        Stay Informed.
      </h1>
      <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
        Your health journey is a series of milestones. Keep track of updates, reminders, and important messages from your care team.
      </p>
    </section>
  );
};

export const WebNotificationsList = ({ context }: any) => {
  const notifications = context?.notifications ?? [];
  const isLoading = context?.isLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-surface-container rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-outline-variant/30">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">notifications_off</span>
        <h3 className="text-2xl font-bold text-primary mb-2">No notifications yet</h3>
        <p className="text-on-surface-variant">We'll let you know when something important happens.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {notifications.map((notif: any) => (
        <div 
          key={notif.id}
          className={`p-8 rounded-2xl bg-white transition-all hover:shadow-md border-l-8 ${notif.read ? 'border-outline-variant' : 'border-secondary'}`}
          style={{ boxShadow: '0 4px 20px rgba(0,52,97,0.06)' }}
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>
                  {getIconForType(notif.type)}
                </span>
                <h4 className="text-xl font-bold text-primary">{notif.title}</h4>
                {!notif.read && (
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                )}
              </div>
              <p className="text-on-surface-variant text-lg leading-relaxed">{notif.body}</p>
              <p className="text-sm text-outline mt-4 font-medium">
                {new Date(notif.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <button 
              onClick={() => context?.onMarkRead?.(notif.id)}
              className="text-primary font-bold text-sm hover:underline"
            >
              {notif.read ? 'Mark Unread' : 'Mark as Read'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

function getIconForType(type: string) {
  switch (type) {
    case 'wellness': return 'health_and_safety';
    case 'appointment': return 'event';
    case 'claim': return 'receipt_long';
    case 'security': return 'shield_person';
    case 'prescription': return 'pill';
    default: return 'notifications';
  }
}
