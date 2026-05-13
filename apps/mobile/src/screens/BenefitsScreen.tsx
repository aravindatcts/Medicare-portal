import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, useBenefits, useMember, useCmsPage } from '@medicare/shared';
import LoadingSkeleton from '../components/LoadingSkeleton';
import TopBar from '../components/TopBar';
import { CmsRenderer } from '../cms/CmsRenderer';

const BenefitsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { data: benefits, isLoading: benefitsLoading } = useBenefits();
  const { data: member, isLoading: memberLoading } = useMember();
  const { data: cmsPage, isLoading: cmsLoading } = useCmsPage('benefits');
  
  const isLoading = benefitsLoading || memberLoading || cmsLoading;

  if (isLoading || !benefits) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <TopBar />
        <View style={styles.stableHeader}>
          <Text style={styles.navTitle}>Your Benefits</Text>
          <Text style={styles.pageSubtitle}>Maximize your health coverage.</Text>
        </View>
        <View style={[styles.scroll, styles.scrollContent]}>
          <LoadingSkeleton style={{ height: 180, borderRadius: 20, borderTopRightRadius: 48, borderBottomLeftRadius: 48, marginBottom: 20 }} />
          <LoadingSkeleton style={{ width: 140, height: 24, marginBottom: 12, borderRadius: 4 }} />
          <LoadingSkeleton style={{ height: 110, borderRadius: 16, marginBottom: 10, borderTopRightRadius: 28 }} />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]} testID="benefits-screen">
      <TopBar />
      <View style={styles.stableHeader}>
        <Text style={styles.navTitle}>Your Benefits</Text>
        <Text style={styles.pageSubtitle}>Maximize your health coverage.</Text>
      </View>
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <CmsRenderer 
          blocks={cmsPage?.blocks || []} 
          context={{ member, benefits }} 
        />
        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
};


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
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  scroll: { flex: 1, backgroundColor: Colors.background },
  scrollContent: { paddingHorizontal: 16, paddingTop: 4 },

  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.background },

  // Hero Card
  heroCard: {
    borderRadius: 20,
    borderTopRightRadius: 48,
    borderBottomLeftRadius: 48,
    padding: 24,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  heroDecorCircle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -40,
    right: -30,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.secondaryContainer,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 14,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  heroPlanName: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
  },
  heroMemberId: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 20,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 20,
  },
  heroButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },

  // Section titles
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 12,
    marginTop: 4,
  },

  // Cost Cards
  costCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderTopRightRadius: 28,
    padding: 16,
    marginBottom: 10,
    shadowColor: 'rgba(0,52,97,0.10)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  costHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  costLabel: { fontSize: 14, fontWeight: '600', color: Colors.onSurface },
  costPct: { fontSize: 14, fontWeight: '700', color: Colors.secondary },
  progressTrack: {
    height: 8,
    backgroundColor: Colors.surfaceContainerHigh,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: 8,
    backgroundColor: Colors.secondary,
    borderRadius: 4,
  },
  costAmounts: { flexDirection: 'row', justifyContent: 'space-between' },
  costSpent: { fontSize: 12, color: Colors.secondary, fontWeight: '600' },
  costTotal: { fontSize: 12, color: Colors.onSurfaceVariant },

  // Featured card
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderTopRightRadius: 32,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: 'rgba(0,52,97,0.10)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  featuredAccent: {
    width: 4,
    backgroundColor: Colors.secondary,
  },
  featuredContent: {
    flex: 1,
    padding: 16,
  },
  breakdownIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breakdownTitle: { fontSize: 14, fontWeight: '700', color: Colors.onSurface },
  breakdownSubtitle: { fontSize: 12, color: Colors.onSurfaceVariant, marginTop: 1 },
  lineItemsContainer: { gap: 8 },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: Colors.surfaceContainerHigh,
  },
  lineItemLabel: { fontSize: 13, color: Colors.onSurfaceVariant },
  lineItemValue: { fontSize: 13, fontWeight: '600', color: Colors.secondary },

  // Compact grid
  compactGrid: { gap: 10, marginBottom: 20 },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: 16,
    borderBottomLeftRadius: 28,
    padding: 14,
    gap: 12,
    shadowColor: 'rgba(0,52,97,0.10)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBadgeSmall: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.surfaceContainerHigh,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  compactCardBody: { flex: 1 },
  lineItemCompact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  lineItemLabelSm: { fontSize: 12, color: Colors.onSurfaceVariant },
  lineItemValueSm: { fontSize: 12, fontWeight: '600', color: Colors.secondary },

  // Wellness Card
  wellnessCard: {
    height: 220,
    borderRadius: 20,
    borderTopRightRadius: 48,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 6,
  },
  wellnessImage: {
    ...StyleSheet.absoluteFillObject,
  },
  wellnessOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 20,
  },
  wellnessTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: 4,
  },
  wellnessBody: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 14,
    lineHeight: 18,
  },
  wellnessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  wellnessButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default BenefitsScreen;
