import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMember } from '@medicare/shared';
import LoadingSkeleton from './LoadingSkeleton';

const WelcomeSection: React.FC = () => {
  const { data, isLoading } = useMember();

  if (isLoading || !data) {
    return (
      <View style={styles.container}>
        <LoadingSkeleton style={{ width: '60%', height: 32, marginBottom: 8 }} />
        <LoadingSkeleton style={{ width: '80%', height: 16 }} />
      </View>
    );
  }

  const firstName = data.name.split(' ')[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good morning, {firstName}</Text>
      <Text style={styles.subtitle}>Your health journey is looking great today.</Text>
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
    color: '#003461', // primary
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#424750', // on-surface-variant
  },
});

export default WelcomeSection;
