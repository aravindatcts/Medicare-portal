// Must be the very first import — patches RN's URL polyfill so
// @react-navigation/native's window stub doesn't throw URL.protocol
import 'react-native-url-polyfill/auto';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardScreen from './src/screens/DashboardScreen';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardScreen />
    </QueryClientProvider>
  );
}
