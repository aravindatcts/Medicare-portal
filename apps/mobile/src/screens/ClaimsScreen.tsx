import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, useCmsPage } from '@medicare/shared';
import TopBar from '../components/TopBar';
import { CmsRenderer } from '../cms/CmsRenderer';

export default function ClaimsScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { data: cmsPage, isLoading, refetch } = useCmsPage('claims');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  const [activeFilters, setActiveFilters] = React.useState<any>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Effect to reset page on filter change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeFilters]);

  const context = {
    activeFilters, setActiveFilters,
    currentPage, setCurrentPage,
    onNavigate: navigation.navigate
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]} testID="claims-screen">
      <TopBar />
      <View style={styles.stableHeader}>
        <Text style={styles.navTitle}>Claims</Text>
        <Text style={styles.pageSubtitle}>Your Medical History</Text>
      </View>

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      >
        <CmsRenderer blocks={cmsPage?.blocks || []} context={context} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  stableHeader: {
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 8,
  },
  navTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
    marginTop: 2,
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 40 },
});
