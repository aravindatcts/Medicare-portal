import React from 'react';
import { View } from 'react-native';
import { CmsRenderer } from './CmsRenderer';

export const MobileTwoColumnRow = (props: any) => {
  const { leftBlock, rightBlock, context } = props;

  // On mobile, we stack columns vertically. Removed flex: 1 to prevent collapse in ScrollView
  return (
    <View style={{ flexDirection: 'column', gap: 16 }}>
      {leftBlock && (
        <CmsRenderer blocks={[leftBlock]} context={context} />
      )}
      {rightBlock && (
        <CmsRenderer blocks={[rightBlock]} context={context} />
      )}
    </View>
  );
};
