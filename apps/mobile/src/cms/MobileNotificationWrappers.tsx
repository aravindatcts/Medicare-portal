import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@medicare/shared';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { LinearGradient } from 'expo-linear-gradient';

export const MobileNotificationsHero = () => {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryContainer]}
      start={{ x: 0.15, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      <View style={styles.heroCircle1} />
      <View style={styles.heroCircle2} />
      <MaterialCommunityIcons
        name="bell-ring-outline"
        size={48}
        color="rgba(255,255,255,0.12)"
        style={styles.heroBgIcon}
      />
      <Text style={styles.heroText}>Stay updated with{"\n"}your care journey.</Text>
    </LinearGradient>
  );
};

export const MobileNotificationsList = ({ context }: any) => {
  const notifications = context?.notifications ?? [];
  const isLoading = context?.isLoading;

  if (isLoading) {
    return (
      <View style={{ gap: 12 }}>
        <LoadingSkeleton style={{ height: 100, borderRadius: 16 }} />
        <LoadingSkeleton style={{ height: 100, borderRadius: 16 }} />
        <LoadingSkeleton style={{ height: 100, borderRadius: 16 }} />
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="bell-check-outline" size={56} color={Colors.outlineVariant} />
        <Text style={styles.emptyTitle}>All caught up!</Text>
        <Text style={styles.emptyBody}>You have no notifications at this time.</Text>
      </View>
    );
  }

  return (
    <View style={{ gap: 12, paddingBottom: 24 }}>
      {notifications.map((item: any) => (
        <TouchableOpacity 
          key={item.id} 
          style={[styles.card, !item.read && styles.unreadCard]}
          activeOpacity={0.7}
          onPress={() => context?.onMarkRead?.(item.id)}
        >
          <View style={[styles.iconContainer, { backgroundColor: getIconBg(item.type) }]}>
            <MaterialCommunityIcons 
              name={getIconName(item.type) as any} 
              size={24} 
              color={getIconColor(item.type)} 
            />
          </View>
          <View style={styles.cardBody}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
              {!item.read && <View style={styles.unreadDot} />}
            </View>
            <Text style={styles.cardText} numberOfLines={2}>{item.body}</Text>
            <Text style={styles.cardTime}>
              {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

function getIconName(type: string) {
  switch (type) {
    case 'wellness': return 'heart-pulse';
    case 'appointment': return 'calendar-check';
    case 'claim': return 'file-document-outline';
    case 'security': return 'shield-lock-outline';
    case 'prescription': return 'pill';
    default: return 'bell-outline';
  }
}

function getIconColor(type: string) {
  switch (type) {
    case 'wellness': return '#e11d48';
    case 'appointment': return '#2563eb';
    case 'claim': return '#16a34a';
    case 'security': return '#4f46e5';
    case 'prescription': return '#0891b2';
    default: return Colors.primary;
  }
}

function getIconBg(type: string) {
  return `${getIconColor(type)}15`;
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 20,
    padding: 28,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  heroCircle1: {
    position: 'absolute',
    top: -32,
    right: -32,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(65,190,253,0.15)',
  },
  heroCircle2: {
    position: 'absolute',
    bottom: -20,
    left: 40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  heroBgIcon: { position: 'absolute', right: 24, bottom: 20 },
  heroText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
    gap: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  emptyBody: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 16,
    shadowColor: '#003461',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  unreadCard: {
    borderColor: `${Colors.secondary}30`,
    backgroundColor: `${Colors.secondary}05`,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.secondary,
    marginLeft: 8,
  },
  cardText: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
    marginBottom: 8,
  },
  cardTime: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.outline,
  },
});
