import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HeroBanner from '../components/HeroBanner';
import PlanSummary from '../components/PlanSummary';
import MemberCard from '../components/MemberCard';
import QuickActions from '../components/QuickActions';
import RecentActivity from '../components/RecentActivity';
import ActionAlertBanner from '../components/ActionAlert';
import WellnessWisdom from '../components/WellnessWisdom';
import BottomNav from '../components/BottomNav';
import RxScreen from './RxScreen';
import FindCareScreen from './FindCareScreen';
import BenefitsScreen from './BenefitsScreen';
import { Colors } from '@medicare/shared';

const DashboardScreen: React.FC = () => {
  const [activeNav, setActiveNav] = useState('dashboard');

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgLight} />

      {/* Top App Bar */}
      <View style={styles.topBar}>
        <View style={styles.logoRow}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=200&auto=format&fit=crop' }}
            style={styles.logoMarkImage}
          />
          <Text style={styles.appName}>AmeriHealth</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="bell" size={24} color={Colors.navyDark} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="cog" size={24} color={Colors.navyDark} />
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
      ) : (
        <ScrollView
          style={styles.scroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <HeroBanner />
          <PlanSummary />
          <MemberCard />
          <QuickActions />
          <RecentActivity />
          <ActionAlertBanner />
          <WellnessWisdom />
          <View style={{ height: 16 }} />
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
    backgroundColor: Colors.bgLight,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.bgLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoMarkImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  appName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.navyDark,
    letterSpacing: 0.3,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 16,
  },
});

export default DashboardScreen;
