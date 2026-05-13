import { useBenefits, useMember, useCmsPage } from '@medicare/shared';
import { CmsRenderer } from '../cms/CmsRenderer';
import styles from '../App.module.css';

const FOOTER_LINKS = ['Privacy Policy', 'Terms of Use', 'Accessibility Services', 'Language Support', 'Contact Us'];

export default function Benefits() {
  const { data: benefits, isLoading: benefitsLoading } = useBenefits();
  const { data: member, isLoading: memberLoading } = useMember();
  const { data: cmsPage, isLoading: cmsLoading } = useCmsPage('benefits');
  const isLoading = benefitsLoading || memberLoading || cmsLoading;

  if (isLoading) {
    return (
      <main className={styles.pageWrap}>
        <section className="mb-16">
          <div className={styles.skeleton} style={{ height: 52, width: 320, borderRadius: 10, marginBottom: 16 }} />
          <div className={styles.skeleton} style={{ height: 20, width: 480, borderRadius: 6 }} />
        </section>
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-7">
            <div className={styles.skeleton} style={{ height: 400, borderRadius: 16 }} />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <div className={styles.skeleton} style={{ height: 400, borderRadius: 16 }} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className={styles.pageWrap}>
        <CmsRenderer 
          blocks={cmsPage?.blocks || []} 
          context={{ member, benefits }} 
        />
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
