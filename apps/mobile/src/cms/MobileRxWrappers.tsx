import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@medicare/shared';
import { CmsRenderer } from './CmsRenderer';

import PharmacyCard from '../components/rx/PharmacyCard';
import DailySchedule from '../components/rx/DailySchedule';
import PrescriptionCard from '../components/rx/PrescriptionCard';
import NoRefillCard from '../components/rx/NoRefillCard';
import PharmacistCard from '../components/rx/PharmacistCard';
import LoadingSkeleton from '../components/LoadingSkeleton';

export const MobileRxHero = () => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.pageTitle}>Rx Management</Text>
        <Text style={styles.pageSubtitle}>Your sanctuary for medication clarity.</Text>
      </View>
      <TouchableOpacity style={styles.historyBtn} activeOpacity={0.8}>
        <MaterialCommunityIcons name="history" size={18} color={Colors.onSecondaryContainer} />
        <Text style={styles.historyBtnText}>History</Text>
      </TouchableOpacity>
    </View>
  );
};

export const MobileRxContentLayout = ({ leftBlocks, rightBlocks, context }: any) => {
  return (
    <View>
      {/* For mobile, we just stack left and right blocks sequentially */}
      <CmsRenderer blocks={rightBlocks || []} context={context} />
      <CmsRenderer blocks={leftBlocks || []} context={context} />
    </View>
  );
};

export const MobileRxPrimaryPharmacy = () => {
  return <PharmacyCard />;
};

export const MobileRxDailySchedule = () => {
  return <DailySchedule />;
};

export const MobileRxActivePrescriptions = ({ context }: any) => {
  const prescriptionsData = context?.rx;
  const isLoading = context?.isLoading;

  return (
    <>
      <View style={styles.prescriptionsHeader}>
        <Text style={styles.prescriptionsTitle}>Active Prescriptions</Text>
        <Text style={styles.prescriptionsCount}>
          {isLoading ? '...' : `${prescriptionsData?.active?.length || 0} active`}
        </Text>
      </View>

      {isLoading ? (
        <>
          <LoadingSkeleton style={{ marginHorizontal: 16, marginBottom: 12, height: 120, borderRadius: 20 }} />
          <LoadingSkeleton style={{ marginHorizontal: 16, marginBottom: 12, height: 120, borderRadius: 20 }} />
        </>
      ) : (
        prescriptionsData?.active?.map((rx: any, idx: number) => (
          <PrescriptionCard
            key={idx}
            name={rx.name}
            dosage={rx.dose}
            refillDate={rx.lastFilled}
            refillsLeft={rx.refills.toString().padStart(2, '0')}
          />
        ))
      )}

      {(!isLoading && prescriptionsData?.active?.length === 0) && <NoRefillCard />}
    </>
  );
};

export const MobileRxAiAssistant = () => {
  return <PharmacistCard />;
};

export const MobileRxDeliveryStatus = () => {
  // Mobile doesn't have a delivery status card yet, so we return null or a simple spacer
  return <View style={{ height: 16 }} />;
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  pageSubtitle: {
    fontSize: 13,
    color: Colors.onSurfaceVariant,
    marginTop: 2,
  },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: `${Colors.secondaryContainer}30`,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  historyBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.onSecondaryContainer,
  },
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
    color: Colors.primary,
  },
  prescriptionsCount: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.onSurfaceVariant,
  },
});
