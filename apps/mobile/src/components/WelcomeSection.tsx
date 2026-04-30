import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWelcomeSection } from '@medicare/shared';
import LoadingSkeleton from './LoadingSkeleton';
import { Colors } from '@medicare/shared';

const WelcomeSection: React.FC = () => {
  const { greeting, firstName, subtitle, isLoading } = useWelcomeSection();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingSkeleton style={{ width: '60%', height: 32, marginBottom: 8 }} />
        <LoadingSkeleton style={{ width: '80%', height: 16 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{greeting}, {firstName}.</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.onSurfaceVariant,
  },
});

export default WelcomeSection;
