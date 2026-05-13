import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '@medicare/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const MobileBenefitsWellness = ({ context }: any) => {
  const benefits = context?.benefits;
  const wellness = benefits?.wellness;
  if (!wellness) return null;

  return (
    <View style={{ marginTop: 8 }}>
      <Text style={styles.sectionTitle}>Wellness Rewards</Text>
      <View style={styles.wellnessCard}>
        <Image source={{ uri: wellness.imageUrl }} style={styles.wellnessImage} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(0,52,97,0.85)']}
          style={styles.wellnessOverlay}
        >
          <Text style={styles.wellnessTitle}>{wellness.title}</Text>
          <Text style={styles.wellnessBody}>{wellness.body}</Text>
          <TouchableOpacity style={styles.wellnessButton}>
            <Text style={styles.wellnessButtonText}>Get Started</Text>
            <MaterialCommunityIcons name="arrow-right" size={16} color={Colors.white} />
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.onSurface,
    marginBottom: 12,
    marginTop: 4,
  },
  wellnessCard: {
    height: 220,
    borderRadius: 20,
    borderTopRightRadius: 48,
    overflow: 'hidden',
    marginBottom: 8,
  },
  wellnessImage: { ...StyleSheet.absoluteFillObject },
  wellnessOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', padding: 20 },
  wellnessTitle: { fontSize: 18, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  wellnessBody: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginBottom: 14, lineHeight: 18 },
  wellnessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  wellnessButtonText: { fontSize: 13, fontWeight: '600', color: Colors.white },
});
