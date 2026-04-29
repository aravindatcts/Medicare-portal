import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useProviders } from '@medicare/shared';
import type { ProviderData } from '@medicare/shared';
import LoadingSkeleton from '../components/LoadingSkeleton';

const C = {
  primary: '#003461',
  primaryContainer: '#004b87',
  secondary: '#00658d',
  secondaryContainer: '#41befd',
  onSecondaryContainer: '#004b69',
  secondaryFixed: '#c6e7ff',
  primaryFixed: '#d3e4ff',
  onPrimaryContainer: '#8abcff',
  tertiary: '#572500',
  surfaceLowest: '#ffffff',
  surfaceHighest: '#e1e3e4',
  surfaceLow: '#f3f4f5',
  onSurfaceVariant: '#424750',
  white: '#ffffff',
  chipActive: '#003461',
  chipActiveTxt: '#ffffff',
  chipInactive: '#f3f4f5',
  chipInactiveTxt: '#424750',
};

const SF_REGION = {
  latitude: 37.7749,
  longitude: -122.4194,
  latitudeDelta: 0.18,
  longitudeDelta: 0.18,
};

const RADIUS_OPTIONS = [
  { label: 'Any',   value: undefined },
  { label: '2 mi',  value: 2 },
  { label: '5 mi',  value: 5 },
  { label: '10 mi', value: 10 },
  { label: '25 mi', value: 25 },
];

const CATEGORIES = [
  'All',
  'Primary Care',
  'Cardiology',
  'Internal Medicine',
  'Physical Therapy',
  'Dermatology',
  'Orthopedics',
  'Neurology',
  'Gastroenterology',
  'Psychiatry',
  'Ophthalmology',
];

