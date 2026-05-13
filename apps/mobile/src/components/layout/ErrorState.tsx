import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, FontSize, Radius, Spacing } from '@medicare/shared';

type MciName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface Props {
  message?: string;
  icon?: MciName;
  onRetry?: () => void;
}

export default function ErrorState({
  message = 'Something went wrong.',
  icon = 'alert-circle-outline',
  onRetry,
}: Props) {
  return (
    <View style={styles.container} testID="error-state">
      <MaterialCommunityIcons name={icon} size={48} color={Colors.outlineVariant} />
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity
          style={styles.btn}
          onPress={onRetry}
          accessibilityRole="button"
          accessibilityLabel="Retry"
        >
          <Text style={styles.btnText}>Try again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.sm + 4,
  },
  message: {
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  btn: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm + 4,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
  },
  btnText: { color: Colors.white, fontWeight: '700', fontSize: FontSize.sm },
});
