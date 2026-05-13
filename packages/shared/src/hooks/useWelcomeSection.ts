import { useMember } from './queries';
import { useCmsContent } from '../cms/hooks';

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export interface WelcomeSectionState {
  greeting: string;
  firstName: string;
  subtitle: string;
  isLoading: boolean;
}

export function useWelcomeSection(): WelcomeSectionState {
  const { data: member, isLoading: isMemberLoading } = useMember();
  const { data: cms, isLoading: isCmsLoading } = useCmsContent();

  const rawName = member?.name ?? '';
  const firstName = rawName.split(' ')[0] || 'there';
  const greeting = getTimeBasedGreeting();
  
  const subtitle = cms?.heroBanner?.subtext || 'Your wellness journey is looking bright today.';

  return {
    greeting,
    firstName,
    subtitle,
    isLoading: isMemberLoading || isCmsLoading,
  };
}
