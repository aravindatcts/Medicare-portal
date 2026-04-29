import React, { useState } from 'react';
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
import WelcomeSection from '../components/WelcomeSection';
import AiConcierge from '../components/AiConcierge';
import NextBestAction from '../components/NextBestAction';
import DigitalIdCard from '../components/DigitalIdCard';
import QuickActions from '../components/QuickActions';
import PrimaryCare from '../components/PrimaryCare';
import BottomNav from '../components/BottomNav';
import RxScreen from './RxScreen';
import FindCareScreen from './FindCareScreen';
import BenefitsScreen from './BenefitsScreen';
import ProviderDetailScreen from './ProviderDetailScreen';

const DashboardScreen: React.FC = () => {
  const [activeNav, setActiveNav] = useState('dashboard');

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
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#003461" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="cog-outline" size={24} color="#003461" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Body — switches based on active tab */}
      {activeNav === 'rx' ? (
        <RxScreen />
      ) : activeNav === 'find-care' ? (
        <FindCareScreen />
      ) : activeNav === 'benefits' ? (
        <BenefitsScreen />
      ) : activeNav === 'provider-detail' ? (
        <ProviderDetailScreen onBack={() => setActiveNav('dashboard')} />
      ) : (
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <WelcomeSection />
          <AiConcierge />
          <NextBestAction />
          <PrimaryCare onNavigate={setActiveNav} />
          <DigitalIdCard />
          <QuickActions onNavigate={setActiveNav} />
          <View style={{ height: 32 }} />
        </ScrollView>
      )}

      {/* Bottom Nav */}
      <BottomNav activeId={activeNav} onPress={setActiveNav} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#f8f9fa', // surface color from HTML
  },
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
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appName: {
    fontSize: 20,
    fontWeight: '900',
    color: '#003461', // primary
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 10,
    paddingBottom: 100, // accommodate bottom nav
  },
});

export default DashboardScreen;
