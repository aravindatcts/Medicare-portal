import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, Colors } from '@medicare/shared';

const ICON_MAP: Record<string, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  'view-dashboard-outline': 'view-dashboard-outline',
  'map-marker-outline': 'map-marker-outline',
  'shield-outline': 'shield-outline',
  'pill': 'pill',
  'menu': 'menu',
};

interface Props {
  activeId: string;
  onPress: (id: string) => void;
}

const BottomNav: React.FC<Props> = ({ activeId, onPress }) => {
  const { data: items = [] } = useNavigation();

  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.tab}
            onPress={() => onPress(item.id)}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={ICON_MAP[item.icon] ?? 'circle'}
              size={22}
              color={isActive ? Colors.navActive : Colors.navInactive}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {item.label}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.navBg,
    borderTopWidth: 1,
    borderTopColor: Colors.navBorder,
    paddingBottom: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 6,
    gap: 3,
    position: 'relative',
  },
  label: {
    fontSize: 9,
    fontWeight: '600',
    color: Colors.navInactive,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  labelActive: {
    color: Colors.navActive,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: '30%',
    right: '30%',
    height: 2,
    backgroundColor: Colors.navActive,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
});

export default BottomNav;
