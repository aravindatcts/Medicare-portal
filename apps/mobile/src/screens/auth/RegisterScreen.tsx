import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { Colors, FontSize, Spacing } from '@medicare/shared';
import { descopeService, type DescopeTokenData } from '../../services/descope.service';
import { useAuthStore } from '../../store/auth.store';
import { saveRefreshToken } from '../../utils/secureStore';
import { FormInput, SocialButton, LabeledDivider } from '../../components/atoms';
import PrimaryButton from '../../components/ui/PrimaryButton';
import type { RegisterScreenProps } from '../../navigation/types';

WebBrowser.maybeCompleteAuthSession();

const redirectUri = AuthSession.makeRedirectUri({ scheme: 'medicare-portal' });

interface OAuthUserData {
  sessionJwt: string;
  refreshJwt?: string;
  user: DescopeTokenData['user'];
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const { setTokens, setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'sso' | 'attributes'>('sso');
  const [oauthData, setOauthData] = useState<OAuthUserData | null>(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    subscriberId: '',
    ssn: '',
    dob: '',
    email: '',
    password: '',
  });

  const updateForm = (key: keyof typeof form, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleGoogleSSO = async () => {
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
            setOauthData({ sessionJwt, refreshJwt, user });

            if (user.customAttributes?.subscriberId) {
              if (refreshJwt) await saveRefreshToken(refreshJwt);
              setTokens(sessionJwt, refreshJwt ?? '');
              setUser(user.loginIds[0], user.name ?? 'Member', user.customAttributes.subscriberId);
            } else {
              setStep('attributes');
            }
          }
        }
      }
    } catch (error: unknown) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'An error occurred during Google SSO.');
    } finally {
      setLoading(false);
    }
  };

  const handleManualRegister = async () => {
    if (!form.email || !form.password || !form.subscriberId) {
      Alert.alert('Required Fields', 'Please fill in Email, Password, and Subscriber ID.');
      return;
    }
    setLoading(true);
    try {
      await descopeService.signUp({
        loginId: form.email,
        password: form.password,
        firstName: form.firstName,
        lastName: form.lastName,
        subscriberId: form.subscriberId,
        ssn: form.ssn,
        dob: form.dob,
      });
      Alert.alert(
        'Registration Successful',
        'Your account has been created. You can now sign in.',
        [{ text: 'Go to Login', onPress: () => navigation.navigate('Login') }],
      );
    } catch (error: unknown) {
      Alert.alert('Registration Failed', error instanceof Error ? error.message : 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAttributes = async () => {
    if (!form.subscriberId || !form.ssn) {
      Alert.alert('Required Fields', 'Please provide both Subscriber ID and SSN.');
      return;
    }
    if (!oauthData) {
      Alert.alert('Error', 'Session expired. Please try signing in with Google again.');
      setStep('sso');
      return;
    }
    setLoading(true);
    try {
      await descopeService.updateUser(oauthData.user.loginIds[0], {
        subscriberId: form.subscriberId,
        ssn: form.ssn,
      });
      if (oauthData.refreshJwt) await saveRefreshToken(oauthData.refreshJwt);
      setTokens(oauthData.sessionJwt, oauthData.refreshJwt ?? '');
      setUser(oauthData.user.loginIds[0], oauthData.user.name ?? 'Member', form.subscriberId);
      Alert.alert('Registration Complete', 'Welcome to AmeriHealth Caritas!');
    } catch (error: unknown) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Failed to save your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <MaterialCommunityIcons name="arrow-left" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <Text style={styles.title}>
              {step === 'sso' ? 'Create Account' : 'Verify Membership'}
            </Text>
            <Text style={styles.subtitle}>
              {step === 'sso'
                ? 'Register to manage your benefits and access digital tools.'
                : 'Please provide your member details to link your plan.'}
            </Text>
          </View>

          {step === 'sso' ? (
            <View style={styles.form}>
              <SocialButton provider="google" onPress={handleGoogleSSO} loading={loading} />

              <LabeledDivider label="OR REGISTER MANUALLY" />

              <View style={styles.row}>
                <View style={styles.flex}>
                  <FormInput
                    label="First Name"
                    value={form.firstName}
                    onChangeText={v => updateForm('firstName', v)}
                    placeholder="John"
                  />
                </View>
                <View style={styles.flex}>
                  <FormInput
                    label="Last Name"
                    value={form.lastName}
                    onChangeText={v => updateForm('lastName', v)}
                    placeholder="Doe"
                  />
                </View>
              </View>

              <FormInput
                label="Subscriber ID"
                value={form.subscriberId}
                onChangeText={v => updateForm('subscriberId', v)}
                placeholder="123456789"
                keyboardType="numeric"
              />

              <View style={styles.row}>
                <View style={styles.flex}>
                  <FormInput
                    label="SSN (Last 4)"
                    value={form.ssn}
                    onChangeText={v => updateForm('ssn', v)}
                    placeholder="1234"
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>
                <View style={styles.flex}>
                  <FormInput
                    label="Date of Birth"
                    value={form.dob}
                    onChangeText={v => updateForm('dob', v)}
                    placeholder="MM/DD/YYYY"
                  />
                </View>
              </View>

              <FormInput
                label="Email Address"
                value={form.email}
                onChangeText={v => updateForm('email', v)}
                placeholder="john.doe@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <FormInput
                label="Password"
                value={form.password}
                onChangeText={v => updateForm('password', v)}
                placeholder="••••••••"
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />

              <PrimaryButton
                label="Register Account"
                onPress={handleManualRegister}
                loading={loading}
                disabled={loading}
                accessibilityLabel="Register account"
                style={styles.submitBtn}
              />

              <TouchableOpacity
                style={styles.loginLink}
                onPress={() => navigation.navigate('Login')}
                accessibilityRole="button"
                accessibilityLabel="Go to sign in"
              >
                <Text style={styles.loginLinkText}>
                  Already have an account? <Text style={styles.loginLinkBold}>Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <FormInput
                label="Subscriber ID"
                value={form.subscriberId}
                onChangeText={v => updateForm('subscriberId', v)}
                placeholder="123456789"
                keyboardType="numeric"
              />
              <FormInput
                label="SSN (Last 4)"
                value={form.ssn}
                onChangeText={v => updateForm('ssn', v)}
                placeholder="1234"
                keyboardType="numeric"
                maxLength={4}
              />
              <PrimaryButton
                label="Complete Registration"
                onPress={handleSaveAttributes}
                loading={loading}
                disabled={loading}
                accessibilityLabel="Complete registration"
                style={styles.submitBtn}
              />
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  keyboardView: { flex: 1 },
  flex: { flex: 1 },
  scroll: { padding: Spacing.lg, paddingBottom: Spacing.xl + Spacing.md },
  header: { marginBottom: Spacing.xl },
  backBtn: { marginBottom: Spacing.md, width: 40, height: 40, justifyContent: 'center' },
  title: { fontSize: FontSize.xxl, fontWeight: '800', color: Colors.primary, marginBottom: Spacing.sm },
  subtitle: { fontSize: FontSize.md, color: Colors.onSurfaceVariant, lineHeight: 22 },
  form: { gap: Spacing.md },
  row: { flexDirection: 'row', gap: Spacing.sm + 4 },
  submitBtn: { marginTop: Spacing.sm + 4 },
  loginLink: { marginTop: Spacing.md, alignItems: 'center' },
  loginLinkText: { fontSize: FontSize.sm, color: Colors.onSurfaceVariant },
  loginLinkBold: { color: Colors.primary, fontWeight: '700' },
});
