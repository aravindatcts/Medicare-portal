import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuickActions, Colors } from '@medicare/shared';

const ICON_MAP: Record<string, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  'medical-bag': 'medical-bag',
  'pill': 'pill',
  'file-document-outline': 'file-document-outline',
  'help-circle-outline': 'help-circle-outline',
};

const QuickActions: React.FC = () => {
  const { data: actions = [] } = useQuickActions();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        {actions.map((action) => (
          <TouchableOpacity key={action.id} style={styles.tile} activeOpacity={0.75}>
            <View style={styles.iconWrap}>
              <MaterialCommunityIcons
                name={ICON_MAP[action.icon] ?? 'circle'}
                size={26}
                color={Colors.skyBlue}
              />
            </View>
            <Text style={styles.label}>{action.label}</Text>
          </TouchableOpacity>
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
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tile: {
    width: '47%',
    backgroundColor: Colors.bgCard,
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    gap: 10,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: Colors.logoBadgeBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
});

export default QuickActions;
