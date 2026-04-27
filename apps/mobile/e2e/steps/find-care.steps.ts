import { device, element, by, expect as detoxExpect } from 'detox';
import { defineFeature, loadFeature } from 'jest-cucumber';

const feature = loadFeature('./e2e/features/find-care.feature');

defineFeature(feature, test => {

  beforeEach(async () => {
    await device.reloadReactNative();
    await element(by.testID('tab-find-care')).tap();
  });

  test('Find Care screen loads', ({ given, and, then }) => {
    given('the app is launched', async () => {});
    and('I navigate to the Find Care screen', async () => {});

    then('I should see the provider search input', async () => {
      await detoxExpect(element(by.testID('provider-search-input'))).toBeVisible();
    });
  });

  test('Search for a provider', ({ given, and, when, then }) => {
    given('the app is launched', async () => {});
    and('I navigate to the Find Care screen', async () => {});

    when('I type "cardiology" in the provider search input', async () => {
      await element(by.testID('provider-search-input')).typeText('cardiology');
    });

    and('I tap the search button', async () => {
      await element(by.testID('search-button')).tap();
    });

    then('I should see at least 1 provider result', async () => {
      await detoxExpect(element(by.testID('provider-list'))).toBeVisible();
      await detoxExpect(element(by.testID('provider-card-0'))).toBeVisible();
    });
  });

  test('View provider details', ({ given, and, when, then }) => {
    given('the app is launched', async () => {});
    and('I navigate to the Find Care screen', async () => {});

    given('I have searched for "primary care"', async () => {
      await element(by.testID('provider-search-input')).typeText('primary care');
      await element(by.testID('search-button')).tap();
      await detoxExpect(element(by.testID('provider-card-0'))).toBeVisible();
    });

    when('I tap the first provider in the list', async () => {
      await element(by.testID('provider-card-0')).tap();
    });

    then('I should see the provider detail screen', async () => {
      await detoxExpect(element(by.testID('provider-detail-screen'))).toBeVisible();
    });
  });

});
