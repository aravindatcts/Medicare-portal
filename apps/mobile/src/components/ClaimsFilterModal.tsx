import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const C = {
  primary: '#002B59',
  secondary: '#00658d',
  bgLight: '#f8f9fa',
  white: '#ffffff',
  onSurface: '#1a2a3a',
  onSurfaceVariant: '#4a6175',
  outline: '#e2e5ec',
};

interface ClaimsFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: { selectedStatus: string[], dateRange: string, searchQuery: string, selectedDep: string }) => void;
}

export default function ClaimsFilterModal({ visible, onClose, onApply }: ClaimsFilterModalProps) {
  const insets = useSafeAreaInsets();
  
  const [selectedStatus, setSelectedStatus] = useState<string[]>(['processed']);
  const [dateRange, setDateRange] = useState('last30');
  const [selectedDep, setSelectedDep] = useState('john');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleStatus = (status: string) => {
    setSelectedStatus(prev => 
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const handleClearAll = () => {
    setSelectedStatus([]);
    setDateRange('last30');
    setSearchQuery('');
    setSelectedDep('john');
  };

  const handleApply = () => {
    onApply({ selectedStatus, dateRange, searchQuery, selectedDep });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={[styles.root, { paddingTop: insets.top }]}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={C.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Claims Center</Text>
          <View style={styles.avatarMini}>
            <MaterialCommunityIcons name="account" size={14} color={C.white} />
          </View>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Title Area */}
          <Text style={styles.overline}>REFINE SEARCH</Text>
          <Text style={styles.pageTitle}>Smart Filter</Text>
          <Text style={styles.pageSubtitle}>
            Adjust your preferences to find specific medical claims within your history.
          </Text>

          {/* Claim Status */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Claim Status</Text>
            <Text style={styles.sectionAction}>Select one or more</Text>
          </View>

          <View style={styles.grid2}>
            {/* Status 1 */}
            <TouchableOpacity 
              style={[styles.statusBox, selectedStatus.includes('processed') && styles.statusBoxActive]}
              onPress={() => toggleStatus('processed')}
            >
              {selectedStatus.includes('processed') && <View style={styles.activeDot} />}
              <MaterialCommunityIcons name="check-circle-outline" size={20} color={selectedStatus.includes('processed') ? C.primary : C.onSurfaceVariant} />
              <Text style={[styles.statusBoxText, selectedStatus.includes('processed') && styles.statusBoxTextActive]}>Processed</Text>
            </TouchableOpacity>

            {/* Status 2 */}
            <TouchableOpacity 
              style={[styles.statusBox, selectedStatus.includes('review') && styles.statusBoxActive]}
              onPress={() => toggleStatus('review')}
            >
              {selectedStatus.includes('review') && <View style={styles.activeDot} />}
              <MaterialCommunityIcons name="eye-outline" size={20} color={selectedStatus.includes('review') ? C.primary : C.onSurfaceVariant} />
              <Text style={[styles.statusBoxText, selectedStatus.includes('review') && styles.statusBoxTextActive]}>In Review</Text>
            </TouchableOpacity>

            {/* Status 3 */}
            <TouchableOpacity 
              style={[styles.statusBox, selectedStatus.includes('paid') && styles.statusBoxActive]}
              onPress={() => toggleStatus('paid')}
            >
              {selectedStatus.includes('paid') && <View style={styles.activeDot} />}
              <MaterialCommunityIcons name="cash" size={20} color={selectedStatus.includes('paid') ? C.primary : C.onSurfaceVariant} />
              <Text style={[styles.statusBoxText, selectedStatus.includes('paid') && styles.statusBoxTextActive]}>Paid</Text>
            </TouchableOpacity>

            {/* Status 4 */}
            <TouchableOpacity 
              style={[styles.statusBox, selectedStatus.includes('denied') && styles.statusBoxActive]}
              onPress={() => toggleStatus('denied')}
            >
              {selectedStatus.includes('denied') && <View style={styles.activeDot} />}
              <MaterialCommunityIcons name="close-circle-outline" size={20} color={selectedStatus.includes('denied') ? C.primary : C.onSurfaceVariant} />
              <Text style={[styles.statusBoxText, selectedStatus.includes('denied') && styles.statusBoxTextActive]}>Denied</Text>
            </TouchableOpacity>
          </View>

          {/* Date Range */}
          <View style={styles.cardBg}>
            <Text style={styles.cardTitle}>Date Range</Text>
            <View style={styles.pillRow}>
              <TouchableOpacity 
                style={[styles.pill, dateRange === 'last30' && styles.pillActive]}
                onPress={() => setDateRange('last30')}
              >
                <Text style={[styles.pillText, dateRange === 'last30' && styles.pillTextActive]}>Last 30 days</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.pill, dateRange === '6months' && styles.pillActive]}
                onPress={() => setDateRange('6months')}
              >
                <Text style={[styles.pillText, dateRange === '6months' && styles.pillTextActive]}>6 months</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.pill, dateRange === 'ytd' && styles.pillActive]}
                onPress={() => setDateRange('ytd')}
              >
                <Text style={[styles.pillText, dateRange === 'ytd' && styles.pillTextActive]}>Year to Date</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.datePicker}>
              <MaterialCommunityIcons name="calendar-month-outline" size={18} color={C.onSurfaceVariant} />
              <Text style={styles.datePickerText}>Custom Date Picker</Text>
            </View>
          </View>

          {/* Provider Name */}
          <Text style={styles.sectionTitle}>Provider Name</Text>
          <View style={styles.searchInput}>
            <MaterialCommunityIcons name="magnify" size={20} color={C.onSurfaceVariant} />
            <TextInput 
              placeholder="Search medical facilities or doctors.." 
              placeholderTextColor={C.onSurfaceVariant} 
              style={{ flex: 1, fontSize: 13, color: C.onSurface }}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 32 }}>
            <TouchableOpacity style={styles.recentChip} onPress={() => setSearchQuery('City General')}>
              <View style={styles.recentIconBox}><MaterialCommunityIcons name="hospital-building" size={14} color={C.primary} /></View>
              <View>
                <Text style={styles.recentChipTitle}>City General</Text>
                <Text style={styles.recentChipSub}>RECENT</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.recentChip} onPress={() => setSearchQuery('Aura Dental Care')}>
              <View style={styles.recentIconBox}><MaterialCommunityIcons name="medical-bag" size={14} color={C.primary} /></View>
              <View>
                <Text style={styles.recentChipTitle}>Aura Dental C...</Text>
                <Text style={styles.recentChipSub}>RECENT</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Subscribers & Dependents */}
          <Text style={styles.sectionTitle}>Subscribers & Dependents</Text>
          <View style={styles.depList}>
            {/* John Doe */}
            <TouchableOpacity style={[styles.depItem, selectedDep === 'john' && styles.depItemActive]} onPress={() => setSelectedDep('john')}>
              <View style={[styles.depAvatar, selectedDep === 'john' && styles.depAvatarActive]}>
                <Text style={[styles.depInitials, selectedDep === 'john' && styles.depInitialsActive]}>JD</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.depName, selectedDep === 'john' && styles.depNameActive]}>John Doe</Text>
                <Text style={[styles.depRole, selectedDep === 'john' && styles.depRoleActive]}>Primary Subscriber (You)</Text>
              </View>
              {selectedDep === 'john' ? (
                 <MaterialCommunityIcons name="check-circle-outline" size={20} color={C.white} />
              ) : (
                 <MaterialCommunityIcons name="circle-outline" size={20} color={C.onSurfaceVariant} />
              )}
            </TouchableOpacity>

            {/* Sarah Doe */}
            <TouchableOpacity style={[styles.depItem, selectedDep === 'sarah' && styles.depItemActive]} onPress={() => setSelectedDep('sarah')}>
              <View style={[styles.depAvatar, selectedDep === 'sarah' && styles.depAvatarActive]}>
                <Text style={[styles.depInitials, selectedDep === 'sarah' && styles.depInitialsActive]}>SD</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.depName, selectedDep === 'sarah' && styles.depNameActive]}>Sarah Doe</Text>
                <Text style={[styles.depRole, selectedDep === 'sarah' && styles.depRoleActive]}>Dependent</Text>
              </View>
              {selectedDep === 'sarah' ? (
                 <MaterialCommunityIcons name="check-circle-outline" size={20} color={C.white} />
              ) : (
                 <MaterialCommunityIcons name="circle-outline" size={20} color={C.onSurfaceVariant} />
              )}
            </TouchableOpacity>

            {/* Mikey Doe */}
            <TouchableOpacity style={[styles.depItem, selectedDep === 'mikey' && styles.depItemActive]} onPress={() => setSelectedDep('mikey')}>
              <View style={[styles.depAvatar, selectedDep === 'mikey' && styles.depAvatarActive]}>
                <Text style={[styles.depInitials, selectedDep === 'mikey' && styles.depInitialsActive]}>MD</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.depName, selectedDep === 'mikey' && styles.depNameActive]}>Mikey Doe</Text>
                <Text style={[styles.depRole, selectedDep === 'mikey' && styles.depRoleActive]}>Dependent</Text>
              </View>
              {selectedDep === 'mikey' ? (
                 <MaterialCommunityIcons name="check-circle-outline" size={20} color={C.white} />
              ) : (
                 <MaterialCommunityIcons name="circle-outline" size={20} color={C.onSurfaceVariant} />
              )}
            </TouchableOpacity>
          </View>

        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.clearBtn} onPress={handleClearAll}>
            <Text style={styles.clearBtnText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyBtn} onPress={handleApply}>
            <Text style={styles.applyBtnText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bgLight },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 16, fontWeight: '700', color: C.primary },
  avatarMini: { width: 28, height: 28, borderRadius: 14, backgroundColor: C.secondary, alignItems: 'center', justifyContent: 'center' },
  
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },

  overline: { fontSize: 10, fontWeight: '800', color: '#00658d', letterSpacing: 1, marginBottom: 8 },
  pageTitle: { fontSize: 32, fontWeight: '800', color: C.primary, letterSpacing: -0.5, marginBottom: 12 },
  pageSubtitle: { fontSize: 13, color: C.onSurfaceVariant, lineHeight: 18, marginBottom: 32 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: C.primary, marginBottom: 12 },
  sectionAction: { fontSize: 11, color: C.onSurfaceVariant },

  grid2: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 32 },
  statusBox: { width: '48%', backgroundColor: '#f1f5f9', borderRadius: 12, padding: 16, borderCurve: 'continuous', borderWidth: 2, borderColor: 'transparent' },
  statusBoxActive: { backgroundColor: C.white, borderColor: C.primary },
  statusBoxText: { fontSize: 14, fontWeight: '700', color: C.onSurfaceVariant, marginTop: 12 },
  statusBoxTextActive: { color: C.primary },
  activeDot: { position: 'absolute', top: 12, right: 12, width: 6, height: 6, borderRadius: 3, backgroundColor: C.primary },

  cardBg: { backgroundColor: '#f8fafc', borderRadius: 20, padding: 20, marginBottom: 32 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: C.primary, marginBottom: 16 },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  pill: { backgroundColor: C.white, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  pillActive: { backgroundColor: C.primary },
  pillText: { fontSize: 13, fontWeight: '600', color: C.onSurfaceVariant },
  pillTextActive: { color: C.white },
  datePicker: { backgroundColor: '#e2e8f0', borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 8 },
  datePickerText: { fontSize: 13, color: C.onSurfaceVariant },

  searchInput: { backgroundColor: '#f1f5f9', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
  recentChip: { backgroundColor: C.white, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  recentIconBox: { width: 32, height: 32, borderRadius: 8, backgroundColor: '#e0f2fe', alignItems: 'center', justifyContent: 'center' },
  recentChipTitle: { fontSize: 13, fontWeight: '700', color: C.onSurface },
  recentChipSub: { fontSize: 9, fontWeight: '800', color: C.onSurfaceVariant, letterSpacing: 0.5 },

  depList: { gap: 12 },
  depItem: { backgroundColor: '#f8fafc', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  depItemActive: { backgroundColor: C.primary },
  depAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e2e8f0', alignItems: 'center', justifyContent: 'center' },
  depAvatarActive: { backgroundColor: '#1e40af' },
  depInitials: { fontSize: 14, fontWeight: '700', color: C.onSurfaceVariant },
  depInitialsActive: { color: C.white },
  depName: { fontSize: 15, fontWeight: '700', color: C.onSurface, marginBottom: 2 },
  depNameActive: { color: C.white },
  depRole: { fontSize: 11, color: C.onSurfaceVariant },
  depRoleActive: { color: 'rgba(255,255,255,0.7)' },

  footer: { flexDirection: 'row', gap: 12, padding: 16, backgroundColor: C.bgLight, borderTopWidth: 1, borderTopColor: '#e2e8f0' },
  clearBtn: { flex: 1, backgroundColor: '#e2e8f0', borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  clearBtnText: { fontSize: 14, fontWeight: '700', color: C.onSurface },
  applyBtn: { flex: 2, backgroundColor: C.primary, borderRadius: 12, paddingVertical: 16, alignItems: 'center' },
  applyBtnText: { fontSize: 14, fontWeight: '700', color: C.white },
});
