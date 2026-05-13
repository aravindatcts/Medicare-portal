import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  BackHandler,
  Platform,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors, Radius, Spacing, useNotifications, useCmsPage } from '@medicare/shared';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { CmsRenderer } from '../cms/CmsRenderer';
import ScreenHeader from '../components/layout/ScreenHeader';
import ErrorState from '../components/layout/ErrorState';

export default function NotificationsScreen() {
  const navigation = useNavigation();
  const { data: serverNotifications, isLoading: notificationsLoading, isError, refetch } = useNotifications();
  const { data: cmsPage, isLoading: cmsLoading } = useCmsPage('notifications');
  const [refreshing, setRefreshing] = useState(false);

  const isLoading = notificationsLoading || cmsLoading;

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    try {
      await refetch();
    } finally {
      setRefreshing(false);
    }
  }, [refetch]);

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.canGoBack()) { navigation.goBack(); return true; }
      return false;
    });
    return () => subscription.remove();
  }, [navigation]);

  const unreadCount = useMemo(
    () => serverNotifications?.filter((n) => !n.read).length ?? 0,
    [serverNotifications],
  );

  const settingsIcon = (
    <MaterialCommunityIcons name="cog-outline" size={24} color={Colors.primary} />
  );

  return (
    <SafeAreaView style={styles.root}>
      <ScreenHeader
        title="Notifications"
        badge={unreadCount}
        onBack={() => navigation.canGoBack() && navigation.goBack()}
        right={settingsIcon}
      />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      >
        {isLoading ? (
          <View style={styles.skeletonWrap}>
            <LoadingSkeleton style={styles.skeletonHero} />
            <LoadingSkeleton style={styles.skeletonItem} />
            <LoadingSkeleton style={styles.skeletonItem} />
          </View>
        ) : isError ? (
          <ErrorState
            icon="wifi-off"
            message={"Couldn't load notifications.\nCheck that the mock server is running, then try again."}
            onRetry={() => refetch()}
          />
        ) : (
          <CmsRenderer
            blocks={cmsPage?.blocks || []}
            context={{ notifications: serverNotifications }}
          />
        )}

        <View style={styles.bottomPad} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.surface },
  scroll: { flex: 1 },
  scrollContent: { paddingTop: Spacing.md, paddingHorizontal: Spacing.md },
  skeletonWrap: { gap: Spacing.sm + 4 },
  skeletonHero: { height: 160, borderRadius: Radius.lg, marginBottom: Spacing.lg + 4 },
  skeletonItem: { height: 100, borderRadius: Radius.md },
  bottomPad: { height: Spacing.xl },
});
