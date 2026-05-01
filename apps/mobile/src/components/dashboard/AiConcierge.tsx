import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Shadows } from '@medicare/shared';
import { useHero } from '@medicare/shared';
import LoadingSkeleton from '../LoadingSkeleton';
import { IconCircle } from '../ui';

const AiConcierge: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
            <IconCircle
              icon="robot-outline"
              size={40}
              iconSize={20}
              bg={Colors.secondaryContainer}
              color={Colors.onSecondaryContainer}
            />
            <View style={styles.textGroup}>
              <Text style={styles.title}>{data.heading}</Text>
              <Text style={styles.subtitle}>{data.subtext}</Text>
            </View>
          </View>
          <MaterialCommunityIcons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={24}
            color="rgba(255,255,255,0.7)"
          />
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
    backgroundColor: Colors.primary,
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    ...Shadows.deep,
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
  title: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: 2,
  },
  subtitle: {
    color: Colors.blueLight,
    fontSize: 11,
  },
  messageBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  messageText: {
    color: Colors.white,
    fontSize: 14,
    lineHeight: 20,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButtonSecondary: {
    flex: 1,
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  actionButtonSecondaryText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  actionButtonPrimary: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  actionButtonPrimaryText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
});

export default AiConcierge;
