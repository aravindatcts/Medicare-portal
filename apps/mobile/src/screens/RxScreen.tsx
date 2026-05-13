import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, useCmsPage, usePrescriptions } from '@medicare/shared';
import TopBar from '../components/TopBar';
import { CmsRenderer } from '../cms/CmsRenderer';

const RxScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { data: cmsPage } = useCmsPage('prescriptions');
  const { data: prescriptionsData, isLoading } = usePrescriptions();

  const context = {
    rx: prescriptionsData,
    isLoading,
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <TopBar />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CmsRenderer blocks={cmsPage?.blocks || []} context={context} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.surfaceContainerLow },
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 4, paddingBottom: 24 },
});

export default RxScreen;
