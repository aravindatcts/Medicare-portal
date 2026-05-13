import { useQuery } from '@tanstack/react-query';
import { cmsService } from './cmsService';
import type { CmsPage } from './types';

export const CMS_QUERY_KEYS = {
  page: (id: string) => ['cms', 'page', id] as const,
};

export function useCmsPage(pageId: string) {
  return useQuery<CmsPage>({
    queryKey: CMS_QUERY_KEYS.page(pageId),
    queryFn: () => cmsService.getPage(pageId),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCmsContent() {
  const query = useCmsPage('dashboard');
  const heroBannerBlock = query.data?.blocks.find(b => b.componentType === 'HeroBanner');
  return {
    ...query,
    data: heroBannerBlock ? { heroBanner: heroBannerBlock.props as { subtext?: string } } : undefined,
  };
}
