import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useClaims } from '@medicare/shared';
import type { ClaimDetailScreenProps } from '../navigation/types';
import LoadingSkeleton from '../components/LoadingSkeleton';

const C = {
  primary: '#002B59',
  secondary: '#00658d',
  bgLight: '#f8f9fa',
  white: '#ffffff',
  onSurface: '#1a2a3a',
  onSurfaceVariant: '#4a6175',
  outline: '#e2e5ec',
};

export default function ClaimDetailScreen({ route, navigation }: ClaimDetailScreenProps) {
  const { claimId } = route.params;
  const insets = useSafeAreaInsets();
  const { data: claims, isLoading } = useClaims();
  
  const [openSection, setOpenSection] = useState({
    financial: false,
    medical: false,
    tracker: false,
  });

  const toggleSection = (section: keyof typeof openSection) => {
    setOpenSection(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const claim = claims?.find((c: any) => c.id === claimId);

  if (isLoading || !claim) {
    return (
      <View style={[styles.root, { paddingTop: insets.top }]}>
        <View style={{ padding: 16 }}><LoadingSkeleton style={{ height: 200 }} /></View>
      </View>
    );
  }

  const isProcessed = claim.status.toUpperCase() === 'PROCESSED' || claim.status.toUpperCase() === 'COMPLETED';

  let finalAmount = claim.memberResponsibility;
  if (claim.status.toUpperCase() === 'IN REVIEW') {
    finalAmount = claim.totalBilled - (claim.planDiscount || 0);
  } else if (claim.status.toUpperCase() === 'COMPLETED') {
    finalAmount = 0;
  }

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={C.primary} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.headerTitle}>Claim Details</Text>
          <Text style={styles.headerSubtitle}>CLAIM #{claim.id.toUpperCase()}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <MaterialCommunityIcons name="bell-outline" size={20} color={C.primary} />
          <View style={styles.avatarMini}>
            <MaterialCommunityIcons name="account" size={14} color={C.white} />
          </View>
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* 1. Top Card (Provider Info) */}
        <View style={styles.topCard}>
          <Text style={styles.providerName}>{claim.provider}</Text>
          <View style={styles.dateRow}>
            <MaterialCommunityIcons name="calendar-blank-outline" size={14} color={C.onSurfaceVariant} />
            <Text style={styles.dateText}>Date of Service: {claim.date}</Text>
          </View>
          <View style={[styles.statusPill, { backgroundColor: isProcessed ? '#dcfce7' : '#dbeafe' }]}>
            <View style={[styles.dot, { backgroundColor: isProcessed ? '#166534' : '#1e40af' }]} />
            <Text style={[styles.statusPillText, { color: isProcessed ? '#166534' : '#1e40af' }]}>
              {claim.status.toUpperCase()}
            </Text>
          </View>
        </View>

        {/* 2. Financial Breakdown */}
        <View style={styles.financeCard}>
          <TouchableOpacity 
            style={styles.financeHeaderRow} 
            onPress={() => toggleSection('financial')}
            activeOpacity={0.8}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <MaterialCommunityIcons name="receipt" size={18} color={C.white} />
              <Text style={styles.financeTitle}>Financial Breakdown</Text>
            </View>
            <MaterialCommunityIcons name={openSection.financial ? "chevron-up" : "chevron-down"} size={22} color={C.white} />
          </TouchableOpacity>

          {openSection.financial && (
            <View style={styles.financeContent}>
              <View style={styles.finRow}>
                <Text style={styles.finLabel}>Total Amount Billed</Text>
                <Text style={styles.finValue}>${claim.totalBilled.toFixed(2)}</Text>
              </View>
              <View style={styles.finRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={styles.finLabel}>Provider Discount</Text>
                  <MaterialCommunityIcons name="information-outline" size={12} color='rgba(255,255,255,0.7)' />
                </View>
                <Text style={styles.finValue}>-${claim.planDiscount.toFixed(2)}</Text>
              </View>
              <View style={[styles.finRow, { marginBottom: 20 }]}>
                <Text style={styles.finLabel}>Plan Paid</Text>
                <Text style={styles.finValue}>-${claim.insurancePaid.toFixed(2)}</Text>
              </View>

              <View style={styles.finDivider} />

              <Text style={styles.respLabel}>YOUR FINAL RESPONSIBILITY</Text>
              <Text style={styles.respValue}>${finalAmount.toFixed(2)}</Text>

              <View style={styles.deductibleBox}>
                <Text style={styles.deductibleText}>DEDUCTIBLE PROGRESS</Text>
                <Text style={styles.deductibleSub}>$2,800 of $3,000 Met</Text>
              </View>
            </View>
          )}
        </View>

        {/* 3. Medical Information */}
        <View style={styles.infoCard}>
          <TouchableOpacity 
            style={styles.infoCardHeader} 
            onPress={() => toggleSection('medical')}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <MaterialCommunityIcons name="medical-bag" size={18} color={C.onSurfaceVariant} />
              <Text style={styles.sectionTitle}>Medical Information</Text>
            </View>
            <MaterialCommunityIcons name={openSection.medical ? "chevron-up" : "chevron-down"} size={22} color={C.onSurfaceVariant} />
          </TouchableOpacity>

          {openSection.medical && (
            <View style={styles.infoContent}>
              <Text style={styles.infoOverline}>RENDERING PROVIDER</Text>
              <Text style={styles.docName}>{claim.doctor || 'Dr. Sarah L. Henderson, MD'}</Text>
              <Text style={styles.npiText}>NPI: <Text style={{ fontWeight: '400' }}>{claim.doctorNpi || '1234567890'}</Text></Text>
              <View style={styles.locRow}>
                <MaterialCommunityIcons name="map-marker-outline" size={14} color={C.onSurfaceVariant} />
                <Text style={styles.locText}>{claim.address || '5804 Medical Center Way, Suite 210, Atlanta, GA 30303'}</Text>
              </View>

              <View style={styles.divider} />

              <Text style={styles.infoOverline}>DIAGNOSIS CODES</Text>
              {claim.diagnoses ? claim.diagnoses.map((d: any, i: number) => (
                <View key={i} style={styles.codeRow}>
                  <Text style={styles.codeBold}>{d.code}</Text>
                  <Text style={styles.codeDesc}>{d.title}</Text>
                </View>
              )) : (
                <View style={styles.codeRow}>
                  <Text style={styles.codeBold}>H66.90</Text>
                  <Text style={styles.codeDesc}>Otitis media, unspecified</Text>
                </View>
              )}

              <View style={styles.divider} />

              <Text style={styles.infoOverline}>PROCEDURE CODES</Text>
              {claim.services ? claim.services.map((s: any, i: number) => (
                <View key={i} style={styles.codeRow}>
                  <Text style={styles.codeBold}>{s.code}</Text>
                  <Text style={styles.codeDesc}>{s.title}</Text>
                </View>
              )) : (
                <View style={styles.codeRow}>
                  <Text style={styles.codeBold}>99213</Text>
                  <Text style={styles.codeDesc}>Office visit, established patient (Level 3)</Text>
                </View>
              )}
            </View>
          )}
        </View>

        {/* 4. Claims Status Tracker */}
        <View style={styles.infoCard}>
          <TouchableOpacity 
            style={styles.infoCardHeader} 
            onPress={() => toggleSection('tracker')}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <MaterialCommunityIcons name="chart-timeline-variant" size={18} color={C.onSurfaceVariant} />
              <Text style={styles.sectionTitle}>Claim Status Tracker</Text>
            </View>
            <MaterialCommunityIcons name={openSection.tracker ? "chevron-up" : "chevron-down"} size={22} color={C.onSurfaceVariant} />
          </TouchableOpacity>

          {openSection.tracker && (
            <View style={styles.trackerContainer}>
              {/* Step 1 */}
              <View style={styles.trackerStep}>
                <View style={styles.trackerIconBoxActive}>
                  <MaterialCommunityIcons name="check" size={16} color={C.white} />
                </View>
                <View style={styles.trackerLine} />
                <View style={styles.trackerContent}>
                  <Text style={styles.stepTitle}>Claim Received</Text>
                  <Text style={styles.stepTime}>November 15, 2023 • 9:42 AM</Text>
                  <Text style={styles.stepDesc}>We've successfully received your claim for processing.</Text>
                </View>
              </View>

              {/* Step 2 */}
              <View style={styles.trackerStep}>
                <View style={styles.trackerIconBoxActive}>
                  <MaterialCommunityIcons name="check" size={16} color={C.white} />
                </View>
                <View style={styles.trackerLine} />
                <View style={styles.trackerContent}>
                  <Text style={styles.stepTitle}>In Review</Text>
                  <Text style={styles.stepTime}>November 17, 2023 • 2:15 PM</Text>
                  <Text style={styles.stepDesc}>Our medical experts reviewed the service details.</Text>
                </View>
              </View>

              {/* Step 3 */}
              <View style={styles.trackerStep}>
                <View style={styles.trackerIconBoxDark}>
                  <MaterialCommunityIcons name="star" size={16} color={C.white} />
                </View>
                <View style={styles.trackerLineActive} />
                <View style={styles.trackerContentActive}>
                  <Text style={styles.stepTitle}>Processed</Text>
                  <Text style={styles.stepTime}>November 20, 2023 • 10:00 AM</Text>
                  <View style={styles.activeMsgBox}>
                    <Text style={styles.activeMsgText}>
                      The claim was approved. Your Explanation of Benefits is now available.
                    </Text>
                  </View>
                </View>
              </View>

              {/* Step 4 */}
              <View style={styles.trackerStep}>
                <View style={styles.trackerIconBoxInactive}>
                  <MaterialCommunityIcons name="currency-usd" size={16} color={C.onSurfaceVariant} />
                </View>
                <View style={styles.trackerContent}>
                  <Text style={[styles.stepTitle, { color: C.onSurfaceVariant }]}>Paid</Text>
                  <Text style={styles.stepTimeUpper}>ESTIMATED PAYMENT: NOV 25, 2023</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Bottom Actions */}
        <TouchableOpacity style={styles.downloadBtn}>
          <MaterialCommunityIcons name="download" size={18} color={C.primary} />
          <Text style={styles.downloadBtnText}>Download EOB (PDF)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.messageBtn}>
          <MaterialCommunityIcons name="message-outline" size={18} color={C.white} />
          <Text style={styles.messageBtnText}>Message Care Guide</Text>
        </TouchableOpacity>

        <View style={styles.helpBox}>
          <MaterialCommunityIcons name="help-circle-outline" size={24} color="#572500" />
          <View style={{ flex: 1 }}>
            <Text style={styles.helpTitle}>Have questions about this bill?</Text>
            <Text style={styles.helpDesc}>Our dedicated senior advocates are available 24/7 to walk through these charges with you.</Text>
            <TouchableOpacity>
              <Text style={styles.helpLink}>Schedule a call for tomorrow <MaterialCommunityIcons name="arrow-right" size={12} /></Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#f4f6f8' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: C.white,
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: C.primary },
  headerSubtitle: { fontSize: 10, color: C.secondary, fontWeight: '700', letterSpacing: 1 },
  avatarMini: { width: 26, height: 26, borderRadius: 13, backgroundColor: C.secondary, alignItems: 'center', justifyContent: 'center' },
  
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },

  topCard: {
    backgroundColor: C.white,
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 6,
    borderLeftColor: C.primary,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  providerName: { fontSize: 22, fontWeight: '800', color: C.primary, marginBottom: 8, lineHeight: 28 },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  dateText: { fontSize: 13, color: C.onSurfaceVariant },
  statusPill: { alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  statusPillText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },

  // Info Cards (Accordion)
  infoCard: { backgroundColor: C.white, borderRadius: 16, marginBottom: 16, overflow: 'hidden' },
  infoCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  infoContent: { paddingHorizontal: 20, paddingBottom: 20 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#334155' },

  financeCard: { backgroundColor: C.primary, borderRadius: 24, marginBottom: 16, overflow: 'hidden' },
  financeHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24 },
  financeTitle: { fontSize: 15, fontWeight: '700', color: C.white },
  financeContent: { paddingHorizontal: 24, paddingBottom: 24 },

  trackerContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  trackerStep: { flexDirection: 'row', marginBottom: 20 },
  trackerIconBoxActive: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#00658d', alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  trackerIconBoxDark: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  trackerIconBoxInactive: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#e2e8f0', alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  trackerLine: { position: 'absolute', left: 13, top: 28, bottom: -20, width: 2, backgroundColor: '#e2e8f0', zIndex: 1 },
  trackerLineActive: { position: 'absolute', left: 13, top: 28, bottom: -20, width: 2, backgroundColor: '#e2e8f0', zIndex: 1 },
  trackerContent: { flex: 1, paddingLeft: 16, paddingTop: 2 },
  trackerContentActive: { flex: 1, paddingLeft: 16, paddingTop: 2 },
  stepTitle: { fontSize: 14, fontWeight: '700', color: C.onSurface },
  stepTime: { fontSize: 11, color: C.onSurfaceVariant, marginTop: 2, marginBottom: 6 },
  stepTimeUpper: { fontSize: 10, color: C.onSurfaceVariant, fontWeight: '600', letterSpacing: 0.5, marginTop: 2 },
  stepDesc: { fontSize: 12, color: C.onSurfaceVariant, lineHeight: 18 },
  activeMsgBox: { backgroundColor: C.white, borderRadius: 12, padding: 12, marginTop: 6, borderLeftWidth: 3, borderLeftColor: C.secondary, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 },
  activeMsgText: { fontSize: 12, color: C.onSurface, lineHeight: 18 },

  infoOverline: { fontSize: 10, fontWeight: '800', color: '#0ea5e9', letterSpacing: 1, marginBottom: 8 },
  docName: { fontSize: 16, fontWeight: '700', color: C.onSurface, marginBottom: 4 },
  npiText: { fontSize: 12, fontWeight: '700', color: C.onSurface, marginBottom: 8 },
  locRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  locText: { flex: 1, fontSize: 12, color: C.onSurfaceVariant, lineHeight: 18 },
  divider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 16 },
  codeRow: { marginBottom: 12 },
  codeBold: { fontSize: 14, fontWeight: '700', color: C.onSurface, marginBottom: 2 },
  codeDesc: { fontSize: 13, color: C.onSurfaceVariant },

  finRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  finLabel: { fontSize: 13, color: 'rgba(255,255,255,0.85)' },
  finValue: { fontSize: 14, fontWeight: '700', color: C.white },
  finDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 16 },
  respLabel: { fontSize: 10, fontWeight: '800', color: 'rgba(255,255,255,0.7)', letterSpacing: 1, marginBottom: 6 },
  respValue: { fontSize: 36, fontWeight: '800', color: C.white, marginBottom: 20 },
  deductibleBox: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 12 },
  deductibleText: { fontSize: 9, fontWeight: '800', color: C.white, letterSpacing: 0.5 },
  deductibleSub: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 },

  downloadBtn: { backgroundColor: C.white, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 12 },
  downloadBtnText: { fontSize: 14, fontWeight: '700', color: C.primary },
  messageBtn: { backgroundColor: '#00658d', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 16, borderRadius: 12, marginBottom: 24 },
  messageBtnText: { fontSize: 14, fontWeight: '700', color: C.white },

  helpBox: { backgroundColor: '#ffe4d6', borderRadius: 16, padding: 20, flexDirection: 'row', gap: 12 },
  helpTitle: { fontSize: 14, fontWeight: '800', color: '#572500', marginBottom: 6 },
  helpDesc: { fontSize: 12, color: '#572500', lineHeight: 18, marginBottom: 12 },
  helpLink: { fontSize: 12, fontWeight: '700', color: '#572500', textDecorationLine: 'underline' },
});
