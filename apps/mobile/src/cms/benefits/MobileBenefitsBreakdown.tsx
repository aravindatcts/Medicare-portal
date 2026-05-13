import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@medicare/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const MobileBenefitsBreakdown = ({ context }: any) => {
  const benefits = context?.benefits;
  const breakdown = benefits?.breakdown ?? [];
  const featured = breakdown.find((b: any) => b.featured);
  const compact = breakdown.filter((b: any) => !b.featured);

  return (
    <View style={{ marginTop: 8 }}>
      <Text style={styles.sectionTitle}>Benefits Breakdown</Text>
      {featured && (
        <View style={styles.featuredCard}>
          <View style={styles.featuredAccent} />
          <View style={styles.featuredContent}>
            <View style={styles.breakdownIconRow}>
              <View style={styles.iconBadge}>
                <MaterialCommunityIcons name={featured.icon as any} size={20} color={Colors.secondary} />
              </View>
              <View>
                <Text style={styles.breakdownTitle}>{featured.title}</Text>
                <Text style={styles.breakdownSubtitle}>{featured.subtitle}</Text>
              </View>
            </View>
            <View style={styles.lineItemsContainer}>
              {featured.lineItems.map((li: any, idx: number) => (
                <View key={idx} style={styles.lineItem}>
                  <Text style={styles.lineItemLabel}>{li.label}</Text>
                  <Text style={styles.lineItemValue}>{li.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
      <View style={styles.compactGrid}>
        {compact.map((item: any) => (
          <View key={item.id} style={styles.compactCard}>
            <View style={styles.iconBadgeSmall}>
              <MaterialCommunityIcons name={item.icon as any} size={18} color={Colors.secondary} />
            </View>
            <View style={styles.compactCardBody}>
              <Text style={styles.breakdownTitle}>{item.title}</Text>
              <Text style={styles.breakdownSubtitle}>{item.subtitle}</Text>
              {item.lineItems.map((li: any, idx: number) => (
                <View key={idx} style={styles.lineItemCompact}>
                  <Text style={styles.lineItemLabelSm}>{li.label}</Text>
                  <Text style={styles.lineItemValueSm}>{li.value}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 12,
    marginTop: 4,
  },
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderTopRightRadius: 32,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: 'rgba(0,52,97,0.10)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  featuredAccent: { width: 4, backgroundColor: Colors.secondary },
  featuredContent: { flex: 1, padding: 16 },
  breakdownIconRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breakdownTitle: { fontSize: 14, fontWeight: '700', color: Colors.onSurface },
  breakdownSubtitle: { fontSize: 12, color: Colors.onSurfaceVariant, marginTop: 1 },
  lineItemsContainer: { gap: 8 },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceContainerHigh,
  },
  lineItemLabel: { fontSize: 13, color: Colors.onSurfaceVariant },
  lineItemValue: { fontSize: 13, fontWeight: '600', color: Colors.secondary },
  compactGrid: { gap: 10, marginBottom: 20 },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderBottomLeftRadius: 28,
    padding: 14,
    gap: 12,
    shadowColor: 'rgba(0,52,97,0.10)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBadgeSmall: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  compactCardBody: { flex: 1 },
  lineItemCompact: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  lineItemLabelSm: { fontSize: 12, color: Colors.onSurfaceVariant },
  lineItemValueSm: { fontSize: 12, fontWeight: '600', color: Colors.secondary },
});
