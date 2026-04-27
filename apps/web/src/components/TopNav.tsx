import { useState, useRef, useEffect } from 'react';
// import { useDescope, useUser } from '@descope/react-sdk';
import { NavLink } from 'react-router-dom';
import styles from '../App.module.css';

export default function TopNav() {
  // const { logout } = useDescope();
  // const { user } = useUser();
  const userPicture: string | null = null;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayName = 'Member';
  const initials = 'M';

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // async function handleLogout() {
  //   await logout();
  //   navigate('/login', { replace: true });
  // }

  return (
    <header className={styles.nav}>
      <div className={styles.navInner}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <button className={styles.iconBtn}>
            <span className="material-symbols-outlined">menu</span>
          </button>
          <span className={styles.brand}>AmeriHealth Sanctuary</span>
        </div>

        <nav className={styles.navLinks} style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { label: 'Dashboard', path: '/' },
            { label: 'Claims', path: '/claims', hasMenu: true },
            { label: 'Find Care', path: '/find-care' },
            { label: 'Benefits', path: '/benefits' },
            { label: 'Prescriptions', path: '/prescriptions' },
          ].map(({ label, path, hasMenu }) => (
            hasMenu ? (
              <div
                key={path}
                className="relative"
                ref={dropdownRef}
              >
                <NavLink
                  to={path}
                  className={styles.navLink}
                  onClick={e => { e.preventDefault(); setDropdownOpen(o => !o); }}
                  style={({ isActive }) => isActive ? {
                    borderBottom: '4px solid #2563eb',
                    color: '#1e40af',
                    paddingBottom: '6px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  } : {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    paddingBottom: '8px',
                    cursor: 'pointer',
                  }}
                >
                  {label}
                  <span className="material-symbols-outlined text-sm">
                    {dropdownOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </NavLink>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg flex flex-col py-2 z-50">
                    <NavLink
                      to="/claims"
                      className="px-4 py-2 hover:bg-slate-50 text-blue-800 text-base font-bold transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      View Claims
                    </NavLink>
                    <NavLink
                      to="/claims/submit"
                      className="px-4 py-2 hover:bg-slate-50 text-blue-800 text-base font-bold transition-colors"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Submit Claim
                    </NavLink>
                  </div>
                )}
              </div>
            ) : (
              <NavLink 
                key={path} 
                to={path} 
                className={styles.navLink}
                style={({ isActive }) => isActive && path !== '/' ? { 
                  borderBottom: '4px solid #2563eb', 
                  color: '#1e40af', 
                  paddingBottom: '6px', 
                  fontWeight: 'bold' 
                } : isActive && path === '/' ? {
                  borderBottom: '4px solid #2563eb', 
                  color: '#1e40af', 
                  paddingBottom: '6px', 
                  fontWeight: 'bold' 
                } : {
                  paddingBottom: '10px'
                }}
              >
                {label}
              </NavLink>
            )
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className={styles.conciergeBtn}>
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
            Concierge
          </button>

          {/* User menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              className={styles.avatarWrap}
              title={displayName}
              style={{
                background: '#003461',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {userPicture ? (
                <img src={userPicture} alt={displayName} className={styles.avatar} />
              ) : (
                <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{initials}</span>
              )}
            </div>

            <button
              onClick={() => {}}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#475569',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'Plus Jakarta Sans, sans-serif',
                padding: '4px 6px',
                borderRadius: 6,
                transition: 'color 0.2s',
              }}
              onMouseOver={e => (e.currentTarget.style.color = '#003461')}
              onMouseOut={e => (e.currentTarget.style.color = '#475569')}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span>
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
