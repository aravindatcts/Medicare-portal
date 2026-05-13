import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@medicare/shared';

export const MobileBenefitsCostTrackers = ({ context }: any) => {
  const benefits = context?.benefits;
  const costs = benefits?.costs ?? [];

  return (
    <View style={{ marginTop: 8 }}>
      <Text style={styles.sectionTitle}>Know Your Costs</Text>
      {costs.map((item: any, i: number) => {
        const pct = Math.min(item.spent / item.total, 1);
        const pctLabel = Math.round(pct * 100);
        return (
          <View key={i} style={styles.costCard}>
            <View style={styles.costHeader}>
              <Text style={styles.costLabel}>{item.label}</Text>
              <Text style={styles.costPct}>{pctLabel}%</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${pctLabel}%` }]} />
            </View>
            <View style={styles.costAmounts}>
              <Text style={styles.costSpent}>${item.spent.toLocaleString()} spent</Text>
              <Text style={styles.costTotal}>of ${item.total.toLocaleString()}</Text>
            </View>
          </View>
        );
      })}
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
  costCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderTopRightRadius: 28,
    padding: 16,
    marginBottom: 10,
    shadowColor: 'rgba(0,52,97,0.10)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  costHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  costLabel: { fontSize: 14, fontWeight: '600', color: Colors.onSurface },
  costPct: { fontSize: 14, fontWeight: '700', color: Colors.secondary },
  progressTrack: {
    height: 8,
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: 8,
    backgroundColor: Colors.secondary,
    borderRadius: 4,
  },
  costAmounts: { flexDirection: 'row', justifyContent: 'space-between' },
  costSpent: { fontSize: 12, color: Colors.secondary, fontWeight: '600' },
  costTotal: { fontSize: 12, color: Colors.onSurfaceVariant },
});
