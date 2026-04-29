import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuickActions } from '@medicare/shared';

const ICON_MAP: Record<string, React.ComponentProps<typeof MaterialCommunityIcons>['name']> = {
  'medical-bag': 'medical-bag',
  'pill': 'pill',
  'file-document-outline': 'folder-text-outline',
  'help-circle-outline': 'help-circle-outline',
  'account-search-outline': 'account-search-outline',
};

interface Props {
  onNavigate?: (route: string) => void;
}

const QuickActions: React.FC<Props> = ({ onNavigate }) => {
  const { data: actions = [] } = useQuickActions();

  // If we have dynamic actions, map the first two
  const displayActions = actions.length >= 2 ? actions.slice(0, 2) : [
    { id: '1', icon: 'file-document-outline', label: 'My Records', description: 'Access test results' },
    { id: '2', icon: 'pill', label: 'Prescriptions', description: '2 active orders' }
  ];

  const primaryAction = displayActions[0];
  const secondaryAction = displayActions[1];

  return (
    <View style={styles.container}>
      {/* Primary Action Card */}
      <TouchableOpacity 
        style={styles.cardPrimary} 
        activeOpacity={0.9}
        onPress={() => {
          if (primaryAction.id === 'find-doctor') onNavigate?.('find-care');
          else if (primaryAction.id === 'refill-rx') onNavigate?.('rx');
        }}
      >
        <View style={styles.iconBoxPrimary}>
          <MaterialCommunityIcons name={ICON_MAP[primaryAction.icon] || 'folder-text-outline'} size={24} color="#ffffff" />
        </View>
        <View>
          <Text style={styles.cardTitle}>{primaryAction.label}</Text>
          <Text style={styles.cardSubtitle}>{(primaryAction as any).description || 'Access details'}</Text>
        </View>
      </TouchableOpacity>
      
      {/* Secondary Action Card */}
      <TouchableOpacity 
        style={styles.cardSecondary} 
        activeOpacity={0.9}
        onPress={() => {
          if (secondaryAction.id === 'find-doctor') onNavigate?.('find-care');
          else if (secondaryAction.id === 'refill-rx') onNavigate?.('rx');
        }}
      >
        <View style={styles.cardSecondaryHeader}>
          <View style={styles.iconBoxSecondary}>
            <MaterialCommunityIcons name={ICON_MAP[secondaryAction.icon] || 'pill'} size={24} color="#003461" />
          </View>
          {secondaryAction.icon === 'pill' && (
            <View style={styles.alertBadge}>
              <Text style={styles.alertBadgeText}>REFILL SOON</Text>
            </View>
          )}
        </View>
        <View>
          <Text style={styles.cardTitle}>{secondaryAction.label}</Text>
          <Text style={styles.cardSubtitle}>{(secondaryAction as any).description || 'View details'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    gap: 16,
  },
  cardPrimary: {
    flex: 1,
    backgroundColor: 'rgba(65, 190, 253, 0.15)', // secondary-container lighter opacity
    borderRadius: 40,
    padding: 20,
    aspectRatio: 1,
    justifyContent: 'space-between',
    borderColor: 'rgba(0, 101, 141, 0.1)',
    borderWidth: 1,
    shadowColor: '#003461',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
  },
  cardSecondary: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 40,
    padding: 20,
    aspectRatio: 1,
    justifyContent: 'space-between',
    borderColor: 'rgba(25, 28, 29, 0.05)',
    borderWidth: 1,
    shadowColor: '#003461',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  iconBoxPrimary: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#00658d', // secondary
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00658d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  iconBoxSecondary: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#f3f4f5', // surface-container-low
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(25, 28, 29, 0.05)',
    borderWidth: 1,
  },
  cardSecondaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  alertBadge: {
    backgroundColor: 'rgba(255, 218, 214, 0.5)', // error-container/50
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderColor: 'rgba(186, 26, 26, 0.1)',
    borderWidth: 1,
  },
  alertBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#ba1a1a', // error
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#003461', // primary
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#424750', // on-surface-variant
  },
});

export default QuickActions;
