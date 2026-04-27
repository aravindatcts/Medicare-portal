import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useHero, Colors } from '@medicare/shared';

const HeroBanner: React.FC = () => {
  const { data } = useHero();

  const handleCta = () => {
    if (data?.ctaPhone) Linking.openURL(data.ctaPhone).catch(() => {});
  };

  return (
    <LinearGradient
      colors={[Colors.navyDark, Colors.navyLight]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Text style={styles.tag}>{data?.tag}</Text>
      <Text style={styles.heading}>{data?.heading}</Text>
      <Text style={styles.subtext}>{data?.subtext}</Text>
      <TouchableOpacity style={styles.ctaButton} onPress={handleCta} activeOpacity={0.85}>
        <MaterialCommunityIcons name="phone" size={16} color={Colors.textPrimary} style={styles.ctaIcon} />
        <Text style={styles.ctaLabel}>{data?.ctaLabel}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  tag: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: Colors.textOnDarkMuted,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textOnDark,
    lineHeight: 34,
    marginBottom: 12,
  },
  subtext: {
    fontSize: 13,
    color: Colors.textOnDarkMuted,
    lineHeight: 20,
    marginBottom: 20,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  ctaIcon: {
    marginRight: 6,
  },
  ctaLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});

export default HeroBanner;
