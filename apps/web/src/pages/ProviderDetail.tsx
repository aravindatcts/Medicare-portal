import { useParams, Link } from 'react-router-dom';
import { useProvider } from '@medicare/shared';
import type { ProviderData } from '@medicare/shared';
import styles from '../App.module.css';

// ── Specialty palette ─────────────────────────────────────────────────────────
const SPECIALTY_THEME: Record<string, [string, string, string]> = {
  'Primary Care':      ['#003461', '#1D6FA4', 'stethoscope'],
  'Family Medicine':   ['#003461', '#1D6FA4', 'stethoscope'],
  'Cardiology':        ['#7F1D1D', '#C0392B', 'cardiology'],
  'Internal Medicine': ['#065F46', '#0D9B6A', 'medical_information'],
  'Physical Therapy':  ['#713F12', '#C67A1D', 'self_improvement'],
  'Dermatology':       ['#4C1D95', '#7C3AED', 'dermatology'],
  'Orthopedics':       ['#0C4A6E', '#0284C7', 'orthopedics'],
  'Neurology':         ['#1E1B4B', '#4338CA', 'neurology'],
  'Gastroenterology':  ['#134E4A', '#0F9488', 'biotech'],
  'Psychiatry':        ['#831843', '#BE185D', 'psychology'],
  'Ophthalmology':     ['#164E63', '#0891B2', 'visibility'],
};
const FALLBACK_THEME: [string, string, string] = ['#1E3A5F', '#2563EB', 'medical_services'];

function DoctorAvatar({ name, category, providerId, size = 224 }: {
  name: string; category: string; providerId: string; size?: number;
}) {
  const cleanName = name.replace(/^Dr\.?\s+/i, '');
  const parts = cleanName.trim().split(/\s+/);
  const initials = ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase();
  const [g1, g2, icon] = SPECIALTY_THEME[category] ?? FALLBACK_THEME;
  const gradId = `dgrad-${providerId}`;

  return (
    <div style={{
      position: 'relative', width: size, height: size, borderRadius: 24,
      overflow: 'hidden', flexShrink: 0,
      boxShadow: '0 16px 48px rgba(0,52,97,0.28)',
    }}>
      <svg width={size} height={size} viewBox="0 0 224 224" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={g1} />
            <stop offset="100%" stopColor={g2} />
          </linearGradient>
        </defs>
        <rect width="224" height="224" fill={`url(#${gradId})`} />
        <circle cx="196" cy="28" r="64" fill="rgba(255,255,255,0.07)" />
        <circle cx="28" cy="196" r="52" fill="rgba(255,255,255,0.05)" />
        <path d="M0 224 L0 158 Q0 134 28 126 L78 108 L112 136 L146 108 L196 126 Q224 134 224 158 L224 224 Z"
          fill="rgba(255,255,255,0.15)" />
        <path d="M78 108 L112 140 L146 108 L154 114 L112 166 L70 114 Z" fill="rgba(255,255,255,0.22)" />
        <ellipse cx="112" cy="72" rx="38" ry="42" fill="rgba(255,255,255,0.18)" />
        <text x="112" y="84" dominantBaseline="central" textAnchor="middle"
          fontFamily="Manrope, sans-serif" fontWeight="800" fontSize="46" fill="white" opacity="0.95" letterSpacing="-2">
          {initials}
        </text>
      </svg>
      <div style={{
        position: 'absolute', bottom: 12, right: 12, width: 40, height: 40,
        background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)',
        borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span className="material-symbols-outlined"
          style={{ fontSize: 22, color: 'white', fontVariationSettings: "'FILL' 1, 'wght' 300" }}>
          {icon}
        </span>
      </div>
    </div>
  );
}

// Hardcoded patient reviews (no server endpoint for these)
const REVIEWS = [
  { initials: 'MB', bg: '#c6e7ff', name: 'Margaret B.', ago: '2 weeks ago', stars: 5,
    text: '"The doctor was incredibly patient and thorough. Explained my condition clearly and in a way that actually made sense to me."' },
  { initials: 'JW', bg: '#d3e4ff', name: 'James W.', ago: '1 month ago', stars: 5,
    text: '"The treatment plan has made a huge difference in my daily life. I really feel like my health is in good hands."' },
  { initials: 'RC', bg: '#ffdbc8', name: 'Robert C.', ago: '2 months ago', stars: 4,
    text: '"Very professional office. The staff is friendly and the doctor takes time to listen without rushing through the appointment."' },
  { initials: 'SK', bg: '#c6e7ff', name: 'Sarah K.', ago: '3 months ago', stars: 5,
    text: '"Compassionate care. He didn\'t rush me through questions about my medication side effects — I felt truly heard."' },
  { initials: 'DL', bg: '#d3e4ff', name: 'David L.', ago: '3 months ago', stars: 5,
    text: '"Professional and thorough. The entire medical team seems very synchronized and works seamlessly together."' },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1 mb-4" style={{ color: '#793701' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="material-symbols-outlined text-lg"
          style={{ fontVariationSettings: i < count ? "'FILL' 1" : "'FILL' 0" }}>star</span>
      ))}
    </div>
  );
}

