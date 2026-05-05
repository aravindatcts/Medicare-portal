import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { authService } from '../../services/auth.service';
import type { LoginScreenProps } from '../../navigation/types';

export default function LoginScreen(_props: LoginScreenProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    setLoading(true);
    setError(null);
    try {
      await authService.initiateLogin();
      // RootNavigator will switch to App stack automatically via auth store
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Sign in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.root} testID="login-screen">
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoRow}>
          <MaterialCommunityIcons name="shield-check" size={48} color="#003461" />
          <Text style={styles.brand}>AmeriHealth Caritas</Text>
        </View>

        <Text style={styles.heading}>Your health,{'\n'}your way.</Text>
        <Text style={styles.subtext}>
          Sign in to access your Medicare Advantage benefits, review claims,
          find in-network care, and manage your prescriptions.
        </Text>

        {/* Trust badges */}
        <View style={styles.trustGrid}>
          {[
            { icon: 'lock-outline', label: 'HIPAA-compliant' },
            { icon: 'two-factor-authentication', label: 'Two-factor auth' },
            { icon: 'timer-outline', label: 'Session timeout' },
            { icon: 'email-fast-outline', label: 'Magic Link login' },
          ].map(({ icon, label }) => (
            <View key={label} style={styles.trustItem}>
              <MaterialCommunityIcons name={icon as any} size={16} color="#00658d" />
              <Text style={styles.trustLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        {error && (
          <View style={styles.errorBox}>
            <MaterialCommunityIcons name="alert-circle-outline" size={16} color="#ba1a1a" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={handleSignIn}
          disabled={loading}
          activeOpacity={0.85}
          accessibilityRole="button"
          accessibilityLabel="Sign in to your account"
          testID="login-button"
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.btnText}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Need help? Call 1-800-555-1234</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f8f9fa' },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 48, gap: 20 },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  brand: { fontSize: 18, fontWeight: '900', color: '#003461', letterSpacing: -0.3 },
  heading: { fontSize: 34, fontWeight: '900', color: '#003461', lineHeight: 40 },
  subtext: { fontSize: 15, color: '#424750', lineHeight: 22 },
  trustGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e1e3e4',
  },
  trustLabel: { fontSize: 12, fontWeight: '600', color: '#424750' },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffdad6',
    padding: 12,
    borderRadius: 8,
  },
  errorText: { fontSize: 13, color: '#ba1a1a', flex: 1 },
  btn: {
    backgroundColor: '#003461',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  footer: { textAlign: 'center', color: '#727781', fontSize: 13, paddingBottom: 24 },
});
