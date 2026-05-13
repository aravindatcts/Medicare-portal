import React from 'react';
import { CmsRenderer } from './CmsRenderer';

export const WebTwoColumnRow = (props: any) => {
  const { gridTemplate = '1fr 1fr', gap = 20, leftBlock, rightBlock, context, marginBottom = 28 } = props;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: gridTemplate, gap, marginBottom }}>
      {leftBlock && (
        <CmsRenderer blocks={[leftBlock]} context={context} />
      )}
      {rightBlock && (
        <CmsRenderer blocks={[rightBlock]} context={context} />
      )}
    </div>
  );
};
