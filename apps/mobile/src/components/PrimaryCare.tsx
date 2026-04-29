import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useProviders } from '@medicare/shared';
import LoadingSkeleton from './LoadingSkeleton';

interface Props {
  onNavigate?: (route: string) => void;
}

const PrimaryCare: React.FC<Props> = ({ onNavigate }) => {
  const { data: providers, isLoading } = useProviders({ category: 'Primary Care' });
  const pcp = providers && providers.length > 0 ? providers[0] : null;

  if (isLoading || !pcp) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Your Care Team</Text>
        <LoadingSkeleton style={{ width: '100%', height: 200, borderRadius: 32 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Your Care Team</Text>
      
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: pcp.photo }}
              style={styles.doctorImage}
            />
            <View style={styles.onlineBadge} />
          </View>
          
          <View style={styles.doctorDetails}>
            <View style={styles.pcpBadge}>
              <Text style={styles.pcpBadgeText}>Primary Care Provider</Text>
            </View>
            
            <Text style={styles.doctorName}>{pcp.name}</Text>
            
            <View style={styles.specialtyRow}>
              <MaterialCommunityIcons name="medical-bag" size={18} color="#003461" />
              <Text style={styles.specialty}>{pcp.specialty}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionRow}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            activeOpacity={0.8}
            onPress={() => onNavigate?.('provider-detail')}
          >
            <MaterialCommunityIcons name="eye-outline" size={18} color="#ffffff" />
            <Text style={styles.primaryButtonText}>View Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton} 
            activeOpacity={0.8}
            onPress={() => onNavigate?.('find-care')}
          >
            <MaterialCommunityIcons name="sync" size={18} color="#003461" />
            <Text style={styles.secondaryButtonText}>Change PCP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#003461',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#003461',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.12,
    shadowRadius: 50,
    elevation: 6,
    borderColor: 'rgba(25, 28, 29, 0.05)',
    borderWidth: 1,
  },
  cardTop: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  imageContainer: {
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  doctorImage: {
    width: 96,
    height: 96,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(25, 28, 29, 0.1)',
    backgroundColor: '#f3f4f5',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    backgroundColor: '#22c55e',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  doctorDetails: {
    flex: 1,
  },
  pcpBadge: {
    backgroundColor: 'rgba(0, 52, 97, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  pcpBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#003461',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#003461',
    lineHeight: 28,
  },
  specialtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  specialty: {
    fontSize: 14,
    fontWeight: '600',
    color: '#424750',
  },
  actionRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 16,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#003461',
    gap: 8,
    shadowColor: '#003461',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(0, 52, 97, 0.2)',
    backgroundColor: 'transparent',
    gap: 8,
  },
  secondaryButtonText: {
    color: '#003461',
    fontWeight: '700',
    fontSize: 14,
  },
});

export default PrimaryCare;
