import type {
  HeroData,
  MemberData,
  PlanData,
  QuickAction,
  ActivityItem,
  ActionAlert,
  WellnessWisdomData,
  NavItem,
  ProviderData,
  BenefitsData,
  ClaimData,
} from '../types';

// Web-safe base URL detection (no react-native Platform dependency)
function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // Browser: always talk to localhost mock server
    return 'http://localhost:3001';
  }
  // SSR / Node fallback
  return 'http://localhost:3001';
}

const BASE_URL = getBaseUrl();

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`Server error ${res.status} on ${path}`);
  }
  return res.json() as Promise<T>;
}

export const getHero = (): Promise<HeroData> => fetchJson('/hero');
export const getMember = (): Promise<MemberData> => fetchJson('/member');
export const getPlan = (): Promise<PlanData> => fetchJson('/plan');
export const getQuickActions = (): Promise<QuickAction[]> => fetchJson('/quickActions');
export const getRecentActivity = (): Promise<ActivityItem[]> => fetchJson('/recentActivity');
export const getActionAlert = (): Promise<ActionAlert> => fetchJson('/actionAlert');
export const getWellnessWisdom = (): Promise<WellnessWisdomData> => fetchJson('/wellnessWisdom');
export const getNavigation = (): Promise<NavItem[]> => fetchJson('/navigation');

export const getBenefits = (): Promise<BenefitsData> => fetchJson('/benefits');

export const getClaims = (): Promise<ClaimData[]> => fetchJson('/claims');
export const getClaim = (id: string): Promise<ClaimData> => fetchJson(`/claims/${id}`);
export const getProvider = (id: string): Promise<ProviderData> => fetchJson(`/providers/${id}`);

export const getProviders = (params: {
  category?: string;
  maxDistance?: number;
  name?: string;
} = {}): Promise<ProviderData[]> => {
  const q = new URLSearchParams();
  if (params.category && params.category !== 'All') q.set('category', params.category);
  if (params.maxDistance != null) q.set('maxDistance', String(params.maxDistance));
  if (params.name) q.set('name', params.name);
  const qs = q.toString();
  return fetchJson(`/providers${qs ? `?${qs}` : ''}`);
};
