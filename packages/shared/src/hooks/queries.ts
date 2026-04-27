import { useQuery } from '@tanstack/react-query';
import {
  getHero,
  getMember,
  getPlan,
  getQuickActions,
  getRecentActivity,
  getActionAlert,
  getWellnessWisdom,
  getNavigation,
  getProviders,
  getProvider,
  getBenefits,
  getClaims,
  getClaim,
} from '../services/dashboardService';

const STALE = 5 * 60 * 1000; // 5 minutes

export const useHero = () =>
  useQuery({ queryKey: ['hero'], queryFn: getHero, staleTime: STALE });

export const useMember = () =>
  useQuery({ queryKey: ['member'], queryFn: getMember, staleTime: STALE });

export const usePlan = () =>
  useQuery({ queryKey: ['plan'], queryFn: getPlan, staleTime: STALE });

export const useQuickActions = () =>
  useQuery({ queryKey: ['quickActions'], queryFn: getQuickActions, staleTime: STALE });

export const useRecentActivity = () =>
  useQuery({ queryKey: ['recentActivity'], queryFn: getRecentActivity, staleTime: STALE });

export const useActionAlert = () =>
  useQuery({ queryKey: ['actionAlert'], queryFn: getActionAlert, staleTime: STALE });

export const useWellnessWisdom = () =>
  useQuery({ queryKey: ['wellnessWisdom'], queryFn: getWellnessWisdom, staleTime: STALE });

export const useNavigation = () =>
  useQuery({ queryKey: ['navigation'], queryFn: getNavigation, staleTime: STALE });

export const useBenefits = () =>
  useQuery({ queryKey: ['benefits'], queryFn: getBenefits, staleTime: STALE });

export const useClaims = () =>
  useQuery({ queryKey: ['claims'], queryFn: getClaims, staleTime: 0 });

export const useClaim = (id: string) =>
  useQuery({ queryKey: ['claim', id], queryFn: () => getClaim(id), staleTime: STALE, enabled: !!id });

export const useProvider = (id: string) =>
  useQuery({ queryKey: ['provider', id], queryFn: () => getProvider(id), staleTime: STALE, enabled: !!id });

export const useProviders = (
  params: { category?: string; maxDistance?: number; name?: string } = {},
  options: { enabled?: boolean } = {},
) =>
  useQuery({
    queryKey: ['providers', params],
    queryFn: () => getProviders(params),
    staleTime: STALE,
    enabled: options.enabled ?? true,
  });
