import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRecentActivity, Colors } from '@medicare/shared';

const ICON_MAP: Record<string, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  'check-circle': 'check-circle',
  'calendar-clock': 'calendar-clock',
};

const RecentActivity: React.FC = () => {
  const { data: items = [] } = useRecentActivity();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {items.map((item, idx) => (
          <View
            key={item.id}
            style={[styles.item, idx < items.length - 1 && styles.itemBorder]}
          >
            <View style={[styles.statusCircle, { backgroundColor: item.statusColor + '20' }]}>
              <MaterialCommunityIcons
                name={ICON_MAP[item.statusIcon] ?? 'circle'}
                size={20}
                color={item.statusColor}
              />
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              {item.detail ? <Text style={styles.detail}>{item.detail}</Text> : null}
            </View>

            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>{item.dateLabel}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  seeAll: {
    fontSize: 13,
    color: Colors.skyBlue,
    fontWeight: '600',
  },
  list: {
    backgroundColor: Colors.bgCard,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  statusCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  detail: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: 2,
  },
  dateBadge: {
    alignItems: 'center',
    minWidth: 36,
  },
  dateText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 15,
    textTransform: 'uppercase',
  },
});

export default RecentActivity;
