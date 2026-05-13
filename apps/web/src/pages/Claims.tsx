import { useState } from 'react';
import { useCmsPage } from '@medicare/shared';
import { CmsRenderer } from '../cms/CmsRenderer';

export default function Claims() {
  const { data: cmsPage, isLoading } = useCmsPage('claims');

  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus]       = useState('');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [filterProvider, setFilterProvider]   = useState('');

  const context = {
    currentPage, setCurrentPage,
    filterStatus, setFilterStatus,
    filterDateRange, setFilterDateRange,
    filterProvider, setFilterProvider
  };

  if (isLoading) {
    return (
      <main className="box-border min-h-screen flex items-center justify-center" style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 24px 80px' }}>
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main className="box-border min-h-screen" style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 24px 80px' }}>
      <CmsRenderer blocks={cmsPage?.blocks || []} context={context} />
    </main>
  );
}
