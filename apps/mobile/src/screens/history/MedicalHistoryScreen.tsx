import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacing, Radius, FontSize, Shadows } from '@medicare/shared';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HistoryAiConcierge from '../../components/history/HistoryAiConcierge';
import TimelineItem from '../../components/history/TimelineItem';
import TopBar from '../../components/TopBar';
import { MedicalHistoryScreenProps } from '../../navigation/types';
import HistorySkeleton from '../../components/history/HistorySkeleton';

import { medicalService, MedicalHistoryItem } from '../../services/medical.service';

const FILTERS = ['All', 'Vaccination', 'Test', 'Diagnosis', 'Lab results'];

const MedicalHistoryScreen: React.FC<MedicalHistoryScreenProps> = () => {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');
  const [history, setHistory] = useState<MedicalHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await medicalService.getMedicalHistory();
        setHistory(data);
      } catch (error) {
        console.error('Failed to fetch medical history:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredHistory = history.filter(item => 
    activeFilter === 'All' || item.category === activeFilter
  );

  // Group by monthLabel
  const groupedHistory = filteredHistory.reduce((acc, item) => {
    if (!acc[item.monthLabel]) acc[item.monthLabel] = [];
    acc[item.monthLabel].push(item);
    return acc;
  }, {} as Record<string, MedicalHistoryItem[]>);

  const months = Object.keys(groupedHistory).sort((a, b) => {
    // Basic sort descending by date (assuming label contains Year)
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <View style={styles.root} accessibilityLabel="medical-history-screen">
      <View style={{ paddingTop: insets.top }} />
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
      
      <TopBar title="Medical History" />

      <ScrollView 
        style={styles.scroll} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HistoryAiConcierge />

        {/* Filters */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {FILTERS.map(filter => (
              <TouchableOpacity
                key={filter}
                style={[styles.filterChip, activeFilter === filter && styles.filterChipActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Timeline Content */}
        <View style={styles.timelineContainer}>
          <View style={styles.timelineLine} />

          {loading ? (
            <HistorySkeleton />
          ) : (() => {
            let itemGlobalIndex = 0;
            return months.map(month => (
              <React.Fragment key={month}>
                <View style={styles.monthMarkerContainer}>
                  <View style={styles.monthMarker}>
                    <Text style={styles.monthText}>{month}</Text>
                    <MaterialCommunityIcons name="chevron-down" size={14} color={Colors.textSecondary} />
                  </View>
                </View>

                {groupedHistory[month].map(item => {
                  const isRight = itemGlobalIndex % 2 !== 0;
                  itemGlobalIndex++;
                  return (
                    <TimelineItem 
                      key={item.id}
                      type={item.type}
                      title={item.title}
                      subtitle={item.subtitle}
                      description={item.description}
                      status={item.status as any}
                      showDownload={item.showDownload}
                      notes={item.notes}
                      date={item.date}
                      isRight={isRight}
                    />
                  );
                })}
              </React.Fragment>
            ));
          })()}
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  filterContainer: {
    marginBottom: Spacing.lg,
  },
  filterScroll: {
    paddingHorizontal: Spacing.md,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.full,
    backgroundColor: Colors.surfaceContainer,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.white,
  },
  timelineContainer: {
    position: 'relative',
    paddingTop: Spacing.md,
  },
  timelineLine: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#cbd5e1', // Darker gray
    zIndex: -1,
  },
  monthMarkerContainer: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    backgroundColor: Colors.background, // To hide the line behind the marker
  },
  monthMarker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    gap: 4,
    ...Shadows.sm,
  },
  monthText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
  },
});

export default MedicalHistoryScreen;
