import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing } from '@medicare/shared';
import IconBox from '../atoms/IconBox';

type MciName = React.ComponentProps<typeof IconBox>['icon'];

interface SwitchRowProps {
  icon: MciName;
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
}

export default function SwitchRow({ icon, label, value, onValueChange, disabled }: SwitchRowProps) {
  return (
    <View style={[styles.row, disabled && styles.dimmed]}>
      <IconBox icon={icon} />
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: Colors.surfaceContainerHigh, true: Colors.primaryContainer }}
        thumbColor={value ? Colors.primary : Colors.outline}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 4,
    gap: Spacing.sm + 4,
  },
  dimmed: { opacity: 0.45 },
  label: {
    flex: 1,
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.onSurface,
  },
});
