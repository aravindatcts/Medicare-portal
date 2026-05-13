import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCmsPage, useMember } from '@medicare/shared';
import { CmsRenderer } from '../../cms/CmsRenderer';
import TopBar from '../../components/TopBar';
import type { TabParamList, AppStackParamList } from '../../navigation/types';
import type { DashboardScreenProps } from '../../navigation/types';

type DashboardNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<AppStackParamList>
>;

export default function DashboardScreen(_props: DashboardScreenProps) {
  const navigation = useNavigation<DashboardNavProp>();
  const insets = useSafeAreaInsets();

  const { data: cmsPage } = useCmsPage('dashboard');
  const { data: member, isLoading: memberLoading } = useMember();

  function navigateToTab(tab: keyof TabParamList) {
    navigation.navigate(tab as any);
  }

  return (
    <View style={styles.root} accessibilityLabel="dashboard-screen">
      <View style={{ paddingTop: insets.top }} />
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <TopBar showBack={false} />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CmsRenderer 
          blocks={cmsPage?.blocks || []} 
          context={{ 
            member, 
            memberLoading,
            onNavigate: (route: string) => {
              if (route === 'find-care' || route === 'find-doctor') navigateToTab('FindCare');
              else if (route === 'rx' || route === 'refill-rx') navigateToTab('Prescriptions');
              else if (route === 'benefits') navigateToTab('Benefits');
              else if (route === 'history') navigation.navigate('History' as any);
              else if (route === 'claims') navigateToTab('Claims');
            }
          }} 
        />
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