// ─── Provider Card ─────────────────────────────────────────────────────────────
function ProviderCard({ provider }: { provider: ProviderData }) {
  return (
    <View style={styles.providerCard}>
      <Image source={{ uri: provider.photo }} style={styles.providerPhoto} />

      <View style={styles.providerBody}>
        <View style={styles.providerTopRow}>
          <Text style={styles.providerName} numberOfLines={1}>{provider.name}</Text>
          {provider.inNetwork && (
            <View style={styles.networkBadge}>
              <MaterialCommunityIcons name="check-decagram" size={11} color={C.onSecondaryContainer} />
              <Text style={styles.networkBadgeText}>IN-NETWORK</Text>
            </View>
          )}
        </View>

        <Text style={styles.providerSpecialty} numberOfLines={1}>{provider.specialty}</Text>

        <View style={styles.providerMeta}>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="star" size={14} color={C.tertiary} />
            <Text style={styles.metaRating}>{provider.rating.toFixed(1)}</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="map-marker-outline" size={14} color={C.onSurfaceVariant} />
            <Text style={styles.metaDistance}>{provider.distance.toFixed(1)} mi</Text>
          </View>
          <Text style={styles.metaAddress} numberOfLines={1}>{provider.address}</Text>
        </View>

        <TouchableOpacity style={styles.bookBtn} activeOpacity={0.85}>
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Main Screen ───────────────────────────────────────────────────────────────
const FindCareScreen: React.FC = () => {
  const [mapEnabled, setMapEnabled] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [debouncedName, setDebouncedName] = useState('');
  const [selectedRadius, setSelectedRadius] = useState<number | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Debounce name search — only fires query after 400 ms of inactivity
  useEffect(() => {
    const t = setTimeout(() => setDebouncedName(nameInput), 400);
    return () => clearTimeout(t);
  }, [nameInput]);

  const { data: providers = [], isLoading } = useProviders({
    category: selectedCategory,
    maxDistance: selectedRadius,
    name: debouncedName || undefined,
  });

  return (
    <ScrollView
      style={styles.scroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      {/* Page title */}
      <Text style={styles.pageTitle}>How can we{'\n'}help today?</Text>

      {/* Search by name */}
      <View style={styles.searchWrap}>
        <MaterialCommunityIcons name="account-heart-outline" size={22} color={C.secondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by provider name…"
          placeholderTextColor={`${C.onSurfaceVariant}99`}
          value={nameInput}
          onChangeText={setNameInput}
          returnKeyType="search"
        />
        {nameInput.length > 0 && (
          <TouchableOpacity onPress={() => setNameInput('')} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <MaterialCommunityIcons name="close-circle" size={18} color={C.onSurfaceVariant} />
          </TouchableOpacity>
        )}
      </View>

      {/* Radius filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Radius</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {RADIUS_OPTIONS.map(opt => {
            const active = selectedRadius === opt.value;
            return (
              <TouchableOpacity
                key={opt.label}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setSelectedRadius(opt.value)}
                activeOpacity={0.75}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{opt.label}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Category filter */}
      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {CATEGORIES.map(cat => {
            const active = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setSelectedCategory(cat)}
                activeOpacity={0.75}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Map toggle */}
      <View style={styles.mapToggleRow}>
        <View style={styles.mapToggleLeft}>
          <MaterialCommunityIcons name="map-outline" size={20} color={C.secondary} />
          <Text style={styles.mapToggleLabel}>Show Map View</Text>
        </View>
        <TouchableOpacity
          style={[styles.toggle, mapEnabled && styles.toggleActive]}
          onPress={() => setMapEnabled(!mapEnabled)}
          activeOpacity={0.8}
        >
          <View style={[styles.toggleThumb, mapEnabled && styles.toggleThumbActive]} />
        </TouchableOpacity>
      </View>

      {/* Map */}
      {mapEnabled && (
        <View style={styles.mapWrap}>
          <MapView
            provider={PROVIDER_DEFAULT}
            style={styles.map}
            initialRegion={SF_REGION}
            showsUserLocation
            showsMyLocationButton={false}
          >
            {providers.map(p => (
              <Marker
                key={p.id}
                coordinate={p.coordinate}
                title={p.name}
                description={`${p.specialty} · ${p.distance.toFixed(1)} mi`}
                pinColor={p.inNetwork ? C.primary : C.tertiary}
              />
            ))}
          </MapView>
        </View>
      )}

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>Top matches for you</Text>
        {isLoading ? (
          <LoadingSkeleton style={{ width: 60, height: 16, borderRadius: 4 }} />
        ) : (
          <Text style={styles.resultsCount}>
            {providers.length} {providers.length === 1 ? 'Result' : 'Results'}
          </Text>
        )}
      </View>

      {/* Provider list */}
      {isLoading ? (
        <View style={styles.providerList}>
          <LoadingSkeleton style={{ height: 160, borderRadius: 16, marginBottom: 12 }} />
          <LoadingSkeleton style={{ height: 160, borderRadius: 16, marginBottom: 12 }} />
          <LoadingSkeleton style={{ height: 160, borderRadius: 16 }} />
        </View>
      ) : providers.length === 0 ? (
        <View style={styles.emptyWrap}>
          <MaterialCommunityIcons name="account-search-outline" size={48} color={C.onSurfaceVariant} />
          <Text style={styles.emptyText}>No providers match your filters.</Text>
          <Text style={styles.emptySub}>Try widening your radius or changing the category.</Text>
        </View>
      ) : (
        <View style={styles.providerList}>
          {providers.map(p => <ProviderCard key={p.id} provider={p} />)}
        </View>
      )}

      {/* Care Guide CTA */}
      <View style={styles.ctaCard}>
        <View style={styles.ctaCircle} />
        <Text style={styles.ctaTitle}>Need help deciding?</Text>
        <Text style={styles.ctaBody}>
          Speak with a Care Guide who understands your benefits and can find the right specialist for you.
        </Text>
        <TouchableOpacity style={styles.ctaBtn} activeOpacity={0.85}>
          <MaterialCommunityIcons name="face-agent" size={18} color={C.onSecondaryContainer} />
          <Text style={styles.ctaBtnText}>Call Care Guide</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 16 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 16, paddingBottom: 8 },

  pageTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: C.primary,
    letterSpacing: -0.5,
    lineHeight: 38,
    marginHorizontal: 16,
    marginBottom: 16,
  },

  // ── Search
  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.surfaceHighest,
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 14,
    height: 52,
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: C.primary,
  },

  // ── Filter sections
  filterSection: {
    marginBottom: 14,
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: C.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  chipsRow: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 99,
    backgroundColor: C.chipInactive,
  },
  chipActive: {
    backgroundColor: C.chipActive,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: C.chipInactiveTxt,
  },
  chipTextActive: {
    color: C.chipActiveTxt,
  },

  // ── Map toggle
  mapToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: `${C.secondaryFixed}50`,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  mapToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  mapToggleLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: C.onSecondaryContainer,
  },
  toggle: {
    width: 52,
    height: 30,
    borderRadius: 15,
    backgroundColor: C.surfaceHighest,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  toggleActive: {
    backgroundColor: C.secondary,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: C.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },

  // ── Map
  mapWrap: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  map: { flex: 1 },

  // ── Results header
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.primary,
  },
  resultsCount: {
    fontSize: 11,
    fontWeight: '700',
    color: C.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // ── Loading / empty
  loadingWrap: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: C.onSurfaceVariant,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 32,
    gap: 8,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '700',
    color: C.primary,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: 13,
    color: C.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 20,
  },

  // ── Provider list
  providerList: {
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  providerCard: {
    flexDirection: 'row',
    backgroundColor: C.surfaceLowest,
    borderRadius: 16,
    padding: 14,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  providerPhoto: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: C.primaryFixed,
    flexShrink: 0,
  },
  providerBody: { flex: 1 },
  providerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
    gap: 6,
  },
  providerName: {
    fontSize: 15,
    fontWeight: '700',
    color: C.primary,
    flex: 1,
  },
  networkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: `${C.secondaryContainer}30`,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    flexShrink: 0,
  },
  networkBadgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: C.onSecondaryContainer,
    letterSpacing: 0.3,
  },
  providerSpecialty: {
    fontSize: 12,
    fontWeight: '500',
    color: C.onSurfaceVariant,
    marginBottom: 8,
  },
  providerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
    flexWrap: 'nowrap',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    flexShrink: 0,
  },
  metaRating: {
    fontSize: 12,
    fontWeight: '700',
    color: C.tertiary,
  },
  metaDistance: {
    fontSize: 12,
    color: C.onSurfaceVariant,
  },
  metaAddress: {
    fontSize: 11,
    color: C.onSurfaceVariant,
    flex: 1,
  },
  bookBtn: {
    backgroundColor: C.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  bookBtnText: {
    color: C.white,
    fontWeight: '700',
    fontSize: 13,
  },

  // ── CTA card
  ctaCard: {
    backgroundColor: C.primary,
    marginHorizontal: 16,
    borderRadius: 24,
    borderTopRightRadius: 0,
    padding: 28,
    overflow: 'hidden',
  },
  ctaCircle: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 24,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: C.white,
    marginBottom: 8,
    lineHeight: 28,
  },
  ctaBody: {
    fontSize: 13,
    color: C.onPrimaryContainer,
    lineHeight: 20,
    marginBottom: 20,
    maxWidth: '85%',
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: C.secondaryContainer,
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  ctaBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: C.onSecondaryContainer,
  },
});

export default FindCareScreen;
