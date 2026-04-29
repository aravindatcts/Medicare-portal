import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useActionAlert } from '@medicare/shared';
import LoadingSkeleton from './LoadingSkeleton';

const NextBestAction: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { data, isLoading } = useActionAlert();

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
              <MaterialCommunityIcons name="lightbulb-outline" size={20} color="#ffa46a" />
            </View>
            <View style={styles.textGroup}>
              <Text style={styles.title}>Next Best Action</Text>
              <Text style={styles.subtitle}>Priority Item</Text>
            </View>
          </View>
          <MaterialCommunityIcons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.bodySection}>
            <Text style={styles.bodyTitle}>{data.title}</Text>
            <Text style={styles.bodyDescription}>
              {data.body}
            </Text>
            
            <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
              <Text style={styles.actionButtonText}>Schedule Now</Text>
              <MaterialCommunityIcons name="calendar-today" size={14} color="#ffffff" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#793701', // tertiary-container
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#793701',
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
    backgroundColor: '#572500', // tertiary
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
    color: '#ffa46a', // on-tertiary-container
    fontSize: 11,
  },
  bodySection: {
    marginTop: 4,
  },
  bodyTitle: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  bodyDescription: {
    color: '#ffa46a',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 18,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: '#572500', // tertiary
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  actionButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});

export default NextBestAction;