export default function ProviderDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: provider, isLoading } = useProvider(id ?? '') as {
    data: ProviderData | undefined; isLoading: boolean;
  };

  if (isLoading) {
    return (
      <main className={styles.pageWrap}>
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-10">
          {[120, 60, 140].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="material-symbols-outlined text-outline text-base">chevron_right</span>}
              <div className={styles.skeleton} style={{ height: 14, width: w, borderRadius: 6 }} />
            </div>
          ))}
        </div>
        {/* Profile skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-2xl flex gap-8"
            style={{ boxShadow: '0 16px 40px rgba(0,52,97,0.08)' }}>
            <div className={styles.skeleton} style={{ width: 224, height: 224, borderRadius: 24, flexShrink: 0 }} />
            <div className="flex-1 flex flex-col gap-4 pt-2">
              <div className={styles.skeleton} style={{ height: 44, width: '70%' }} />
              <div className={styles.skeleton} style={{ height: 22, width: '50%' }} />
              <div className={styles.skeleton} style={{ height: 16, width: '60%' }} />
              <div className="flex gap-3 mt-4">
                <div className={styles.skeleton} style={{ height: 48, width: 160, borderRadius: 12 }} />
                <div className={styles.skeleton} style={{ height: 48, width: 120, borderRadius: 12 }} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-4 bg-primary rounded-2xl p-8" style={{ minHeight: 280 }} />
        </div>
      </main>
    );
  }

  if (!provider) {
    return (
      <main className={`${styles.pageWrap} text-center`}>
        <span className="material-symbols-outlined text-6xl block mb-4 opacity-30 text-primary">person_search</span>
        <p className="font-headline text-2xl font-extrabold text-primary mb-2">Provider not found</p>
        <Link to="/find-care" className="text-secondary font-bold hover:underline">← Back to Find Care</Link>
      </main>
    );
  }

  const isBooked = provider.nextAvailable === null;

  return (
    <main className={styles.pageWrap}>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-on-surface-variant text-sm mb-10 font-body">
        <Link to="/find-care" className="hover:text-primary transition-colors">Find Care</Link>
        <span className="material-symbols-outlined text-base text-outline">chevron_right</span>
        <Link to="/find-care" className="hover:text-primary transition-colors">Provider Results</Link>
        <span className="material-symbols-outlined text-base text-outline">chevron_right</span>
        <span className="text-primary font-semibold">{provider.name}</span>
      </nav>

      {/* ── Bento: Profile + Smart Match ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

        {/* Profile card */}
        <section className="lg:col-span-8 bg-surface-container-lowest p-8 rounded-2xl relative overflow-hidden flex flex-col md:flex-row gap-8"
          style={{ boxShadow: '0 16px 40px rgba(0,52,97,0.08)' }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16"
            style={{ background: 'rgba(0,52,97,0.05)' }} />

          <DoctorAvatar name={provider.name} category={provider.category} providerId={provider.id} size={224} />

          <div className="flex flex-col justify-center flex-1">
            <h1 className="font-headline text-4xl font-extrabold text-primary mb-2 tracking-tight">{provider.name}</h1>
            <p className="text-secondary font-semibold text-xl mb-4 font-body">{provider.specialty}</p>

            <div className="flex flex-wrap gap-6 mb-6 text-on-surface-variant font-body">
              {provider.yearsExperience != null && (
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">calendar_today</span>
                  <span className="font-medium">{provider.yearsExperience} Years Experience</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-medium">{provider.rating.toFixed(1)} Rating</span>
              </div>
              {provider.inNetwork && (
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  <span className="font-medium text-secondary">In-Network</span>
                </div>
              )}
            </div>

            {!isBooked && provider.nextAvailable && (
              <div className="flex items-center gap-2 text-sm font-medium text-on-surface-variant mb-6 font-body">
                <span className="material-symbols-outlined text-secondary text-base">schedule</span>
                Next available: <span className="font-bold text-on-surface">{provider.nextAvailable}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <button
                disabled={isBooked}
                className={`px-8 py-4 rounded-xl font-bold flex items-center gap-2 transition-all font-label ${isBooked ? 'bg-primary/30 text-white cursor-not-allowed' : 'bg-primary text-on-primary hover:shadow-xl hover:-translate-y-0.5 active:scale-95'}`}
                style={!isBooked ? { boxShadow: '0 8px 24px rgba(0,52,97,0.30)' } : undefined}
              >
                <span className="material-symbols-outlined">event</span>
                {isBooked ? 'Fully Booked' : 'Book Appointment'}
              </button>
              <button className="bg-surface-container-high text-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-surface-container-highest transition-all font-label">
                <span className="material-symbols-outlined">call</span>
                Call Office
              </button>
            </div>
          </div>
        </section>

        {/* Smart Match card */}
        <section className="lg:col-span-4 bg-primary text-on-primary p-8 rounded-2xl relative overflow-hidden flex flex-col"
          style={{ boxShadow: '0 20px 48px rgba(0,52,97,0.25)' }}>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined" style={{ fontSize: 96 }}>psychology</span>
          </div>
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg" style={{ background: 'rgba(65,190,253,0.25)' }}>
                <span className="material-symbols-outlined text-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <h3 className="font-headline text-xl font-bold">Smart Match</h3>
            </div>
            <p className="text-on-primary/90 text-base leading-relaxed mb-6 font-body">
              Highly rated provider in your plan network with strong reviews from patients with similar needs.
            </p>
            <ul className="space-y-4">
              {[
                `Expert in ${provider.specialty}`,
                'Accepts your Medicare Advantage Plan',
                `${provider.languages?.join(' & ') ?? 'English'} speaking`,
              ].map(item => (
                <li key={item} className="flex gap-3 text-sm font-body">
                  <span className="material-symbols-outlined" style={{ color: '#41befd', flexShrink: 0 }}>check_circle</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div className="h-full rounded-full" style={{ width: `${Math.round(provider.rating / 5 * 100)}%`, background: '#41befd' }} />
            </div>
            <p className="text-xs uppercase tracking-widest mt-2 font-bold opacity-60 font-label">
              {Math.round(provider.rating / 5 * 100)}% Match Confidence
            </p>
          </div>
        </section>
      </div>

      {/* ── Location & Accessibility ─────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Map placeholder */}
        <div className="lg:col-span-7 rounded-3xl overflow-hidden relative" style={{ height: 400 }}>
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(160deg, #c9dce8 0%, #b8cfe0 25%, #cfdec9 55%, #b8d4b4 100%)' }}>
            <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dmap" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#003461" strokeWidth="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dmap)" />
            </svg>
            <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="white" strokeWidth="12" />
              <line x1="0" y1="28%" x2="100%" y2="28%" stroke="white" strokeWidth="5" />
              <line x1="33%" y1="0" x2="33%" y2="100%" stroke="white" strokeWidth="8" />
              <line x1="60%" y1="0" x2="62%" y2="100%" stroke="white" strokeWidth="5" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl"
                style={{ animation: 'bounce 2s infinite' }}>
                <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              </div>
            </div>
          </div>
          <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)} }`}</style>
        </div>

        {/* Office info */}
        <div className="lg:col-span-5 bg-surface-container-low p-8 rounded-2xl flex flex-col justify-between">
          <h2 className="font-headline text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined">location_city</span>
            Office &amp; Accessibility
          </h2>
          <div className="space-y-6 flex-1">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-on-surface-variant mb-2 font-label">Location Address</p>
              <p className="text-lg font-semibold text-primary font-body">{provider.address}</p>
              <p className="text-on-surface-variant font-body">{provider.distance} miles from your location</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'accessible', label: 'Wheelchair Access', desc: 'Fully ramped entrance & elevators' },
                { icon: 'local_parking', label: 'Parking Available', desc: 'Complimentary parking for patients' },
              ].map(item => (
                <div key={item.label} className="bg-surface-container-lowest p-4 rounded-xl flex flex-col gap-2"
                  style={{ boxShadow: '0 2px 8px rgba(0,52,97,0.06)' }}>
                  <span className="material-symbols-outlined text-secondary">{item.icon}</span>
                  <p className="font-bold text-sm font-label">{item.label}</p>
                  <p className="text-xs text-on-surface-variant leading-tight font-body">{item.desc}</p>
                </div>
              ))}
            </div>
            {provider.languages && provider.languages.length > 0 && (
              <div className="flex items-center gap-3 text-on-surface-variant pt-2" style={{ borderTop: '1px solid rgba(194,198,209,0.3)' }}>
                <span className="material-symbols-outlined text-primary">translate</span>
                <p className="text-sm font-medium font-body">Languages: <span className="font-bold text-on-surface">{provider.languages.join(', ')}</span></p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Patient Reviews ──────────────────────────────────────────────── */}
      <section className="mb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-headline text-3xl font-extrabold text-primary mb-2">Patient Experiences</h2>
            <p className="text-on-surface-variant font-body">Verified reviews from recent visits</p>
          </div>
          <button className="text-primary font-bold hover:underline flex items-center gap-1 font-label">
            See all reviews
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 5).map((review, idx) => (
            <div key={idx} className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col"
              style={{ boxShadow: '0 4px 16px rgba(0,52,97,0.07)', border: '1px solid rgba(194,198,209,0.2)' }}>
              <StarRow count={review.stars} />
              <p className="text-on-surface italic mb-6 leading-relaxed flex-1 font-body text-sm">{review.text}</p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-on-primary font-label"
                  style={{ background: review.bg, color: '#003461', fontSize: 13 }}>
                  {review.initials}
                </div>
                <div>
                  <p className="font-bold text-sm font-label">{review.name}</p>
                  <p className="text-xs text-on-surface-variant font-body">Visited {review.ago}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
