import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  onBack: () => void;
}

const ProviderDetailScreen: React.FC<Props> = ({ onBack }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={onBack}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#003461" />
        <Text style={styles.backTxt}>Back</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <MaterialCommunityIcons name="doctor" size={64} color="#00658d" />
        <Text style={styles.title}>Provider Details</Text>
        <Text style={styles.subtitle}>Detailed view of the primary care provider.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  backBtn: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 8 },
  backTxt: { color: '#003461', fontSize: 16, fontWeight: '700' },
  content: { padding: 32, alignItems: 'center', gap: 16 },
  title: { fontSize: 24, fontWeight: '800', color: '#003461' },
  subtitle: { fontSize: 16, color: '#424750', textAlign: 'center' },
});

export default ProviderDetailScreen;
