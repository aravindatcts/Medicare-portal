import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, FontSize, Radius } from '@medicare/shared';
import NotificationCard from '../components/notifications/NotificationCard';
import { groupNotifications } from '../utils/groupNotifications';
import { CmsRenderer } from './CmsRenderer';

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
      <Text style={styles.heroText}>Stay updated with{'\n'}your care journey.</Text>
    </LinearGradient>
  );
};

export const MobileNotificationsList = ({ context }: any) => {
  const notifications = context?.notifications || [];
  const handleMarkRead = context?.handleMarkRead;
  const handleDelete = context?.handleDelete;

  const groups = useMemo(() => groupNotifications(notifications), [notifications]);

  if (groups.length === 0) {
    return (
      <View style={styles.centeredWrap}>
        <MaterialCommunityIcons name="bell-check-outline" size={56} color={Colors.outlineVariant} />
        <Text style={styles.emptyTitle}>All caught up!</Text>
        <Text style={styles.emptyBody}>You have no notifications at this time.</Text>
      </View>
    );
  }

  return (
    <View>
      {groups.map((group) => (
        <View key={group.label} style={styles.section}>
          <SectionHeader label={group.label} />
          {group.items.map((item) => (
            <NotificationCard
              key={item.id}
              item={item}
              onMarkRead={handleMarkRead}
              onDelete={handleDelete}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

export const MobileNotificationsLayout = ({ blocks, context }: any) => {
  return (
    <View>
      <CmsRenderer blocks={blocks || []} context={context} />
    </View>
  );
};

function SectionHeader({ label }: { label: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionLabel}>{label}</Text>
      <View style={styles.sectionLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: Radius.lg,
    padding: 28,
    marginBottom: 28,
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
    fontSize: FontSize.xl,
    fontWeight: '800',
    color: Colors.onPrimary,
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  section: { marginBottom: 28, gap: 12 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: '800',
    color: Colors.onSurfaceVariant,
    letterSpacing: 1.5,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: `${Colors.outlineVariant}4D`,
  },
  centeredWrap: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyTitle: { fontSize: FontSize.lg, fontWeight: '700', color: Colors.primary },
  emptyBody: {
    fontSize: FontSize.sm,
    color: Colors.onSurfaceVariant,
    textAlign: 'center',
  },
});

