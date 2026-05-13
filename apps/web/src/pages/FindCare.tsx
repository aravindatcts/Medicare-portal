import { useCmsPage } from '@medicare/shared';
import { CmsRenderer } from '../cms/CmsRenderer';

export default function FindCare() {
  const { data: cmsPage, isLoading } = useCmsPage('find-care');

  if (isLoading) {
    return (
      <main className="flex-1 bg-surface flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <div className="flex-1 w-full bg-surface">
      <CmsRenderer blocks={cmsPage?.blocks || []} />
    </div>
  );
}
