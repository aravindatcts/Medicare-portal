import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Radius, Spacing, FontSize, Shadows } from '@medicare/shared';

type MciName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface PrimaryButtonProps {
  label: string;
  onPress?: () => void;
  icon?: MciName;
  variant?: 'solid' | 'outline' | 'ghost';
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  testID?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  icon,
  variant = 'solid',
  style,
  loading,
  disabled,
  accessibilityLabel,
  testID,
}) => {
  const iconColor = variant === 'solid' ? Colors.white : Colors.primary;

  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], (loading || disabled) && styles.disabled, style]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={loading || disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'solid' ? Colors.white : Colors.primary} />
      ) : (
        <>
          <Text style={[styles.label, variant !== 'solid' && styles.labelAlt]}>{label}</Text>
          {icon && <MaterialCommunityIcons name={icon} size={18} color={iconColor} />}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    gap: Spacing.sm,
  },
  solid: {
    backgroundColor: Colors.primary,
    ...Shadows.button,
  },
  outline: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  ghost: {
    backgroundColor: Colors.surfaceContainerLow,
  },
  disabled: { opacity: 0.6 },
  label: {
    fontSize: FontSize.base,
    fontWeight: '700',
    color: Colors.white,
  },
  labelAlt: {
    color: Colors.primary,
  },
});

export default PrimaryButton;
