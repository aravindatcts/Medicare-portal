import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing, CmsHeroBannerProps } from '@medicare/shared';
import LoadingSkeleton from '../components/LoadingSkeleton';
import AiConcierge from '../components/dashboard/AiConcierge';

function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export const MobileConciergeAI = (props: CmsHeroBannerProps & { context?: any }) => {
  const { subtext } = props;
  const { member, memberLoading } = props.context || {};

  if (memberLoading) {
    return (
      <View>
        <View style={styles.greetingContainer}>
          <LoadingSkeleton style={{ width: '60%', height: 32, marginBottom: 8 }} />
          <LoadingSkeleton style={{ width: '80%', height: 16 }} />
        </View>
        <LoadingSkeleton style={{ marginHorizontal: 20, marginBottom: 16, height: 120, borderRadius: 16 }} />
      </View>
    );
  }

  const rawName = member?.name ?? '';
  const firstName = rawName.split(' ')[0] || 'Member';
  const greeting = getTimeBasedGreeting();

  return (
    <View>
      <View style={styles.greetingContainer}>
        <Text style={styles.title} testID="member-name">{greeting}, {firstName}</Text>
        <Text style={styles.subtitle}>{subtext || "Your wellness journey is looking bright today."}</Text>
      </View>
      <AiConcierge />
    </View>
  );
};

const styles = StyleSheet.create({
  greetingContainer: {
    paddingHorizontal: Spacing.md + 4,
    marginBottom: Spacing.md + 4,
    marginTop: 10,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.sm + 1,
    fontWeight: '500',
    color: Colors.onSurfaceVariant,
  },
});
