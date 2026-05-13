import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@medicare/shared';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const MobileHraHero = () => {
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryContainer]}
      style={styles.hero}
    >
      <MaterialCommunityIcons name="clipboard-pulse-outline" size={64} color="rgba(255,255,255,0.2)" style={styles.heroIcon} />
      <Text style={styles.heroTitle}>Health Risk Assessment</Text>
      <Text style={styles.heroSubtitle}>Complete your annual check-in to personalize your benefits.</Text>
    </LinearGradient>
  );
};

export const MobileHraAssessmentForm = () => {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.question}>How would you rate your overall health today?</Text>
      <View style={styles.options}>
        {['Excellent', 'Good', 'Fair', 'Poor'].map((label) => (
          <TouchableOpacity key={label} style={styles.optionBtn}>
            <Text style={styles.optionText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitBtn}>
        <Text style={styles.submitText}>Submit Assessment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  hero: {
    padding: 32,
    borderRadius: 24,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  heroIcon: {
    position: 'absolute',
    right: -10,
    top: -10,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 22,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
  },
  question: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 20,
  },
  options: {
    gap: 12,
    marginBottom: 32,
  },
  optionBtn: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f1f5f9',
    backgroundColor: '#f8fafc',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
