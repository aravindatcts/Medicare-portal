import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useBenefits, useMember } from '@medicare/shared';
import type { BenefitBreakdownItem, CostItem } from '@medicare/shared';

const C = {
  primary: '#003461',
  primaryContainer: '#004b87',
  secondary: '#00658d',
  secondaryContainer: '#41befd',
  tertiary: '#572500',
  bgLight: '#f0f4f8',
  surface: '#ffffff',
  surfaceVariant: '#e8eef4',
  onPrimary: '#ffffff',
  onSurface: '#1a2a3a',
  onSurfaceVariant: '#4a6175',
  shadow: 'rgba(0,52,97,0.10)',
};

function HeroCoverageCard({ planName, memberId }: { planName: string; memberId: string }) {
  return (
    <LinearGradient
      colors={[C.primaryContainer, C.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.heroCard}
    >
      {/* Glassmorphism decoration circle */}
      <View style={styles.heroDecorCircle} />

      {/* Active Coverage badge */}
      <View style={styles.activeBadge}>
        <MaterialCommunityIcons name="shield-check" size={12} color={C.primary} />
        <Text style={styles.activeBadgeText}>Active Coverage</Text>
      </View>

      <Text style={styles.heroPlanName}>{planName}</Text>
      <Text style={styles.heroMemberId}>Member ID: {memberId}</Text>

      <TouchableOpacity style={styles.heroButton}>
        <MaterialCommunityIcons name="card-account-details-outline" size={16} color={C.onPrimary} />
        <Text style={styles.heroButtonText}>View Digital ID Card</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

function CostCard({ item }: { item: CostItem }) {
  const pct = Math.min(item.spent / item.total, 1);
  const pctLabel = Math.round(pct * 100);

  return (
    <View style={styles.costCard}>
      <View style={styles.costHeader}>
        <Text style={styles.costLabel}>{item.label}</Text>
        <Text style={styles.costPct}>{pctLabel}%</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${pctLabel}%` }]} />
      </View>
      <View style={styles.costAmounts}>
        <Text style={styles.costSpent}>${item.spent.toLocaleString()} spent</Text>
        <Text style={styles.costTotal}>of ${item.total.toLocaleString()}</Text>
      </View>
    </View>
  );
}

function BreakdownCard({ item }: { item: BenefitBreakdownItem }) {
  if (item.featured) {
    return (
      <View style={styles.featuredCard}>
        <View style={styles.featuredAccent} />
        <View style={styles.featuredContent}>
          <View style={styles.breakdownIconRow}>
            <View style={styles.iconBadge}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={20}
                color={C.secondary}
              />
            </View>
            <View>
              <Text style={styles.breakdownTitle}>{item.title}</Text>
              <Text style={styles.breakdownSubtitle}>{item.subtitle}</Text>
            </View>
          </View>
          <View style={styles.lineItemsContainer}>
            {item.lineItems.map((li, idx) => (
              <View key={idx} style={styles.lineItem}>
                <Text style={styles.lineItemLabel}>{li.label}</Text>
                <Text style={styles.lineItemValue}>{li.value}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.compactCard}>
      <View style={styles.iconBadgeSmall}>
        <MaterialCommunityIcons name={item.icon as any} size={18} color={C.secondary} />
      </View>
      <View style={styles.compactCardBody}>
        <Text style={styles.breakdownTitle}>{item.title}</Text>
        <Text style={styles.breakdownSubtitle}>{item.subtitle}</Text>
        {item.lineItems.map((li, idx) => (
          <View key={idx} style={styles.lineItemCompact}>
            <Text style={styles.lineItemLabelSm}>{li.label}</Text>
            <Text style={styles.lineItemValueSm}>{li.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function WellnessCard({ imageUrl, title, body }: { imageUrl: string; title: string; body: string }) {
  return (
    <View style={styles.wellnessCard}>
      <Image source={{ uri: imageUrl }} style={styles.wellnessImage} resizeMode="cover" />
      <LinearGradient
        colors={['transparent', 'rgba(0,52,97,0.85)']}
        style={styles.wellnessOverlay}
      >
        <Text style={styles.wellnessTitle}>{title}</Text>
        <Text style={styles.wellnessBody}>{body}</Text>
        <TouchableOpacity style={styles.wellnessButton}>
          <Text style={styles.wellnessButtonText}>Get Started</Text>
          <MaterialCommunityIcons name="arrow-right" size={16} color={C.onPrimary} />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
}

const BenefitsScreen: React.FC = () => {
  const { data: benefits, isLoading } = useBenefits();
  const { data: member } = useMember();

  if (isLoading || !benefits) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={C.primary} />
      </View>
    );
  }

  const featured = benefits.breakdown.find(b => b.featured);
  const compact = benefits.breakdown.filter(b => !b.featured);

  return (
    <ScrollView
      style={styles.scroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Hero Coverage Card */}
      <HeroCoverageCard
        planName={benefits.planName}
        memberId={member ? `AH-${member.memberId.replace(/\s/g, '').slice(0, 6)}-01` : benefits.memberId}
      />

      {/* Know Your Costs */}
      <Text style={styles.sectionTitle}>Know Your Costs</Text>
      {benefits.costs.map((c, i) => (
        <CostCard key={i} item={c} />
      ))}

      {/* Benefits Breakdown */}
      <Text style={styles.sectionTitle}>Benefits Breakdown</Text>
      {featured && <BreakdownCard item={featured} />}
      <View style={styles.compactGrid}>
        {compact.map(item => (
          <BreakdownCard key={item.id} item={item} />
        ))}
      </View>

      {/* Wellness Rewards */}
      <Text style={styles.sectionTitle}>Wellness Rewards</Text>
      <WellnessCard
        imageUrl={benefits.wellness.imageUrl}
        title={benefits.wellness.title}
        body={benefits.wellness.body}
      />

      <View style={{ height: 24 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: C.bgLight },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16 },

  loader: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: C.bgLight },

  // Hero Card
  heroCard: {
    borderRadius: 20,
    borderTopRightRadius: 48,
    borderBottomLeftRadius: 48,
    padding: 24,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: C.primary,
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
    backgroundColor: C.secondaryContainer,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 14,
  },
  activeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: C.primary,
    letterSpacing: 0.5,
  },
  heroPlanName: {
    fontSize: 22,
    fontWeight: '800',
    color: C.onPrimary,
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
    color: C.onPrimary,
  },

  // Section titles
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: C.onSurface,
    marginBottom: 12,
    marginTop: 4,
  },

  // Cost Cards
  costCard: {
    backgroundColor: C.surface,
    borderRadius: 16,
    borderTopRightRadius: 28,
    padding: 16,
    marginBottom: 10,
    shadowColor: C.shadow,
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
  costLabel: { fontSize: 14, fontWeight: '600', color: C.onSurface },
  costPct: { fontSize: 14, fontWeight: '700', color: C.secondary },
  progressTrack: {
    height: 8,
    backgroundColor: C.surfaceVariant,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: 8,
    backgroundColor: C.secondary,
    borderRadius: 4,
  },
  costAmounts: { flexDirection: 'row', justifyContent: 'space-between' },
  costSpent: { fontSize: 12, color: C.secondary, fontWeight: '600' },
  costTotal: { fontSize: 12, color: C.onSurfaceVariant },

  // Featured card
  featuredCard: {
    flexDirection: 'row',
    backgroundColor: C.surface,
    borderRadius: 16,
    borderTopRightRadius: 32,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  featuredAccent: {
    width: 4,
    backgroundColor: C.secondary,
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
    backgroundColor: C.surfaceVariant,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breakdownTitle: { fontSize: 14, fontWeight: '700', color: C.onSurface },
  breakdownSubtitle: { fontSize: 12, color: C.onSurfaceVariant, marginTop: 1 },
  lineItemsContainer: { gap: 8 },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: C.surfaceVariant,
  },
  lineItemLabel: { fontSize: 13, color: C.onSurfaceVariant },
  lineItemValue: { fontSize: 13, fontWeight: '600', color: C.secondary },

  // Compact grid
  compactGrid: { gap: 10, marginBottom: 20 },
  compactCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: C.surface,
    borderRadius: 16,
    borderBottomLeftRadius: 28,
    padding: 14,
    gap: 12,
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBadgeSmall: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: C.surfaceVariant,
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
  lineItemLabelSm: { fontSize: 12, color: C.onSurfaceVariant },
  lineItemValueSm: { fontSize: 12, fontWeight: '600', color: C.secondary },

  // Wellness Card
  wellnessCard: {
    height: 220,
    borderRadius: 20,
    borderTopRightRadius: 48,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: C.primary,
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
    color: C.onPrimary,
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
    color: C.onPrimary,
  },
});

export default BenefitsScreen;
