import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Colors,
  FontSize,
  Radius,
} from '@medicare/shared';
import EditFieldModal from '../components/settings/EditFieldModal';
import PreferenceToggleRow from '../components/settings/PreferenceToggleRow';
import SwitchRow from '../components/layout/SwitchRow';
import type { CommunicationPreference } from '@medicare/shared';
import { CmsRenderer } from './CmsRenderer';

type EditingField = 'address' | 'phone' | null;

export const MobileSettingsAccount = ({ context }: any) => {
  const data = context?.settings;
  const updateMember = context?.updateMember;
  const [editingField, setEditingField] = useState<EditingField>(null);

  if (!data?.member) return null;

  return (
    <View style={{ marginBottom: 20 }}>
      <SectionLabel label="Account Information" />
      <ActionRow
        icon="account-outline"
        label="Full Name"
        value={data.member.name}
      />
      <Divider />
      <ActionRow
        icon="map-marker-outline"
        label="Address"
        value={data.member.address}
        onPress={() => setEditingField('address')}
      />
      <Divider />
      <ActionRow
        icon="phone-outline"
        label="Phone Number"
        value={data.member.phone}
        onPress={() => setEditingField('phone')}
      />

      <EditFieldModal
        visible={editingField !== null}
        label={editingField === 'address' ? 'Address' : 'Phone Number'}
        value={editingField === 'address' ? data.member.address : data.member.phone}
        multiline={editingField === 'address'}
        onClose={() => setEditingField(null)}
        onSave={async (val) => {
          await updateMember.mutateAsync({ [editingField!]: val });
          setEditingField(null);
        }}
        loading={updateMember?.isPending}
      />
    </View>
  );
};

export const MobileSettingsPreferences = ({ context }: any) => {
  const data = context?.settings;
  const updatePrefs = context?.updatePrefs;
  
  if (!data?.preferences) return null;

  const prefs = data.preferences;

  return (
    <View style={{ marginBottom: 20 }}>
      <SectionLabel label="Preferences" />
      <ActionRow
        icon="translate"
        label="Language"
        value={prefs.language}
        onPress={() => updatePrefs.mutate({ language: prefs.language === 'en' ? 'es' : 'en' })}
      />
      <Divider />
      <PreferenceToggleRow
        icon="email-outline"
        label="Communication"
        value={prefs.communicationPreference as CommunicationPreference}
        onChange={(val: CommunicationPreference) => updatePrefs.mutate({ communicationPreference: val })}
      />
      <Divider />
      <PreferenceToggleRow
        icon="file-document-outline"
        label="Tax Documents (EOB)"
        value={prefs.eobPreference as CommunicationPreference}
        onChange={(val: CommunicationPreference) => updatePrefs.mutate({ eobPreference: val })}
      />
    </View>
  );
};

export const MobileSettingsSecurity = ({ context }: any) => {
  const biometricsEnabled = context?.biometricsEnabled;
  const onToggleBiometrics = context?.onToggleBiometrics;

  return (
    <View style={{ marginBottom: 20 }}>
      <SectionLabel label="Security" />
      <SwitchRow
        icon="fingerprint"
        label="Biometric Login"
        value={!!biometricsEnabled}
        onValueChange={onToggleBiometrics}
      />
      <Divider />
      <ActionRow
        icon="lock-reset"
        label="Change Password"
        onPress={() => {}}
      />
    </View>
  );
};

export const MobileSettingsSupport = ({ context }: any) => {
  const onSignOut = context?.onSignOut;

  return (
    <View style={{ marginBottom: 20 }}>
      <SectionLabel label="Support & Legal" />
      <ActionRow icon="help-circle-outline" label="Help Center" />
      <Divider />
      <ActionRow icon="file-document-outline" label="Terms of Service" />
      <Divider />
      <ActionRow icon="shield-lock-outline" label="Privacy Policy" />
      <Divider />
      <ActionRow
        icon="logout"
        label="Sign Out"
        destructive
        onPress={onSignOut}
      />
    </View>
  );
};

export const MobileSettingsLayout = ({ blocks, context }: any) => {
  return (
    <View>
      <CmsRenderer blocks={blocks || []} context={context} />
    </View>
  );
};

function SectionLabel({ label }: { label: string }) {
  return (
    <View style={styles.sectionLabelRow}>
      <Text style={styles.sectionLabelText}>{label}</Text>
      <View style={styles.sectionLabelLine} />
    </View>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

function ActionRow({
  icon,
  label,
  value,
  onPress,
  destructive = false,
}: {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
  destructive?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.actionRow} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconBox, destructive && styles.iconBoxDestructive]}>
        <MaterialCommunityIcons
          name={icon as any}
          size={18}
          color={destructive ? Colors.error : Colors.primary}
        />
      </View>
      <Text style={[styles.actionLabel, destructive && styles.actionLabelDestructive]}>
        {label}
      </Text>
      {value ? (
        <Text style={styles.actionValue}>{value}</Text>
      ) : (
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={Colors.outlineVariant}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sectionLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginBottom: 12,
    marginTop: 8,
  },
  sectionLabelText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
  sectionLabelLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.surfaceContainerHigh,
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.surfaceContainerLow,
    marginLeft: 56,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  iconBoxDestructive: {
    backgroundColor: '#ffebee',
  },
  actionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: Colors.onSurface,
  },
  actionLabelDestructive: {
    color: Colors.error,
  },
  actionValue: {
    fontSize: 14,
    color: Colors.onSurfaceVariant,
    fontWeight: '500',
  },
});
