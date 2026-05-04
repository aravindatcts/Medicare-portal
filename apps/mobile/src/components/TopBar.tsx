import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, FontSize } from '@medicare/shared';
import type { AppStackParamList } from '../navigation/types';

export default function TopBar() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();

  return (
    <View style={styles.topBar}>
      <View style={styles.logoRow}>
        <MaterialCommunityIcons name="account-circle-outline" size={28} color={Colors.primary} />
        <Text style={styles.appName}>AmeriHealth Caritas</Text>
      </View>
      <View style={styles.headerActions}>
        <TouchableOpacity
          style={styles.iconButton}
          accessibilityLabel="Notifications"
          accessibilityRole="button"
          onPress={() => navigation.navigate('Notifications')}
        >
          <MaterialCommunityIcons name="bell-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          accessibilityLabel="Settings"
          accessibilityRole="button"
          onPress={() => navigation.navigate('Settings')}
        >
          <MaterialCommunityIcons name="cog-outline" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(25, 28, 29, 0.05)',
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  appName: { fontSize: FontSize.xl, fontWeight: '900', color: Colors.primary, letterSpacing: -0.5 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconButton: { padding: 4 },
});
