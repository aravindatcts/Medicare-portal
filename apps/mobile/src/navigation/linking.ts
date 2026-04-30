import type { LinkingOptions } from '@react-navigation/native';
import type { RootStackParamList } from './types';

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['aura-wellness://', 'https://aura-wellness.app'],
  config: {
    screens: {
      App: {
        screens: {
          Dashboard: 'dashboard',
          FindCare: {
            screens: {
              FindCareList: 'find-care',
              ProviderDetail: 'provider/:providerId',
            },
          },
          Benefits: 'benefits',
          Prescriptions: 'prescriptions',
        },
      },
      Auth: {
        screens: {
          Login: 'login',
        },
      },
    },
  },
};
