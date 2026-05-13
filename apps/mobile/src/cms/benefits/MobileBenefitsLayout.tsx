import React from 'react';
import { View } from 'react-native';
import { CmsRenderer } from '../CmsRenderer';

export const MobileBenefitsLayout = ({ leftBlocks, rightBlocks, bottomBlocks, context }: any) => {
  // Simple linear layout for mobile
  return (
    <View>
      <CmsRenderer blocks={leftBlocks || []} context={context} />
      <CmsRenderer blocks={rightBlocks || []} context={context} />
      <CmsRenderer blocks={bottomBlocks || []} context={context} />
    </View>
  );
};
