import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { TabParamList, FindCareStackParamList, ClaimsStackParamList } from './types';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import FindCareScreen from '../screens/FindCareScreen';
import ProviderDetailScreen from '../screens/find-care/ProviderDetailScreen';
import BenefitsScreen from '../screens/BenefitsScreen';
import PrescriptionsScreen from '../screens/PrescriptionsScreen';
import ClaimsScreen from '../screens/ClaimsScreen';
import ClaimDetailScreen from '../screens/ClaimDetailScreen';
import BottomNav from '../components/BottomNav';

const Tab = createBottomTabNavigator<TabParamList>();
const FindCareStack = createNativeStackNavigator<FindCareStackParamList>();
const ClaimsStack = createNativeStackNavigator<ClaimsStackParamList>();

function FindCareNavigator() {
  return (
    <FindCareStack.Navigator screenOptions={{ headerShown: false }}>
      <FindCareStack.Screen name="FindCareList" component={FindCareScreen} />
      <FindCareStack.Screen name="ProviderDetail" component={ProviderDetailScreen} />
    </FindCareStack.Navigator>
  );
}

function ClaimsNavigator() {
  return (
    <ClaimsStack.Navigator screenOptions={{ headerShown: false }}>
      <ClaimsStack.Screen name="ClaimsList" component={ClaimsScreen} />
      <ClaimsStack.Screen name="ClaimDetail" component={ClaimDetailScreen} />
    </ClaimsStack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{ headerShown: false, lazy: true }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Claims" component={ClaimsNavigator} />
      <Tab.Screen name="FindCare" component={FindCareNavigator} />
      <Tab.Screen name="Benefits" component={BenefitsScreen} />
      <Tab.Screen name="Prescriptions" component={PrescriptionsScreen} />
    </Tab.Navigator>
  );
}
