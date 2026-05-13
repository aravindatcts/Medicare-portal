import React from 'react';
import { View } from 'react-native';
import { CmsBlock } from '@medicare/shared';
import { MobileComponentRegistry } from './MobileComponentRegistry';

interface CmsRendererProps {
  blocks: CmsBlock[];
  context?: any;
}

export function CmsRenderer({ blocks, context }: CmsRendererProps) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <>
      {blocks.map((block) => {
        const Component = MobileComponentRegistry[block.componentType as keyof typeof MobileComponentRegistry];
        
        if (!Component) {
          console.warn(`[CmsRenderer] No component found in registry for type: ${block.componentType}`);
          return null;
        }

        return <Component key={block.id} {...block.props} context={context} />;
      })}
    </>
  );
}
