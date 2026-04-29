import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePlan, useMember } from '@medicare/shared';

interface Props {
  onNavigate?: (route: string) => void;
}

const CurrentPlanCard: React.FC<Props> = ({ onNavigate }) => {
  const { data: planData, isLoading: isLoadingPlan } = usePlan();
  const { data: memberData, isLoading: isLoadingMember } = useMember();

  if (isLoadingPlan || isLoadingMember || !planData || !memberData) {
    return null;
  }

  const pcpCopay = planData.copays?.[0]?.amount || '';
  const deductible = planData.copays?.[1]?.amount || '';

  return (
    <View style={styles.card}>
      <View style={styles.decorativeCircle} />
      
      <View style={styles.headerRow}>
        <View style={styles.headerText}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>ACTIVE PLAN</Text>
          </View>
          <Text style={styles.planName}>{planData.name}</Text>
          <Text style={styles.memberId}>Member ID: {memberData.memberId}</Text>
        </View>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="shield-check" size={28} color="#003461" />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>PCP COPAY</Text>
          <Text style={styles.statValue}>{pcpCopay}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>DEDUCTIBLE</Text>
          <Text style={styles.statValue}>{deductible}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.button} 
        activeOpacity={0.8}
        onPress={() => onNavigate?.('benefits')}
      >
        <Text style={styles.buttonText}>View All Benefits</Text>
        <MaterialCommunityIcons name="arrow-right" size={20} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#003461',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    borderColor: 'rgba(25, 28, 29, 0.05)',
    borderWidth: 1,
    overflow: 'hidden',
  },
  decorativeCircle: {
    position: 'absolute',
    top: -48,
    right: -48,
    width: 128,
    height: 128,
    backgroundColor: 'rgba(0, 101, 141, 0.05)', // secondary/5
    borderRadius: 64,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerText: {
    flex: 1,
  },
  badge: {
    backgroundColor: '#c6e7ff', // secondary-fixed
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#00658d', // secondary
    letterSpacing: 1.2,
  },
  planName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#003461', // primary
    marginBottom: 4,
  },
  memberId: {
    fontSize: 13,
    fontWeight: '600',
    color: '#424750', // on-surface-variant
  },
  iconContainer: {
    backgroundColor: 'rgba(0, 101, 141, 0.1)', // secondary/10
    padding: 8,
    borderRadius: 12,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f3f4f5', // surface-container-low
    padding: 16,
    borderRadius: 16,
    borderColor: 'rgba(25, 28, 29, 0.05)',
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#424750',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#003461',
  },
  button: {
    backgroundColor: '#003461',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#003461',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default CurrentPlanCard;
