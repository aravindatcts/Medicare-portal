import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, FontSize, Radius, Spacing } from '@medicare/shared';

const PROVIDERS = {
  google: { icon: 'google' as const, label: 'Continue with Google' },
} as const;

type Provider = keyof typeof PROVIDERS;

interface SocialButtonProps {
  provider: Provider;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function SocialButton({ provider, onPress, loading, disabled }: SocialButtonProps) {
  const { icon, label } = PROVIDERS[provider];

  return (
    <TouchableOpacity
      style={[styles.btn, (loading || disabled) && styles.btnDisabled]}
      onPress={onPress}
      disabled={loading || disabled}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {loading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <>
          <MaterialCommunityIcons name={icon} size={20} color={Colors.primary} style={styles.icon} />
          <Text style={styles.label}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Colors.surfaceContainerHighest,
    borderRadius: Radius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  btnDisabled: { opacity: 0.6 },
  icon: { marginRight: Spacing.sm + 2 },
  label: {
    fontSize: FontSize.md,
    fontWeight: '700',
    color: Colors.primary,
  },
});
