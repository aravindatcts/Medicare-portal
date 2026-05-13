import { useCmsPage } from '@medicare/shared';
import { CmsRenderer } from '../cms/CmsRenderer';
import styles from '../App.module.css';

const FOOTER_LINKS = ['Privacy Policy', 'Terms of Use', 'Accessibility Services', 'Language Support', 'Contact Us'];

export default function Hra() {
  const { data: cmsPage, isLoading } = useCmsPage('hra');

  if (isLoading) {
    return (
      <main className={styles.pageWrap}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className={styles.pageWrap}>
        <CmsRenderer blocks={cmsPage?.blocks || []} />
      </main>

      <footer className="bg-slate-50 w-full py-12 px-24 mt-16" style={{ borderTop: '1px solid #e2e8f0' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-screen-2xl mx-auto items-center">
          <div className="flex flex-col gap-4">
            <div className="font-headline font-bold text-2xl text-slate-800">AmeriHealth Sanctuary</div>
            <p className="font-body text-sm leading-relaxed text-slate-500">© 2024 AmeriHealth Sanctuary. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
            {FOOTER_LINKS.map(link => (
              <a key={link} className="text-slate-500 hover:underline decoration-2 underline-offset-4 transition-opacity font-body text-sm" href="#">{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
