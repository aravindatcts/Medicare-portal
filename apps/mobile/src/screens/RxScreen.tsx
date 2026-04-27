import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Design tokens from the Rx spec
const C = {
  primary: '#003461',
  primaryContainer: '#004b87',
  secondary: '#00658d',
  secondaryContainer: '#41befd',
  onSecondaryContainer: '#004b69',
  tertiary: '#572500',
  tertiaryContainer: '#793701',
  surfaceLow: '#f3f4f5',
  surfaceLowest: '#ffffff',
  onSurfaceVariant: '#424750',
  outlineVariant: '#c2c6d1',
  white: '#ffffff',
};

// ─── Pharmacy Card ───────────────────────────────────────────────────────────
function PharmacyCard() {
  return (
    <View style={styles.pharmacyCard}>
      <View>
        <View style={styles.pharmacyTagRow}>
          <MaterialCommunityIcons name="store-outline" size={16} color={C.secondaryContainer} />
          <Text style={styles.pharmacyTag}>PRIMARY PHARMACY</Text>
        </View>
        <Text style={styles.pharmacyName}>Aura Community Care</Text>
        <Text style={styles.pharmacyAddress}>
          1282 Wellness Way, Suite 400{'\n'}
          Sanctuary Heights, CA 90210
        </Text>
      </View>

      <View style={styles.pharmacyFooter}>
        <View style={styles.pharmacyPhone}>
          <MaterialCommunityIcons name="phone-outline" size={18} color={C.secondaryContainer} />
          <Text style={styles.pharmacyPhoneText}>(555) 012-3456</Text>
        </View>
        <TouchableOpacity style={styles.changePharmacyBtn} activeOpacity={0.8}>
          <Text style={styles.changePharmacyText}>Change Pharmacy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Daily Schedule ───────────────────────────────────────────────────────────
function DailySchedule() {
  return (
    <View style={styles.scheduleSection}>
      <View style={styles.scheduleHeader}>
        <MaterialCommunityIcons name="calendar-text-outline" size={22} color={C.primary} />
        <Text style={styles.scheduleSectionTitle}>Daily Schedule</Text>
      </View>

      {/* Morning */}
      <View style={[styles.doseCard, { borderLeftColor: C.secondary }]}>
        <View style={[styles.doseIconWrap, { backgroundColor: `${C.secondary}20` }]}>
          <MaterialCommunityIcons name="weather-sunny" size={28} color={C.secondary} />
        </View>
        <View style={styles.doseInfo}>
          <Text style={styles.doseName}>Morning</Text>
          <Text style={styles.doseSub}>Take with breakfast</Text>
        </View>
        <Text style={styles.dosePill}>1 Pill</Text>
      </View>

      {/* Evening */}
      <View style={[styles.doseCard, { borderLeftColor: C.primary }]}>
        <View style={[styles.doseIconWrap, { backgroundColor: `${C.primary}20` }]}>
          <MaterialCommunityIcons name="weather-night" size={28} color={C.primary} />
        </View>
        <View style={styles.doseInfo}>
          <Text style={styles.doseName}>Evening</Text>
          <Text style={styles.doseSub}>Take before bedtime</Text>
        </View>
        <Text style={styles.dosePill}>2 Pills</Text>
      </View>
    </View>
  );
}

// ─── Prescription Card ────────────────────────────────────────────────────────
type PrescriptionCardProps = {
  name: string;
  dosage: string;
  refillDate: string;
  refillsLeft: string;
};

function PrescriptionCard({ name, dosage, refillDate, refillsLeft }: PrescriptionCardProps) {
  return (
    <View style={styles.rxCard}>
      <View style={styles.rxCardTop}>
        <View>
          <Text style={styles.rxName}>{name}</Text>
          <Text style={styles.rxDosage}>{dosage}</Text>
        </View>
        <View style={styles.rxBadge}>
          <Text style={styles.rxBadgeText}>DAILY</Text>
        </View>
      </View>

      <View style={styles.rxMeta}>
        <View>
          <Text style={styles.rxMetaLabel}>NEXT REFILL DATE</Text>
          <Text style={styles.rxMetaValue}>{refillDate}</Text>
        </View>
        <View>
          <Text style={styles.rxMetaLabel}>REFILLS LEFT</Text>
          <Text style={styles.rxMetaValue}>{refillsLeft}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.refillBtn} activeOpacity={0.85}>
        <Text style={styles.refillBtnText}>Refill Now</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Warning Card (Metformin) ─────────────────────────────────────────────────
function NoRefillCard() {
  return (
    <View style={styles.noRefillCard}>
      <View style={styles.noRefillTop}>
        <View style={[styles.doseIconWrap, { backgroundColor: `${C.tertiary}15` }]}>
          <MaterialCommunityIcons name="alert-outline" size={28} color={C.tertiary} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.rxName}>Metformin</Text>
          <Text style={styles.rxDosage}>500mg ER Tablet</Text>
          <View style={styles.noRefillWarning}>
            <MaterialCommunityIcons name="alert-circle-outline" size={14} color={C.tertiary} />
            <Text style={styles.noRefillWarningText}>No Refills Remaining</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.requestBtn} activeOpacity={0.85}>
        <Text style={styles.requestBtnText}>Request New Prescription</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Pharmacist Chat Card ─────────────────────────────────────────────────────
function PharmacistCard() {
  return (
    <View style={styles.pharmacistCard}>
      <View style={styles.pharmacistIcon}>
        <MaterialCommunityIcons name="chat-question-outline" size={30} color={C.white} />
      </View>
      <Text style={styles.pharmacistTitle}>Have a question?</Text>
      <Text style={styles.pharmacistSub}>
        Our pharmacists are available 24/7 for a secure video consultation.
      </Text>
      <TouchableOpacity style={styles.chatBtn} activeOpacity={0.85}>
        <Text style={styles.chatBtnText}>Chat with Pharmacist</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
const RxScreen: React.FC = () => {
  return (
    <ScrollView
      style={styles.scroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.pageTitle}>Rx Management</Text>
          <Text style={styles.pageSubtitle}>Your sanctuary for medication clarity.</Text>
        </View>
        <TouchableOpacity style={styles.historyBtn} activeOpacity={0.8}>
          <MaterialCommunityIcons name="history" size={18} color={C.onSecondaryContainer} />
          <Text style={styles.historyBtnText}>History</Text>
        </TouchableOpacity>
      </View>

      <PharmacyCard />
      <DailySchedule />

      {/* Active Prescriptions */}
      <View style={styles.prescriptionsHeader}>
        <Text style={styles.prescriptionsTitle}>Active Prescriptions</Text>
        <Text style={styles.prescriptionsCount}>3 active</Text>
      </View>

      <PrescriptionCard
        name="Atorvastatin"
        dosage="20mg Oral Tablet"
        refillDate="Oct 24, 2023"
        refillsLeft="02"
      />
      <PrescriptionCard
        name="Lisinopril"
        dosage="10mg Oral Tablet"
        refillDate="Nov 12, 2023"
        refillsLeft="04"
      />
      <NoRefillCard />
      <PharmacistCard />

      <View style={{ height: 16 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1 },
  scrollContent: { paddingTop: 16, paddingBottom: 8 },

  // ── Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: C.primary,
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 13,
    color: C.onSurfaceVariant,
    marginTop: 2,
  },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: `${C.secondaryContainer}30`,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  historyBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: C.onSecondaryContainer,
  },

  // ── Pharmacy card
  pharmacyCard: {
    backgroundColor: C.primary,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    borderTopRightRadius: 48,
    padding: 24,
    justifyContent: 'space-between',
    gap: 24,
  },
  pharmacyTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  pharmacyTag: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: C.secondaryContainer,
  },
  pharmacyName: {
    fontSize: 24,
    fontWeight: '800',
    color: C.white,
    marginBottom: 6,
  },
  pharmacyAddress: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 20,
  },
  pharmacyFooter: { gap: 14 },
  pharmacyPhone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pharmacyPhoneText: {
    fontSize: 14,
    color: C.white,
    fontWeight: '500',
  },
  changePharmacyBtn: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  changePharmacyText: {
    color: C.white,
    fontWeight: '700',
    fontSize: 15,
  },

  // ── Daily Schedule
  scheduleSection: {
    marginHorizontal: 16,
    marginBottom: 24,
    gap: 12,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  scheduleSectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: C.primary,
  },
  doseCard: {
    backgroundColor: C.surfaceLowest,
    borderRadius: 14,
    borderLeftWidth: 6,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  doseIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  doseInfo: { flex: 1 },
  doseName: {
    fontSize: 17,
    fontWeight: '700',
    color: C.primary,
  },
  doseSub: {
    fontSize: 13,
    color: C.onSurfaceVariant,
    marginTop: 2,
  },
  dosePill: {
    fontSize: 18,
    fontWeight: '800',
    color: C.primary,
  },

  // ── Prescriptions header
  prescriptionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginHorizontal: 16,
    marginBottom: 14,
  },
  prescriptionsTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: C.primary,
  },
  prescriptionsCount: {
    fontSize: 13,
    fontWeight: '600',
    color: C.onSurfaceVariant,
  },

  // ── Rx card
  rxCard: {
    backgroundColor: C.surfaceLow,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  rxCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  rxName: {
    fontSize: 20,
    fontWeight: '800',
    color: C.primary,
  },
  rxDosage: {
    fontSize: 13,
    fontWeight: '600',
    color: C.onSurfaceVariant,
    marginTop: 2,
  },
  rxBadge: {
    backgroundColor: `${C.secondary}18`,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 99,
  },
  rxBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: C.secondary,
    letterSpacing: 0.5,
  },
  rxMeta: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 18,
  },
  rxMetaLabel: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    color: C.onSurfaceVariant,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  rxMetaValue: {
    fontSize: 16,
    fontWeight: '700',
    color: C.primary,
  },
  refillBtn: {
    backgroundColor: C.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: C.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  refillBtnText: {
    color: C.white,
    fontWeight: '700',
    fontSize: 16,
  },

  // ── No Refill card
  noRefillCard: {
    backgroundColor: C.surfaceLowest,
    borderRadius: 16,
    borderBottomLeftRadius: 48,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: C.outlineVariant,
    gap: 16,
  },
  noRefillTop: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'flex-start',
  },
  noRefillWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  noRefillWarningText: {
    fontSize: 13,
    fontWeight: '700',
    color: C.tertiary,
  },
  requestBtn: {
    borderWidth: 2,
    borderColor: C.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  requestBtnText: {
    color: C.primary,
    fontWeight: '800',
    fontSize: 15,
  },

  // ── Pharmacist card
  pharmacistCard: {
    backgroundColor: C.secondary,
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 14,
    alignItems: 'center',
    gap: 10,
  },
  pharmacistIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  pharmacistTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.white,
  },
  pharmacistSub: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 20,
  },
  chatBtn: {
    backgroundColor: C.white,
    borderRadius: 99,
    paddingHorizontal: 28,
    paddingVertical: 12,
    marginTop: 4,
  },
  chatBtnText: {
    color: C.secondary,
    fontWeight: '700',
    fontSize: 14,
  },
});

export default RxScreen;
