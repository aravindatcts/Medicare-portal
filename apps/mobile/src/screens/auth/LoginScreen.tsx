import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { Colors, FontSize, Radius, Spacing } from '@medicare/shared';
import { descopeService, type DescopeTokenData } from '../../services/descope.service';
import { useAuthStore } from '../../store/auth.store';
import { getRefreshToken, isBiometricsEnabled, saveRefreshToken } from '../../utils/secureStore';
import { FormInput, SocialButton, LabeledDivider, InlineError } from '../../components/atoms';
import PrimaryButton from '../../components/ui/PrimaryButton';
import type { LoginScreenProps } from '../../navigation/types';

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({ scheme: 'medicare-portal' });

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [loading, setLoading] = useState(false);
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setTokens, setUser, subscriberId } = useAuthStore();

  React.useEffect(() => {
    LocalAuthentication.hasHardwareAsync().then(setBiometricsAvailable);
  }, []);

  async function handleGoogleSSO() {
    setError(null);
    setLoading(true);
    try {
      const response = await descopeService.oauthStart('google', redirectUri);
      if (!response.ok || !response.data?.url) {
        throw new Error(response.error?.errorMessage || 'Failed to start Google SSO');
      }

      const result = await WebBrowser.openAuthSessionAsync(response.data.url, redirectUri);

      if (result.type === 'success' && result.url) {
        const url = new URL(result.url);
        const code = url.searchParams.get('code');
        if (code) {
          const exchangeResponse = await descopeService.oauthExchange(code);
          if (exchangeResponse.ok && exchangeResponse.data) {
            const { sessionJwt, refreshJwt, user } = exchangeResponse.data as unknown as DescopeTokenData;
            const existingSubId = user.customAttributes?.subscriberId || subscriberId;

            if (!existingSubId) {
              Alert.alert(
                'Account Incomplete',
                'Please complete your registration first to link your membership.',
                [{ text: 'Go to Register', onPress: () => navigation.navigate('Register') }],
              );
              return;
            }

            if (refreshJwt) await saveRefreshToken(refreshJwt);
            setTokens(sessionJwt, refreshJwt ?? '');
            setUser(user.loginIds[0], user.name ?? 'Member', existingSubId);
          }
        }
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  }

  async function handleBiometricAuth() {
    setError(null);
    try {
      const enabled = await isBiometricsEnabled();
      const token = await getRefreshToken();

      if (!enabled || !token) {
        Alert.alert(
          'Biometrics Not Setup',
          'Please sign in with your email and password first, then enable Biometric Login in Settings.',
          [{ text: 'OK' }],
        );
        return;
      }

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) {
        Alert.alert(
          'Not Enrolled',
          'Please set up Face ID or Touch ID in your device settings first.',
          [{ text: 'OK' }],
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Sign in to Member Portal',
        fallbackLabel: 'Use Password',
      });

      if (result.success) {
        setLoading(true);
        const response = await descopeService.refreshSession(token);
        if (response.ok && response.data) {
          const { sessionJwt, refreshJwt, user } = response.data as unknown as DescopeTokenData;
          setTokens(sessionJwt, refreshJwt ?? token);
          setUser(
            user?.loginIds?.[0] ?? 'Member',
            user?.name ?? 'Member',
            user?.customAttributes?.subscriberId,
          );
        }
      }
    } catch {
      setError('Biometric authentication failed.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSignIn() {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await descopeService.signIn(email, password);
      if (response.ok && response.data) {
        const { sessionJwt, refreshJwt, user } = response.data as unknown as DescopeTokenData;
        if (!sessionJwt) throw new Error('No session token received.');
        if (refreshJwt) await saveRefreshToken(refreshJwt);
        setTokens(sessionJwt, refreshJwt ?? '');
        setUser(user?.loginIds?.[0] ?? email, user?.name ?? 'Member', user?.customAttributes?.subscriberId);
      } else {
        throw new Error('Invalid response from authentication service');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.root} testID="login-screen">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <View style={styles.logoRow}>
            <MaterialCommunityIcons name="shield-check" size={48} color={Colors.primary} />
            <Text style={styles.brand}>AmeriHealth Caritas</Text>
          </View>

          <Text style={styles.heading}>Your health,{'\n'}your way.</Text>
          <Text style={styles.subtext}>
            Sign in to access your Medicare Advantage benefits, review claims,
            and manage your prescriptions.
          </Text>

          <View style={styles.form}>
            <SocialButton provider="google" onPress={handleGoogleSSO} loading={loading} />

            <LabeledDivider label="OR SIGN IN WITH EMAIL" />

            <FormInput
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="john.doe@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              testID="email-input"
            />

            <FormInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              testID="password-input"
            />

            <InlineError message={error} />

            <View style={styles.buttonRow}>
              <PrimaryButton
                label="Sign In"
                onPress={handleSignIn}
                loading={loading}
                disabled={loading}
                accessibilityLabel="Sign in to your account"
                testID="login-button"
                style={styles.btnFlex}
              />

              {biometricsAvailable && (
                <TouchableOpacity
                  style={styles.biometricBtn}
                  onPress={handleBiometricAuth}
                  disabled={loading}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="Sign in with biometrics"
                >
                  <MaterialCommunityIcons name="face-recognition" size={28} color={Colors.primary} />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={styles.registerLink}
              onPress={() => navigation.navigate('Register')}
              accessibilityRole="button"
              accessibilityLabel="Register a new account"
            >
              <Text style={styles.registerText}>
                New user? <Text style={styles.registerTextBold}>Register here</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.trustGrid}>
            {[
              { icon: 'lock-outline', label: 'HIPAA-compliant' },
              { icon: 'two-factor-authentication', label: 'Two-factor auth' },
            ].map(({ icon, label }) => (
              <View key={label} style={styles.trustItem}>
                <MaterialCommunityIcons name={icon as any} size={14} color={Colors.secondary} />
                <Text style={styles.trustLabel}>{label}</Text>
              </View>
            ))}
          </View>

        </ScrollView>
      </KeyboardAvoidingView>

      <Text style={styles.footer}>Need help? Call 1-800-555-1234</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  keyboardView: { flex: 1 },
  scroll: { paddingHorizontal: Spacing.lg + 4, paddingTop: Spacing.xxl, paddingBottom: Spacing.xl },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm + 4, marginBottom: Spacing.lg },
  brand: { fontSize: FontSize.lg, fontWeight: '900', color: Colors.primary, letterSpacing: -0.3 },
  heading: { fontSize: FontSize.display, fontWeight: '900', color: Colors.primary, lineHeight: 40, marginBottom: Spacing.sm + 4 },
  subtext: { fontSize: FontSize.base, color: Colors.onSurfaceVariant, lineHeight: 22, marginBottom: Spacing.xl },
  form: { gap: Spacing.lg + 4 },
  buttonRow: { flexDirection: 'row', gap: Spacing.sm + 4, marginTop: Spacing.sm },
  btnFlex: { flex: 1 },
  biometricBtn: {
    width: 56,
    height: 56,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
  },
  registerLink: { alignItems: 'center', marginTop: Spacing.sm },
  registerText: { fontSize: FontSize.sm, color: Colors.onSurfaceVariant },
  registerTextBold: { color: Colors.primary, fontWeight: '700' },
  trustGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm + 2, marginTop: Spacing.xl + Spacing.md },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm - 2,
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: Spacing.sm + 4,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.surfaceContainerHighest,
  },
  trustLabel: { fontSize: FontSize.xs, fontWeight: '600', color: Colors.onSurfaceVariant },
  footer: { textAlign: 'center', color: Colors.outline, fontSize: FontSize.sm, paddingBottom: Spacing.lg },
});
