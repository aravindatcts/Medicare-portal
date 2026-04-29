import { z } from 'zod';

// ── Zod Schemas ──────────────────────────────────────────────────────────────

const HeroSchema = z.object({
  tag: z.string(),
  heading: z.string(),
  subtext: z.string(),
  ctaLabel: z.string(),
  ctaPhone: z.string(),
});

const MemberSchema = z.object({
  cardLabel: z.string(),
  insurerName: z.string(),
  name: z.string(),
  memberId: z.string(),
  group: z.string(),
  pcn: z.string(),
});

const CopaySchema = z.object({ type: z.string(), amount: z.string() });

const PlanSchema = z.object({
  name: z.string(),
  coverageThrough: z.string(),
  copays: z.array(CopaySchema),
  logos: z.array(z.string()),
  documentUrl: z.string(),
});

const QuickActionSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
  color: z.string(),
});

const ActivityItemSchema = z.object({
  id: z.string(),
  type: z.string(),
  statusIcon: z.string(),
  statusColor: z.string(),
  title: z.string(),
  subtitle: z.string(),
  detail: z.string(),
  date: z.string(),
  dateLabel: z.string(),
});

const ActionAlertSchema = z.object({
  id: z.string(),
  icon: z.string(),
  iconColor: z.string(),
  backgroundColor: z.string(),
  title: z.string(),
  body: z.string(),
  ctaUrl: z.string(),
});

const WellnessWisdomSchema = z.object({
  badge: z.string(),
  imageUrl: z.string(),
  title: z.string(),
  description: z.string(),
  buttonText: z.string(),
});

const NavItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
});

const ProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
  specialty: z.string(),
  category: z.string(),
  rating: z.number(),
  distance: z.number(),
  photo: z.string(),
  inNetwork: z.boolean(),
  address: z.string(),
  coordinate: z.object({ latitude: z.number(), longitude: z.number() }),
  languages: z.array(z.string()).optional(),
  nextAvailable: z.string().nullable().optional(),
  yearsExperience: z.number().optional(),
  bio: z.string().optional(),
});

const BenefitsSchema = z.object({
  planName: z.string(),
  memberId: z.string(),
  costs: z.array(z.object({ label: z.string(), spent: z.number(), total: z.number() })),
  breakdown: z.array(z.object({
    id: z.string(),
    icon: z.string(),
    title: z.string(),
    subtitle: z.string(),
    featured: z.boolean(),
    lineItems: z.array(z.object({ label: z.string(), value: z.string() })),
  })),
  wellness: z.object({ imageUrl: z.string(), title: z.string(), body: z.string() }),
});

const ClaimSchema = z.object({
  id: z.string(),
  provider: z.string(),
  type: z.string(),
  date: z.string(),
  status: z.string(),
  memberResponsibility: z.number(),
  totalBilled: z.number(),
  planDiscount: z.number(),
  insurancePaid: z.number(),
  serviceDate: z.string(),
  category: z.string(),
  doctor: z.string(),
  doctorNpi: z.string(),
  address: z.string(),
  diagnoses: z.array(z.object({ code: z.string(), title: z.string(), subtitle: z.string() })),
  services: z.array(z.object({ code: z.string(), title: z.string(), subtitle: z.string() })),
  journey: z.array(z.object({ step: z.string(), date: z.string(), complete: z.boolean() })),
});

// ── Fetch helper ─────────────────────────────────────────────────────────────

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3001';

async function fetchJson<S extends z.ZodTypeAny>(path: string, schema: S): Promise<z.infer<S>> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Server error ${res.status} on ${path}`);
  }
  const data = await res.json();
  return schema.parse(data);
}

const ReviewItemSchema = z.object({
  initials: z.string(),
  bg: z.string(),
  name: z.string(),
  ago: z.string(),
  stars: z.number(),
  text: z.string(),
});

const PrescriptionMedSchema = z.object({
  name: z.string(),
  dose: z.string(),
});

const ActivePrescriptionSchema = z.object({
  name: z.string(),
  dose: z.string(),
  indication: z.string(),
  doctor: z.string(),
  lastFilled: z.string(),
  refills: z.number(),
  status: z.enum(['refill-ready', 'no-refills']),
});

const PrescriptionsSchema = z.object({
  morning: z.array(PrescriptionMedSchema),
  evening: z.array(PrescriptionMedSchema),
  active: z.array(ActivePrescriptionSchema),
});

// ── Exports ───────────────────────────────────────────────────────────────────

export const getHero = () => fetchJson('/hero', HeroSchema);
export const getMember = () => fetchJson('/member', MemberSchema);
export const getPlan = () => fetchJson('/plan', PlanSchema);
export const getQuickActions = () => fetchJson('/quickActions', z.array(QuickActionSchema));
export const getRecentActivity = () => fetchJson('/recentActivity', z.array(ActivityItemSchema));
export const getActionAlert = () => fetchJson('/actionAlert', ActionAlertSchema);
export const getWellnessWisdom = () => fetchJson('/wellnessWisdom', WellnessWisdomSchema);
export const getNavigation = () => fetchJson('/navigation', z.array(NavItemSchema));

export const getBenefits = () => fetchJson('/benefits', BenefitsSchema);

export const getClaims = () => fetchJson('/claims', z.array(ClaimSchema));
export const getClaim = (id: string) => fetchJson(`/claims/${id}`, ClaimSchema);
export const getProvider = (id: string) => fetchJson(`/providers/${id}`, ProviderSchema);
export const getReviews = () => fetchJson('/reviews', z.array(ReviewItemSchema));
export const getPrescriptions = () => fetchJson('/prescriptions', PrescriptionsSchema);

export const getProviders = (params: {
  category?: string;
  maxDistance?: number;
  name?: string;
} = {}): Promise<z.infer<typeof ProviderSchema>[]> => {
  const q = new URLSearchParams();
  if (params.category && params.category !== 'All') q.set('category', params.category);
  if (params.maxDistance != null) q.set('maxDistance', String(params.maxDistance));
  if (params.name) q.set('name', params.name);
  const qs = q.toString();
  return fetchJson(`/providers${qs ? `?${qs}` : ''}`, z.array(ProviderSchema));
};
