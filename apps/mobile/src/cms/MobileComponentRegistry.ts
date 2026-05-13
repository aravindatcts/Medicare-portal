import { MobileConciergeAI } from './MobileConciergeAI';
import { MobileFaqSection } from './MobileFaqSection';
import { MobileTwoColumnRow } from './MobileTwoColumnRow';
import {
  MobileDigitalIdCard,
  MobileActionRequiredList,
  MobileQuickActions,
  MobilePcpCard,
  MobileBenefitSummary,
  MobileMemberWelcomeCard,
  MobileRecentActivity
} from './MobileWrappers';
import { MobileClaimsHero, MobileClaimsFilter, MobileClaimsList } from './MobileClaimsWrappers';
import { MobileFindCareLayout } from './MobileFindCareWrappers';
import { 
  MobileRxHero, 
  MobileRxContentLayout, 
  MobileRxDailySchedule, 
  MobileRxActivePrescriptions, 
  MobileRxPrimaryPharmacy, 
  MobileRxAiAssistant, 
  MobileRxDeliveryStatus 
} from './MobileRxWrappers';
import { MobileHraHero, MobileHraAssessmentForm } from './MobileHraWrappers';
import { MobileNotificationsHero, MobileNotificationsList } from './MobileNotificationWrappers';
import { 
  MobileBenefitsHero, 
  MobileBenefitsCostTrackers, 
  MobileBenefitsBreakdown, 
  MobileBenefitsWellness,
  MobileBenefitsLayout 
} from './benefits';

export const MobileComponentRegistry = {
  HeroBanner: MobileConciergeAI,
  FaqSection: MobileFaqSection,
  TwoColumnRow: MobileTwoColumnRow,
  DigitalIdCard: MobileDigitalIdCard,
  ActionRequiredList: MobileActionRequiredList,
  QuickActions: MobileQuickActions,
  PcpCard: MobilePcpCard,
  BenefitSummary: MobileBenefitSummary,
  MemberWelcomeCard: MobileMemberWelcomeCard,
  RecentActivity: MobileRecentActivity,
  ClaimsHero: MobileClaimsHero,
  ClaimsFilter: MobileClaimsFilter,
  ClaimsList: MobileClaimsList,
  FindCareLayout: MobileFindCareLayout,
  RxHero: MobileRxHero,
  RxContentLayout: MobileRxContentLayout,
  RxDailySchedule: MobileRxDailySchedule,
  RxActivePrescriptions: MobileRxActivePrescriptions,
  RxPrimaryPharmacy: MobileRxPrimaryPharmacy,
  RxAiAssistant: MobileRxAiAssistant,
  RxDeliveryStatus: MobileRxDeliveryStatus,
  NotificationsHero: MobileNotificationsHero,
  NotificationsList: MobileNotificationsList,
  HraHero: MobileHraHero,
  HraAssessmentForm: MobileHraAssessmentForm,
  BenefitsHero: MobileBenefitsHero,
  BenefitsCostTrackers: MobileBenefitsCostTrackers,
  BenefitsBreakdown: MobileBenefitsBreakdown,
  BenefitsWellness: MobileBenefitsWellness,
  BenefitsLayout: MobileBenefitsLayout,
};
