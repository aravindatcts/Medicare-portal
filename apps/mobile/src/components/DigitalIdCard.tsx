import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useMember, usePlan } from '@medicare/shared';
import LoadingSkeleton from './LoadingSkeleton';

const DigitalIdCard: React.FC = () => {
  const { data: memberData, isLoading: memberLoading } = useMember();
  const { data: planData, isLoading: planLoading } = usePlan();
  
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  if (memberLoading || planLoading || !memberData || !planData) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Digital ID Card</Text>
        <LoadingSkeleton style={{ width: '100%', height: 200, borderRadius: 32 }} />
      </View>
    );
  }

  const flipCard = () => {
    Animated.spring(flipAnimation, {
      toValue: isFlipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Digital ID Card</Text>
      
      <View style={styles.cardWrapper}>
        <Animated.View style={[styles.cardSide, frontAnimatedStyle]} pointerEvents={isFlipped ? 'none' : 'auto'}>
          <LinearGradient
            colors={['#003461', '#004b87']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.decorativeCircle} />
            
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.healthPlanLabel}>HEALTH PLAN ID</Text>
                <Text style={styles.memberName}>{memberData.name}</Text>
              </View>
              <View style={styles.qrGroup}>
                <TouchableOpacity style={styles.viewBackButton} activeOpacity={0.8} onPress={flipCard}>
                  <MaterialCommunityIcons name="camera-flip-outline" size={14} color="#ffffff" />
                  <Text style={styles.viewBackText}>VIEW BACK</Text>
                </TouchableOpacity>
                <View style={styles.qrContainer}>
                  <MaterialCommunityIcons name="qrcode" size={24} color="#ffffff" />
                </View>
              </View>
            </View>

            <View style={styles.footerRow}>
              <View>
                <Text style={styles.binPcnLabel}>BIN: 004336 | PCN: {memberData.pcn}</Text>
                <Text style={styles.planSubname}>{memberData.insurerName}</Text>
              </View>
              <MaterialCommunityIcons name="shield-cross" size={24} color="rgba(255,255,255,0.4)" />
            </View>
          </LinearGradient>
        </Animated.View>

        <Animated.View style={[styles.cardSide, styles.cardBack, backAnimatedStyle]} pointerEvents={isFlipped ? 'auto' : 'none'}>
          <LinearGradient
            colors={['#1a2f4a', '#003461']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.magneticStrip} />

            <View style={styles.backContent}>
              <View style={styles.signatureStrip}>
                <Text style={styles.signatureText}>{memberData.name}</Text>
                <View style={styles.authBadge}>
                  <Text style={styles.authBadgeText}>AUTHORIZED</Text>
                </View>
              </View>

              <View style={styles.copayRow}>
                {planData.copays.slice(0, 4).map(c => (
                  <View key={c.type} style={styles.copayPill}>
                    <Text style={styles.copayType}>{c.type}</Text>
                    <Text style={styles.copayAmount}>{c.amount}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.barcodeContainer}>
                <View style={styles.barcodeLines}>
                  {[3,1,2,1,3,2,1,4,1,2,3,1].map((w, i) => (
                    <View key={i} style={{ width: w * 3, height: 30, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 1 }} />
                  ))}
                </View>
                <Text style={styles.barcodeText}>{memberData.memberId}</Text>
              </View>

              <View style={styles.backFooterRow}>
                <View style={styles.memberServicesBox}>
                  <MaterialCommunityIcons name="phone" size={14} color="rgba(255,255,255,0.7)" />
                  <View>
                    <Text style={styles.memberServicesLabel}>Member Services</Text>
                    <Text style={styles.memberServicesValue}>1-800-555-1234</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.viewFrontButton} activeOpacity={0.8} onPress={flipCard}>
                  <MaterialCommunityIcons name="camera-flip-outline" size={14} color="#ffffff" />
                  <Text style={styles.viewBackText}>VIEW FRONT</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.walletButton} 
          activeOpacity={0.8}
          onPress={() => Alert.alert('Apple Wallet', 'Successfully added to Apple Wallet!')}
        >
          <MaterialCommunityIcons name="apple" size={20} color="#003461" />
          <Text style={styles.walletButtonText}>Add to Apple Wallet</Text>
        </TouchableOpacity>
        
        <View style={styles.secondaryActionsRow}>
          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
            <MaterialCommunityIcons name="email-outline" size={20} color="#003461" />
            <Text style={styles.secondaryButtonText}>Email ID Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}>
            <MaterialCommunityIcons name="mailbox-open-up-outline" size={20} color="#003461" />
            <Text style={styles.secondaryButtonText}>Order Physical</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#003461',
    marginBottom: 16,
    marginLeft: 4,
  },
  cardWrapper: {
    marginBottom: 16,
    position: 'relative',
    height: 280,
  },
  cardSide: {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  card: {
    borderRadius: 32,
    padding: 24,
    height: '100%',
    justifyContent: 'space-between',
    overflow: 'hidden',
    shadowColor: '#003461',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
  },
  decorativeCircle: {
    position: 'absolute',
    top: -192,
    left: -192,
    width: 384,
    height: 384,
    borderRadius: 192,
    borderWidth: 40,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  healthPlanLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  memberName: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '900',
  },
  qrGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  viewBackText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  qrContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  binPcnLabel: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  planSubname: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '600',
  },
  backContent: {
    flex: 1,
    marginTop: 8,
  },
  magneticStrip: {
    backgroundColor: '#07111c',
    height: 32,
    marginHorizontal: -24,
    marginTop: -24,
    marginBottom: 16,
  },
  signatureStrip: {
    backgroundColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 12,
  },
  signatureText: {
    color: '#111',
    fontStyle: 'italic',
    fontSize: 14,
  },
  authBadge: {
    backgroundColor: '#003461',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  authBadgeText: {
    color: '#ffffff',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },
  copayRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  copayPill: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(65,190,253,0.45)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  copayType: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    fontWeight: '700',
    marginBottom: 2,
  },
  copayAmount: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '800',
  },
  barcodeContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  barcodeLines: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 4,
  },
  barcodeText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 8,
    letterSpacing: 2,
  },
  backFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  memberServicesBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  memberServicesLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 8,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
  memberServicesValue: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  viewFrontButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  actionsContainer: {
    gap: 12,
  },
  walletButton: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 999,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    shadowColor: '#003461',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    gap: 8,
  },
  walletButtonText: {
    color: '#003461',
    fontWeight: '700',
    fontSize: 15,
  },
  secondaryActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 24,
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: 1,
    shadowColor: '#003461',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    gap: 8,
  },
  secondaryButtonText: {
    color: '#003461',
    fontWeight: '700',
    fontSize: 12,
  },
});

export default DigitalIdCard;
