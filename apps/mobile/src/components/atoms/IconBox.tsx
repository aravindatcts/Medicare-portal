import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Radius } from '@medicare/shared';

type MciName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface IconBoxProps {
  icon: MciName;
  size?: number;
  destructive?: boolean;
}

export default function IconBox({ icon, size = 18, destructive = false }: IconBoxProps) {
  return (
    <View style={[styles.box, destructive && styles.boxDestructive]}>
      <MaterialCommunityIcons
        name={icon}
        size={size}
        color={destructive ? Colors.error : Colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxDestructive: { backgroundColor: Colors.errorContainer },
});
