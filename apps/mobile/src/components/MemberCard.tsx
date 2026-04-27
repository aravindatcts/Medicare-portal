import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useMember, Colors } from '@medicare/shared';

type Action = {
  id: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  label: string;
};

const ACTIONS: Action[] = [
  { id: 'flip',   icon: 'rotate-3d-variant',           label: 'Flip Card' },
  { id: 'wallet', icon: 'wallet-outline',               label: 'Add to Wallet' },
  { id: 'email',  icon: 'email-outline',                label: 'Send Email' },
  { id: 'order',  icon: 'card-account-details-outline', label: 'Order Physical' },
];

const MemberCard: React.FC = () => {
  const { data } = useMember();
  const [showQR, setShowQR] = useState(false);

  return (
    <View style={styles.wrapper}>
      {/* Card */}
      <LinearGradient
        colors={['#0B1F45', '#1A3680']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        <View style={styles.topRow}>
          <View style={styles.avatarCircle}>
            <MaterialCommunityIcons name="account" size={16} color={Colors.white} />
          </View>
          <View style={styles.insurerInfo}>
            <Text style={styles.cardLabel}>{data?.cardLabel}</Text>
            <Text style={styles.insurerName}>{data?.insurerName}</Text>
          </View>
        </View>

        <Text style={styles.memberName}>{data?.name}</Text>
        <Text style={styles.memberId}>ID: {data?.memberId}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>GROUP</Text>
            <Text style={styles.fieldValue}>{data?.group}</Text>
          </View>
          <View style={styles.fieldDivider} />
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>PCN</Text>
            <Text style={styles.fieldValue}>{data?.pcn}</Text>
          </View>
          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => setShowQR(!showQR)}
            activeOpacity={0.8}
          >
            <Text style={styles.qrButtonText}>SHOW QR</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Action buttons */}
      <View style={styles.actions}>
        {ACTIONS.map(({ id, icon, label }) => (
          <TouchableOpacity key={id} style={styles.actionBtn} activeOpacity={0.7}>
            <View style={styles.actionIcon}>
              <MaterialCommunityIcons name={icon} size={20} color={Colors.skyBlue} />
            </View>
            <Text style={styles.actionLabel}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  insurerInfo: {
    flexDirection: 'column',
  },
  cardLabel: {
    fontSize: 9,
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  insurerName: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  memberName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
  },
  memberId: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.65)',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fieldGroup: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  fieldDivider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  qrButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  qrButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: 'row',
    backgroundColor: Colors.bgCard,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    gap: 6,
  },
  actionIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: `${Colors.skyBlue}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default MemberCard;
