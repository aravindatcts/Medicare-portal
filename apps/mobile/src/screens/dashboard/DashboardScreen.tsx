import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  WelcomeSection,
  AiConcierge,
  NextBestAction,
  DigitalIdCard,
  QuickActions,
  PrimaryCare,
  PlanInformation,
} from '../../components/dashboard';
import TopBar from '../../components/TopBar';
import flags from '../../config/featureFlags';
import type { TabParamList } from '../../navigation/types';
import type { DashboardScreenProps } from '../../navigation/types';

export default function DashboardScreen(_props: DashboardScreenProps) {
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const insets = useSafeAreaInsets();

  function navigateToTab(tab: keyof TabParamList) {
    navigation.navigate(tab as any);
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <TopBar />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <WelcomeSection />
        {flags.AI_CONCIERGE && <AiConcierge />}
        <NextBestAction />
        <PlanInformation onNavigate={() => navigateToTab('Benefits')} />
        <PrimaryCare onNavigate={() => navigateToTab('FindCare')} />
        <DigitalIdCard />
        <QuickActions onNavigate={(route) => {
          if (route === 'find-care' || route === 'find-doctor') navigateToTab('FindCare');
          else if (route === 'rx' || route === 'refill-rx') navigateToTab('Prescriptions');
          else if (route === 'benefits') navigateToTab('Benefits');
        }} />
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f8f9fa' },
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 10, paddingBottom: 100 },
});

