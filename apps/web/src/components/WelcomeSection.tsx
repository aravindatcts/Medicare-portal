// import { useUser } from '@descope/react-sdk';
import { useMember } from '@medicare/shared';
import styles from '../App.module.css';

export default function WelcomeSection() {
  // const { user } = useUser();
  const { data: member, isLoading } = useMember();

  const rawName = member?.name || '';
  const firstName = rawName.split(' ')[0] || 'there';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <section style={{ marginBottom: 48 }}>
      {isLoading ? (
        <>
          <div className={styles.skeleton} style={{ height: 44, width: 340, marginBottom: 12, borderRadius: 8 }} />
          <div className={styles.skeleton} style={{ height: 20, width: 260, borderRadius: 6 }} />
        </>
      ) : (
        <>
          <h1 className={styles.welcomeHeading}>{greeting}, {firstName}.</h1>
          <p className={styles.welcomeSub}>Your wellness journey is looking bright today.</p>
        </>
      )}
    </section>
  );
}
