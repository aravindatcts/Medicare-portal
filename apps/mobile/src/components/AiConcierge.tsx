import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useHero } from '@medicare/shared';
import LoadingSkeleton from './LoadingSkeleton';

const AiConcierge: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { data, isLoading } = useHero();

  if (isLoading || !data) {
    return <LoadingSkeleton style={{ marginHorizontal: 20, marginBottom: 16, height: 160, borderRadius: 16 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity 
          style={[styles.headerRow, !isExpanded && styles.headerRowCollapsed]} 
          activeOpacity={0.8} 
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <View style={styles.leftGroup}>
            <View style={styles.iconCircle}>
              <MaterialCommunityIcons name="robot-outline" size={20} color="#004b69" />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.title}>{data.heading}</Text>
              <Text style={styles.subtitle}>{data.subtext}</Text>
            </View>
          </View>
          <MaterialCommunityIcons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>

        {isExpanded && (
          <>
            <View style={styles.messageBox}>
              <Text style={styles.messageText}>
                "Hi Arthur! I noticed you haven't had your annual check-up yet. Would you like me to find a provider near you?"
              </Text>
            </View>

            <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.actionButtonSecondary} activeOpacity={0.8}>
                <Text style={styles.actionButtonSecondaryText}>Find Provider</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButtonPrimary} activeOpacity={0.8}>
                <Text style={styles.actionButtonPrimaryText}>{data.ctaLabel}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003461', // primary
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#003461',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerRowCollapsed: {
    marginBottom: 0,
  },
  leftGroup: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  textGroup: {
    flex: 1,
    paddingRight: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#41befd', // secondary-container
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  title: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 2,
  },
  subtitle: {
    color: '#bfdbfe', // blue-200 equivalent
    fontSize: 11,
  },
  messageBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  messageText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButtonSecondary: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  actionButtonSecondaryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  actionButtonPrimary: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  actionButtonPrimaryText: {
    color: '#003461',
    fontSize: 12,
    fontWeight: '700',
  },
});

export default AiConcierge;
