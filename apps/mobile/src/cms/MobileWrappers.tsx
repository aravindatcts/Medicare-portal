import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Shadows } from '@medicare/shared';
import { DigitalIdCard, QuickActions, PlanInformation, PrimaryCare, NextBestAction, RecentActivity } from '../components/dashboard';
import LoadingSkeleton from '../components/LoadingSkeleton';

export const MobileDigitalIdCard = () => <DigitalIdCard />;

export const MobileActionRequiredList = () => <NextBestAction />;

export const MobileQuickActions = ({ context }: { context?: any }) => (
  <QuickActions onNavigate={context?.onNavigate} />
);

export const MobilePcpCard = ({ context }: { context?: any }) => (
  <PrimaryCare onNavigate={() => context?.onNavigate?.('find-doctor')} />
);

export const MobileBenefitSummary = ({ context }: { context?: any }) => (
  <PlanInformation onNavigate={() => context?.onNavigate?.('benefits')} />
);

export const MobileMemberWelcomeCard = ({ context }: { context?: any }) => {
  const { member, memberLoading } = context || {};

  if (memberLoading || !member) {
    return (
      <View style={styles.memberCard}>
        <LoadingSkeleton style={{ width: 80, height: 14, marginBottom: 10 }} />
        <LoadingSkeleton style={{ width: '70%', height: 22, marginBottom: 6 }} />
        <LoadingSkeleton style={{ width: '50%', height: 14 }} />
      </View>
    );
  }

  return (
    <View style={styles.memberCard}>
      <View style={styles.activeBadge}>
        <Text style={styles.activeBadgeText}>Active Member</Text>
      </View>
      <Text style={styles.memberName}>{member.name}</Text>
      <Text style={styles.memberId}>Member ID: {member.memberId}</Text>
    </View>
  );
};

export const MobileRecentActivity = () => <RecentActivity />;

const styles = StyleSheet.create({
  memberCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    ...Shadows.card,
  },
  activeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0f2fe',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00658d',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  memberName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  memberId: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});
