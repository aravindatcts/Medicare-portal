import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  BackHandler,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { descopeService } from '../services/descope.service';
import {
  Colors,
  FontSize,
  Radius,
  Spacing,
  useSettings,
  useUpdateSettingsMember,
  useUpdateSettingsPreferences,
} from '@medicare/shared';
import type { CommunicationPreference, SettingsPreferences } from '@medicare/shared';
import EditFieldModal from '../components/settings/EditFieldModal';
import PreferenceToggleRow from '../components/settings/PreferenceToggleRow';
import { isBiometricsEnabled, setBiometricsEnabled, clearAllData } from '../utils/secureStore';
import { useAuthStore } from '../store/auth.store';
import { IconBox } from '../components/atoms';
import ScreenHeader from '../components/layout/ScreenHeader';
import SectionLabel from '../components/layout/SectionLabel';
import SwitchRow from '../components/layout/SwitchRow';
import ErrorState from '../components/layout/ErrorState';

type EditingField = 'address' | 'phone' | null;

// Card-level divider — indented to align under text, kept local as it depends on card padding
function Divider() {
  return <View style={styles.divider} />;
}

function ActionRow({
  icon,
  label,
  value,
  onPress,
  destructive = false,
}: {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
  destructive?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.actionRow} onPress={onPress} activeOpacity={0.7}>
      <IconBox icon={icon as any} destructive={destructive} />
      <Text style={[styles.actionLabel, destructive && styles.actionLabelDestructive]}>
        {label}
      </Text>
      {value ? (
        <Text style={styles.actionValue}>{value}</Text>
      ) : (
        <MaterialCommunityIcons name="chevron-right" size={20} color={Colors.outlineVariant} />
      )}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { data, isLoading, isError, refetch } = useSettings();
  const updateMember = useUpdateSettingsMember();
  const updatePrefs = useUpdateSettingsPreferences();

  const [localPrefs, setLocalPrefs] = useState<SettingsPreferences | null>(null);
  const prefs = localPrefs ?? data?.preferences ?? null;

  const [editingField, setEditingField] = useState<EditingField>(null);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [biometricsEnabled, setBiometricsEnabledState] = useState(false);

  useEffect(() => {
    isBiometricsEnabled().then(setBiometricsEnabledState);
  }, []);

  async function handleToggleBiometrics(val: boolean) {
    setBiometricsEnabledState(val);
    await setBiometricsEnabled(val);
  }

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (navigation.canGoBack()) { navigation.goBack(); return true; }
      return false;
    });
    return () => sub.remove();
  }, [navigation]);

  async function handleSaveField(value: string) {
    if (!editingField || !data) return;
    try {
      await updateMember.mutateAsync({ [editingField]: value });
      setEditingField(null);
    } catch {
      Alert.alert('Error', 'Could not save changes. Please try again.');
    }
  }

  async function handleTogglePref(
    key: 'communicationPreference' | 'eobPreference',
    val: CommunicationPreference,
  ) {
    if (!data) return;
    const updated = { ...data.preferences, ...localPrefs, [key]: val } as SettingsPreferences;
    setLocalPrefs(updated);
    try {
      await updatePrefs.mutateAsync({ [key]: val });
      setLocalPrefs(null);
    } catch {
      setLocalPrefs(null);
      Alert.alert('Error', 'Could not update preference. Please try again.');
    }
  }

  const { logout, refreshToken } = useAuthStore();

  async function handleSignOut() {
    await descopeService.signOut(refreshToken ?? undefined);
    await clearAllData();
    logout();
  }

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'This will clear all local tokens, biometrics, and member links. You will be logged out immediately.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            try {
              await handleSignOut();
            } catch {
              Alert.alert('Error', 'Failed to clear data.');
            }
          },
        },
      ],
    );
  };

  const initials = data?.member.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? '';

  const editingValue =
    editingField === 'address' ? data?.member.address ?? ''
      : editingField === 'phone' ? data?.member.phone ?? ''
        : '';

  const editingLabel =
    editingField === 'address' ? 'Address'
      : editingField === 'phone' ? 'Phone Number'
        : '';

  const avatar = initials ? (
    <View style={styles.avatarCircle}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  ) : (
    <View style={[styles.avatarCircle, styles.avatarPlaceholder]} />
  );

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surfaceContainerLowest} />

      <ScreenHeader
        title="Settings"
        onBack={() => navigation.canGoBack() && navigation.goBack()}
        right={avatar}
      />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isLoading && (
          <View style={styles.centeredWrap}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )}

        {isError && (
          <ErrorState
            icon="wifi-off"
            message={"Couldn't load settings.\nCheck that the mock server is running, then try again."}
            onRetry={() => refetch()}
          />
        )}

        {!isLoading && !isError && data && (
          <>
            {/* Member hero card */}
            <LinearGradient
              colors={[Colors.navyDark, Colors.navyLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroCard}
            >
              <View style={styles.heroOrb1} />
              <View style={styles.heroOrb2} />
              <View style={styles.heroAvatar}>
                <Text style={styles.heroAvatarText}>{initials}</Text>
              </View>
              <Text style={styles.heroName}>{data.member.name}</Text>
              <View style={styles.heroMeta}>
                <MaterialCommunityIcons name="card-account-details-outline" size={13} color={Colors.blueLight} />
                <Text style={styles.heroMemberId}>{data.member.memberId}</Text>
              </View>
            </LinearGradient>

            <SectionLabel label="IDENTITY" />
            <View style={styles.card}>
              <View style={styles.infoRow}>
                <IconBox icon="map-marker-outline" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoFieldLabel}>Home Address</Text>
                  <Text style={styles.infoFieldValue}>{data.member.address}</Text>
                </View>
                <TouchableOpacity style={styles.editBtn} onPress={() => setEditingField('address')} activeOpacity={0.8}>
                  <MaterialCommunityIcons name="pencil-outline" size={17} color={Colors.primary} />
                </TouchableOpacity>
              </View>
              <Divider />
              <View style={styles.infoRow}>
                <IconBox icon="phone-outline" />
                <View style={styles.infoContent}>
                  <Text style={styles.infoFieldLabel}>Phone Number</Text>
                  <Text style={styles.infoFieldValue}>{data.member.phone}</Text>
                </View>
                <TouchableOpacity style={styles.editBtn} onPress={() => setEditingField('phone')} activeOpacity={0.8}>
                  <MaterialCommunityIcons name="pencil-outline" size={17} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            </View>

            <SectionLabel label="PREFERENCES" />
            <View style={styles.card}>
              <ActionRow icon="translate" label="Language" value={data.preferences.language} />
              {prefs && (
                <>
                  <Divider />
                  <PreferenceToggleRow
                    icon="email-outline"
                    label="Communication"
                    value={prefs.communicationPreference}
                    loading={updatePrefs.isPending}
                    onChange={(val) => handleTogglePref('communicationPreference', val)}
                  />
                  <Divider />
                  <PreferenceToggleRow
                    icon="file-document-outline"
                    label="EOB Statements"
                    value={prefs.eobPreference}
                    loading={updatePrefs.isPending}
                    onChange={(val) => handleTogglePref('eobPreference', val)}
                  />
                </>
              )}
            </View>

            <SectionLabel label="SECURITY" />
            <View style={styles.card}>
              <SwitchRow
                icon="face-recognition"
                label="Biometric Login"
                value={biometricsEnabled}
                onValueChange={handleToggleBiometrics}
              />
            </View>

            <SectionLabel label="NOTIFICATIONS" />
            <View style={styles.card}>
              <SwitchRow icon="bell-outline" label="Push Notifications" value={pushEnabled} onValueChange={setPushEnabled} />
              <Divider />
              <SwitchRow icon="receipt-text-outline" label="Claim Updates" value={pushEnabled} onValueChange={setPushEnabled} disabled={!pushEnabled} />
              <Divider />
              <SwitchRow icon="pill" label="Prescription Reminders" value={pushEnabled} onValueChange={setPushEnabled} disabled={!pushEnabled} />
            </View>

            <SectionLabel label="LEGAL & FAMILY" />
            <View style={styles.card}>
              <ActionRow icon="clipboard-text-outline" label="Add Plan / Contract" />
              <Divider />
              <ActionRow icon="account-star-outline" label="Add Power of Attorney" />
            </View>

            <SectionLabel label="ABOUT & HELP" />
            <View style={styles.card}>
              <ActionRow icon="help-circle-outline" label="Help Center" />
              <Divider />
              <ActionRow icon="shield-check-outline" label="Privacy Policy" />
              <Divider />
              <ActionRow icon="file-sign" label="Terms of Service" />
              <Divider />
              <ActionRow icon="star-outline" label="Rate the App" />
            </View>

            <TouchableOpacity
              style={styles.signOutBtn}
              activeOpacity={0.8}
              onPress={() =>
                Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Sign Out', style: 'destructive', onPress: handleSignOut },
                ])
              }
            >
              <MaterialCommunityIcons name="logout" size={20} color={Colors.error} />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>

            <SectionLabel label="DANGER ZONE" />
            <View style={styles.card}>
              <ActionRow icon="delete-sweep-outline" label="Reset All Local App Data" destructive onPress={handleResetData} />
            </View>

            <Text style={styles.version}>AmeriHealth Caritas · v1.0.0</Text>
          </>
        )}

        <View style={styles.bottomPad} />
      </ScrollView>

      <EditFieldModal
        visible={editingField !== null}
        label={editingLabel}
        value={editingValue}
        multiline={editingField === 'address'}
        loading={updateMember.isPending}
        onSave={handleSaveField}
        onClose={() => setEditingField(null)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.surface },
  scroll: { flex: 1 },
  scrollContent: { padding: Spacing.md },
  bottomPad: { height: Spacing.xl },
  centeredWrap: { alignItems: 'center', paddingVertical: 80, gap: Spacing.sm + 4 },

  // Avatar (right slot of ScreenHeader)
  avatarCircle: {
    width: 32,
    height: 32,
    borderRadius: Radius.full,
    backgroundColor: Colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholder: { backgroundColor: Colors.surfaceContainerHigh },
  avatarText: { fontSize: FontSize.xs, fontWeight: '800', color: Colors.onPrimary },

  // Hero card
  heroCard: {
    borderRadius: Radius.lg,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg + 4,
    overflow: 'hidden',
    alignItems: 'center',
    shadowColor: Colors.navyDark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  heroOrb1: {
    position: 'absolute', top: -40, right: -40,
    width: 160, height: 160, borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  heroOrb2: {
    position: 'absolute', bottom: -24, left: 20,
    width: 100, height: 100, borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  heroAvatar: {
    width: 72, height: 72, borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
  },
  heroAvatarText: { fontSize: FontSize.xl, fontWeight: '900', color: Colors.onPrimary },
  heroName: { fontSize: FontSize.xl, fontWeight: '900', color: Colors.onPrimary, letterSpacing: -0.3, marginBottom: 6 },
  heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  heroMemberId: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.blueLight, letterSpacing: 0.5 },

  // Card
  card: {
    backgroundColor: Colors.surfaceContainerLowest,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: `${Colors.outlineVariant}33`,
    marginLeft: 64,
    marginRight: -Spacing.md,
  },

  // Identity rows
  infoRow: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 14, gap: Spacing.sm + 4 },
  infoContent: { flex: 1 },
  infoFieldLabel: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.onSurfaceVariant, letterSpacing: 0.5, marginBottom: 3 },
  infoFieldValue: { fontSize: FontSize.sm, fontWeight: '500', color: Colors.onSurface, lineHeight: 20 },
  editBtn: { padding: 7, borderRadius: Radius.sm, backgroundColor: Colors.primaryBg, marginTop: 1 },

  // Action rows
  actionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: Spacing.sm + 4 },
  actionLabel: { flex: 1, fontSize: FontSize.sm, fontWeight: '600', color: Colors.onSurface },
  actionLabelDestructive: { color: Colors.error },
  actionValue: { fontSize: FontSize.sm, fontWeight: '500', color: Colors.onSurfaceVariant },

  // Sign out
  signOutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: Spacing.sm + 2, paddingVertical: Spacing.md,
    borderRadius: Radius.lg, backgroundColor: Colors.errorContainer, marginBottom: Spacing.lg + 4,
  },
  signOutText: { fontSize: FontSize.base, fontWeight: '700', color: Colors.error },
  version: { textAlign: 'center', fontSize: FontSize.xs, color: Colors.textMuted, marginBottom: Spacing.sm },
});
