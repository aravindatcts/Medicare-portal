import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Shadows, Radius, Spacing, FontSize } from '@medicare/shared';

const HistoryAiConcierge: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.aiBadge}>
          <MaterialCommunityIcons name="shimmer" size={14} color={Colors.white} />
          <Text style={styles.aiBadgeText}>AI HEALTH CONCIERGE</Text>
        </View>
      </View>
      
      <Text style={styles.title}>
        Arthur, your wellness journey is trending positively.
      </Text>
      
      <Text style={styles.description}>
        Based on your recent blood work and visit history, you are up to date on all vital screenings. 
        Your blood glucose management has shown significant stability over the last quarter.
      </Text>
      
      <TouchableOpacity style={styles.ctaButton} activeOpacity={0.8}>
        <Text style={styles.ctaText}>Full Report</Text>
        <MaterialCommunityIcons name="trending-up" size={18} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00284d',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
    ...Shadows.deep,
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  aiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    gap: 6,
  },
  aiBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    color: Colors.white,
    fontSize: FontSize.xl,
    fontWeight: '700',
    lineHeight: 28,
    marginBottom: Spacing.md,
  },
  description: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: FontSize.sm,
    lineHeight: 20,
    marginBottom: Spacing.lg,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryContainer,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    gap: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.lg,
  },
  ctaText: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
});

export default HistoryAiConcierge;
