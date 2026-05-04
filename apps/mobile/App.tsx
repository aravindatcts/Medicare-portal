// URL polyfill must come before any navigation import
import 'react-native-url-polyfill/auto';

import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/config/queryClient';
import RootNavigator from './src/navigation/RootNavigator';
import { setBaseUrl } from '@medicare/shared';
import { PostHogProvider } from 'posthog-react-native';
import { initSentry, initPostHog } from './src/services/analytics';

// Configure API base URL from env.
// For Android (emulator or physical device on same WiFi), EXPO_PUBLIC_API_URL
// must point to the Mac's LAN IP (e.g. http://192.168.1.210:3001), not localhost.
// See apps/mobile/.env — update the IP if your network changes.
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3001';
setBaseUrl(API_URL);

// Initialise observability before first render. Both are no-ops if env vars are unset.
initSentry();
const posthogClient = initPostHog();

function AppTree() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <RootNavigator />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default function App() {
  if (posthogClient) {
    return (
      <PostHogProvider client={posthogClient}>
        <AppTree />
      </PostHogProvider>
    );
  }
  return <AppTree />;
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
