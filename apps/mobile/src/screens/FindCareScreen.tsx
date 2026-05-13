import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, useCmsPage } from '@medicare/shared';
import TopBar from '../components/TopBar';
import { CmsRenderer } from '../cms/CmsRenderer';
import type { FindCareScreenProps } from '../navigation/types';

export default function FindCareScreen({ navigation }: FindCareScreenProps) {
  const insets = useSafeAreaInsets();
  const { data: cmsPage } = useCmsPage('find-care');

  return (
    <View style={styles.root} accessibilityLabel="find-care-screen">
      <View style={{ paddingTop: insets.top }} />
      <TopBar />
      <CmsRenderer blocks={cmsPage?.blocks || []} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.surface },
});
