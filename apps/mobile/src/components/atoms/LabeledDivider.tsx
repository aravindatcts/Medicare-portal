import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing } from '@medicare/shared';

interface LabeledDividerProps {
  label: string;
}

export default function LabeledDivider({ label }: LabeledDividerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.sm,
  },
  line: { flex: 1, height: 1, backgroundColor: Colors.surfaceContainerHighest },
  text: {
    marginHorizontal: Spacing.sm + 2,
    fontSize: FontSize.xs - 1,
    fontWeight: '800',
    color: Colors.outline,
    letterSpacing: 1.5,
  },
});
