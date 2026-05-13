import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, useCmsPage } from '@medicare/shared';
import LoadingSkeleton from '../components/LoadingSkeleton';
import TopBar from '../components/TopBar';
import { CmsRenderer } from '../cms/CmsRenderer';

const HraScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { data: cmsPage, isLoading } = useCmsPage('hra');

  if (isLoading) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <TopBar />
        <View style={styles.content}>
          <LoadingSkeleton style={{ height: 160, borderRadius: 24, marginBottom: 24 }} />
          <LoadingSkeleton style={{ height: 300, borderRadius: 24 }} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <TopBar />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CmsRenderer blocks={cmsPage?.blocks || []} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
});

export default HraScreen;
