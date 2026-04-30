import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import WelcomeSection from '../../components/WelcomeSection';
import AiConcierge from '../../components/AiConcierge';
import NextBestAction from '../../components/NextBestAction';
import DigitalIdCard from '../../components/DigitalIdCard';
import QuickActions from '../../components/QuickActions';
import PrimaryCare from '../../components/PrimaryCare';
import type { TabParamList } from '../../navigation/types';
import type { DashboardScreenProps } from '../../navigation/types';

export default function DashboardScreen(_props: DashboardScreenProps) {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  function navigateToTab(tab: keyof TabParamList) {
    navigation.navigate(tab as any);
  }

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Top App Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <MaterialCommunityIcons name="account-circle-outline" size={28} color="#003461" />
          <Text style={styles.appName}>AmeriHealth Caritas</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            accessibilityLabel="Notifications"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="bell-outline" size={24} color="#003461" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            accessibilityLabel="Settings"
            accessibilityRole="button"
          >
            <MaterialCommunityIcons name="cog-outline" size={24} color="#003461" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <WelcomeSection />
        <AiConcierge />
        <NextBestAction />
        <PrimaryCare onNavigate={() => navigateToTab('FindCare')} />
        <DigitalIdCard />
        <QuickActions onNavigate={(route) => {
          if (route === 'find-care' || route === 'find-doctor') navigateToTab('FindCare');
          else if (route === 'rx' || route === 'refill-rx') navigateToTab('Prescriptions');
          else if (route === 'benefits') navigateToTab('Benefits');
        }} />
        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f8f9fa' },
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
  appName: { fontSize: 20, fontWeight: '900', color: '#003461', letterSpacing: -0.5 },
  headerActions: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconButton: { padding: 4 },
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 10, paddingBottom: 100 },
});
