import { CmsRenderer } from './CmsRenderer';

const ICON_MAP: Record<string, string> = {
  'hospital-box-outline': 'local_hospital',
  'tooth-outline': 'dentistry',
  'eye-outline': 'visibility',
  'ear-hearing': 'hearing',
};

const COST_ICONS = ['payments', 'account_balance_wallet'];
const COST_COLORS = ['bg-primary', 'bg-secondary'];
const COST_TEXT_COLORS = ['text-primary', 'text-secondary'];

export const WebBenefitsHero = ({ context }: any) => {
  const member = context?.member;
  const firstName = member?.name?.split(' ')[0] ?? 'there';
  return (
    <section className="mb-16">
      <h1 className="font-headline text-5xl font-extrabold text-primary tracking-tight mb-4">
        Hello, {firstName}.
      </h1>
      <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
        Welcome to your health sanctuary. Everything you need to manage your care and maximize your coverage is curated right here.
      </p>
    </section>
  );
};

export const WebBenefitsCoverageSnapshot = ({ context }: any) => {
  const benefits = context?.benefits;
  const member = context?.member;

  return (
    <div
      className="bg-white p-10 flex flex-col justify-between min-h-[400px] border-l-8 border-primary relative overflow-hidden"
      style={{ borderTopRightRadius: '1.5rem', borderBottomRightRadius: '1.5rem', borderBottomLeftRadius: '1.5rem', boxShadow: '0 4px 20px rgba(0,52,97,0.10)' }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Active Member</span>
          <span className="text-on-surface-variant text-sm font-medium">Plan: {benefits?.planName ?? '—'}</span>
        </div>
        <h2 className="font-headline text-3xl font-bold text-primary mb-6">Coverage Snapshot</h2>
        <div className="grid grid-cols-2 gap-12 mb-10">
          <div>
            <p className="text-on-surface-variant text-sm mb-1 uppercase tracking-wider font-semibold">Member Name</p>
            <p className="text-xl font-bold text-on-surface">{member?.name ?? '—'}</p>
            {member?.group && <p className="text-sm text-secondary font-medium mt-1">Group: {member.group}</p>}
          </div>
          <div>
            <p className="text-on-surface-variant text-sm mb-1 uppercase tracking-wider font-semibold">Member ID</p>
            <p className="text-xl font-bold text-on-surface">{benefits?.memberId ?? member?.memberId ?? '—'}</p>
            {member?.pcn && <p className="text-sm text-secondary font-medium mt-1">PCN: {member.pcn}</p>}
          </div>
        </div>
      </div>
      <div className="flex gap-4 relative z-10">
        <button className="bg-primary text-on-primary px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:shadow-md transition-all">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>badge</span>
          View Digital ID
        </button>
        <button className="bg-surface-container-high text-on-surface-variant px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-surface-container-highest transition-all">
          <span className="material-symbols-outlined">print</span>
          Order Replacement Card
        </button>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-24 -mt-24 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary-container/10 rounded-full -mr-16 -mb-16 pointer-events-none" />
    </div>
  );
};

export const WebBenefitsWellnessCard = ({ context }: any) => {
  const benefits = context?.benefits;
  const wellness = benefits?.wellness;

  if (!wellness) return null;

  return (
    <div className="rounded-xl overflow-hidden min-h-[400px] relative group shadow-sm">
      <img
        src={wellness.imageUrl}
        alt="Wellness"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-10 z-10">
        <h3 className="font-headline text-3xl font-bold text-white mb-3">{wellness.title}</h3>
        <p className="text-on-primary-container text-lg mb-6 leading-relaxed">{wellness.body}</p>
        <button className="bg-white text-primary px-8 py-4 rounded-xl font-bold inline-flex items-center gap-3 hover:scale-105 transition-transform">
          Explore Rewards
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export const WebBenefitsCostTrackers = ({ context }: any) => {
  const benefits = context?.benefits;
  const costs = benefits?.costs ?? [];

  return (
    <div className="mt-8">
      <div className="mb-10">
        <h2 className="font-headline text-4xl font-extrabold text-primary mb-2">Know Your Costs</h2>
        <p className="text-on-surface-variant">Real-time status of your annual usage and contribution limits.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {costs.map((cost: any, i: number) => {
          const pct = Math.round((cost.spent / cost.total) * 100);
          return (
            <div key={cost.label} className="bg-white p-8 rounded-2xl flex flex-col shadow-sm" style={{ boxShadow: '0 2px 10px rgba(0,52,97,0.08)' }}>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>
                    {COST_ICONS[i] ?? 'payments'}
                  </span>
                </div>
                <h4 className="font-headline font-bold text-xl text-primary">{cost.label}</h4>
              </div>
              <div className="mb-4 flex justify-between items-end">
                <span className="text-4xl font-extrabold text-on-surface tracking-tight">
                  ${cost.spent.toLocaleString()}
                  <span className="text-lg font-medium text-on-surface-variant"> / ${cost.total.toLocaleString()}</span>
                </span>
                <span className={`${COST_TEXT_COLORS[i] ?? 'text-primary'} font-bold text-sm`}>{pct}% Met</span>
              </div>
              <div className="w-full h-4 bg-surface-container-highest rounded-full mb-4 overflow-hidden">
                <div
                  className={`h-full ${COST_COLORS[i] ?? 'bg-primary'} rounded-full transition-all duration-1000`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const WebBenefitsFeatured = ({ context }: any) => {
  const benefits = context?.benefits;
  const featuredBenefit = benefits?.breakdown.find((b: any) => b.featured);

  if (!featuredBenefit) return null;

  return (
    <div className="mt-8">
      <div
        className="bg-white p-10 rounded-2xl border-l-8 border-secondary"
        style={{ borderTopRightRadius: '1.5rem', boxShadow: '0 4px 20px rgba(0,52,97,0.10)' }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: '"FILL" 1' }}>
              {ICON_MAP[featuredBenefit.icon] ?? 'health_and_safety'}
            </span>
          </div>
          <div>
            <h3 className="font-headline text-2xl font-bold text-primary">{featuredBenefit.title}</h3>
            <p className="text-on-surface-variant">{featuredBenefit.subtitle}</p>
          </div>
          <span className="ml-auto bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            Active
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredBenefit.lineItems.map((item: any) => (
            <div key={item.label} className="bg-surface-container p-4 rounded-xl">
              <p className="text-sm text-on-surface-variant font-medium mb-1">{item.label}</p>
              <p className="text-xl font-extrabold text-primary">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const WebBenefitsNotice = () => {
  return (
    <div className="mt-8 h-full">
      <div className="bg-white p-8 rounded-2xl h-full" style={{ boxShadow: '0 2px 10px rgba(0,52,97,0.08)', border: '1px solid #e8edf4' }}>
        <h5 className="font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary">info</span>
          Coverage Notice
        </h5>
        <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
          Your preventive care benefits, such as flu shots and annual wellness visits, are covered at 100% and do not count toward your deductible.
        </p>
        <a className="text-primary font-bold text-sm flex items-center gap-1 group" href="#">
          See All 100% Covered Services
          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
        </a>
      </div>
    </div>
  );
};

export const WebBenefitsAdditional = ({ context }: any) => {
  const benefits = context?.benefits;
  const compactBenefits = benefits?.breakdown.filter((b: any) => !b.featured) ?? [];

  if (compactBenefits.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="font-headline text-2xl font-bold text-primary mb-6">Additional Benefits</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {compactBenefits.map((benefit: any) => (
          <div key={benefit.id} className="bg-white p-6 rounded-2xl shadow-sm" style={{ boxShadow: '0 2px 8px rgba(0,52,97,0.07)' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '"FILL" 1' }}>
                  {ICON_MAP[benefit.icon] ?? 'health_and_safety'}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-primary">{benefit.title}</h4>
                <p className="text-sm text-on-surface-variant">{benefit.subtitle}</p>
              </div>
            </div>
            <div className="space-y-2">
              {benefit.lineItems.map((item: any) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-outline-variant/20 last:border-0">
                  <span className="text-sm text-on-surface-variant">{item.label}</span>
                  <span className="text-sm font-bold text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const WebBenefitsLayout = ({ leftBlocks, rightBlocks, bottomBlocks, context }: any) => {
  return (
    <div className="grid grid-cols-12 gap-8 items-start">
      <div className="col-span-12 lg:col-span-7 space-y-8">
        <CmsRenderer blocks={leftBlocks || []} context={context} />
      </div>
      <div className="col-span-12 lg:col-span-5 space-y-8">
        <CmsRenderer blocks={rightBlocks || []} context={context} />
      </div>
      <div className="col-span-12">
        <CmsRenderer blocks={bottomBlocks || []} context={context} />
      </div>
    </div>
  );
};
