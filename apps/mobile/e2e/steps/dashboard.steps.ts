import { device, element, by, expect as detoxExpect } from 'detox';
import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('./e2e/features/dashboard.feature');

defineFeature(feature, test => {

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  test('Dashboard screen is visible', ({ given, then }) => {
    given('the app is launched', async () => {
      // device.launchApp() is called in global setup; reloadReactNative() above resets state
    });

    then('I should see the dashboard screen', async () => {
      await detoxExpect(element(by.testID('dashboard-screen'))).toBeVisible();
    });

    then('I should see the member name', async () => {
      await detoxExpect(element(by.testID('member-name'))).toBeVisible();
    });
  });

  test('Bottom navigation is accessible', ({ given, then }) => {
    given('the app is launched', async () => {});

    then('I should see the bottom tab bar', async () => {
      await detoxExpect(element(by.testID('bottom-tab-bar'))).toBeVisible();
    });
  });

  test('Navigate to Claims from bottom tab', ({ given, when, then }) => {
    given('the app is launched', async () => {});

    when('I tap the "Claims" tab', async () => {
      await element(by.testID('tab-claims')).tap();
    });

    then('I should see the claims screen', async () => {
      await detoxExpect(element(by.testID('claims-screen'))).toBeVisible();
    });
  });

  test('Navigate to Find Care from bottom tab', ({ given, when, then }) => {
    given('the app is launched', async () => {});

    when('I tap the "Find Care" tab', async () => {
      await element(by.testID('tab-find-care')).tap();
    });

    then('I should see the find care screen', async () => {
      await detoxExpect(element(by.testID('find-care-screen'))).toBeVisible();
    });
  });

  test('Navigate to Benefits from bottom tab', ({ given, when, then }) => {
    given('the app is launched', async () => {});

    when('I tap the "Benefits" tab', async () => {
      await element(by.testID('tab-benefits')).tap();
    });

    then('I should see the benefits screen', async () => {
      await detoxExpect(element(by.testID('benefits-screen'))).toBeVisible();
    });
  });

});
