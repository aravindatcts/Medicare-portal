import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, FontSize, Radius, Spacing } from '@medicare/shared';

interface InlineErrorProps {
  message: string | null;
}

export default function InlineError({ message }: InlineErrorProps) {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="alert-circle-outline" size={16} color={Colors.error} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.errorContainer,
    padding: Spacing.sm + 4,
    borderRadius: Radius.sm,
  },
  text: { fontSize: FontSize.sm, color: Colors.error, flex: 1 },
});
