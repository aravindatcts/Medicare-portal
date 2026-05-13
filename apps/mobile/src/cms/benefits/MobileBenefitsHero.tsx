import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@medicare/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const MobileBenefitsHero = ({ context }: any) => {
  const benefits = context?.benefits;
  const member = context?.member;
  const planName = benefits?.planName ?? 'Your Plan';
  const memberId = member ? `AH-${member.memberId.replace(/\s/g, '').slice(0, 6)}-01` : (benefits?.memberId ?? '—');

  return (
    <LinearGradient
      colors={[Colors.primaryContainer, Colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.heroCard}
    >
      <View style={styles.heroDecorCircle} />
      <View style={styles.activeBadge}>
        <MaterialCommunityIcons name="shield-check" size={12} color={Colors.primary} />
        <Text style={styles.activeBadgeText}>Active Coverage</Text>
      </View>
      <Text style={styles.heroPlanName}>{planName}</Text>
      <Text style={styles.heroMemberId}>Member ID: {memberId}</Text>
      <TouchableOpacity style={styles.heroButton}>
        <MaterialCommunityIcons name="card-account-details-outline" size={16} color={Colors.white} />
        <Text style={styles.heroButtonText}>View Digital ID Card</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 20,
    borderTopRightRadius: 48,
    borderBottomLeftRadius: 48,
    padding: 24,
    marginBottom: 20,
    overflow: 'hidden',
  },
  heroDecorCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -40,
    right: -30,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.secondaryContainer,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 14,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  heroPlanName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
  },
  heroMemberId: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 20,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
  },
  heroButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
});
