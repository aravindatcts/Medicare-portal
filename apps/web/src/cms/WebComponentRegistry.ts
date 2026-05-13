import { WebHeroBanner } from './WebHeroBanner';
import { WebFaqSection } from './WebFaqSection';
import { WebMemberWelcomeCard } from './WebMemberWelcomeCard';
import { WebDigitalIdCard } from './WebDigitalIdCard';
import { WebActionRequiredList } from './WebActionRequiredList';
import { WebQuickActions } from './WebQuickActions';
import { WebPcpCard } from './WebPcpCard';
import { WebBenefitSummary } from './WebBenefitSummary';
import { WebRecentActivity } from './WebRecentActivity';
import { WebTwoColumnRow } from './WebTwoColumnRow';
import { WebClaimsHero, WebClaimsFilter, WebClaimsList } from './WebClaimsWrappers';
import { WebFindCareLayout } from './WebFindCareWrappers';
import { WebHraHero, WebHraAssessmentForm } from './WebHraWrappers';
import { WebNotificationsHero, WebNotificationsList } from './WebNotificationWrappers';
import { 
  WebRxHero, 
  WebRxContentLayout, 
  WebRxDailySchedule, 
  WebRxActivePrescriptions, 
  WebRxPrimaryPharmacy, 
  WebRxAiAssistant, 
  WebRxDeliveryStatus 
} from './WebRxWrappers';
import { 
  WebBenefitsHero, 
  WebBenefitsLayout, 
  WebBenefitsCoverageSnapshot, 
  WebBenefitsWellnessCard, 
  WebBenefitsCostTrackers, 
  WebBenefitsFeatured, 
  WebBenefitsNotice, 
  WebBenefitsAdditional 
} from './WebBenefitsWrappers';
import {
  WebSettingsHero,
  WebSettingsSection,
  WebSettingsActionRow,
  WebSettingsToggleRow,
  WebSettingsMemberCard
} from './WebSettingsWrappers';

export const WebComponentRegistry = {
  HeroBanner: WebHeroBanner,
  FaqSection: WebFaqSection,
  MemberWelcomeCard: WebMemberWelcomeCard,
  DigitalIdCard: WebDigitalIdCard,
  ActionRequiredList: WebActionRequiredList,
  QuickActions: WebQuickActions,
  PcpCard: WebPcpCard,
  BenefitSummary: WebBenefitSummary,
  RecentActivity: WebRecentActivity,
  TwoColumnRow: WebTwoColumnRow,
  ClaimsHero: WebClaimsHero,
  ClaimsFilter: WebClaimsFilter,
  ClaimsList: WebClaimsList,
  FindCareLayout: WebFindCareLayout,
  RxHero: WebRxHero,
  RxContentLayout: WebRxContentLayout,
  RxDailySchedule: WebRxDailySchedule,
  RxActivePrescriptions: WebRxActivePrescriptions,
  RxPrimaryPharmacy: WebRxPrimaryPharmacy,
  RxAiAssistant: WebRxAiAssistant,
  RxDeliveryStatus: WebRxDeliveryStatus,
  NotificationsHero: WebNotificationsHero,
  NotificationsList: WebNotificationsList,
  HraHero: WebHraHero,
  HraAssessmentForm: WebHraAssessmentForm,
  BenefitsHero: WebBenefitsHero,
  BenefitsLayout: WebBenefitsLayout,
  BenefitsCoverageSnapshot: WebBenefitsCoverageSnapshot,
  BenefitsWellnessCard: WebBenefitsWellnessCard,
  BenefitsCostTrackers: WebBenefitsCostTrackers,
  BenefitsFeatured: WebBenefitsFeatured,
  BenefitsNotice: WebBenefitsNotice,
  BenefitsAdditional: WebBenefitsAdditional,
  SettingsHero: WebSettingsHero,
  SettingsSection: WebSettingsSection,
  SettingsActionRow: WebSettingsActionRow,
  SettingsToggleRow: WebSettingsToggleRow,
  SettingsMemberCard: WebSettingsMemberCard,
};
