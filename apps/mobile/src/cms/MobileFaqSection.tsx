import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, FontSize, Spacing, CmsFaqSectionProps } from '@medicare/shared';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export const MobileFaqSection = ({ title, faqs }: CmsFaqSectionProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  if (!faqs || faqs.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'Frequently Asked Questions'}</Text>
      <View style={styles.list}>
        {faqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <View key={faq.id} style={styles.faqItem}>
              <TouchableOpacity 
                style={styles.header}
                onPress={() => setOpenId(isOpen ? null : faq.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.question}>{faq.question}</Text>
                <MaterialCommunityIcons 
                  name={isOpen ? 'chevron-up' : 'chevron-down'} 
                  size={24} 
                  color={Colors.primary} 
                />
              </TouchableOpacity>
              {isOpen && (
                <View style={styles.answerContainer}>
                  <Text style={styles.answer}>{faq.answer}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: Spacing.md,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: Spacing.md,
  },
  list: {
    gap: Spacing.sm,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
    paddingBottom: Spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
  question: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.onSurface,
    flex: 1,
    paddingRight: Spacing.sm,
  },
  answerContainer: {
    paddingVertical: Spacing.xs,
  },
  answer: {
    fontSize: FontSize.sm,
    color: Colors.onSurfaceVariant,
    lineHeight: 20,
  },
});
