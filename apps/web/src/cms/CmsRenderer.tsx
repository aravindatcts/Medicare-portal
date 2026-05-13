import React from 'react';
import { CmsBlock } from '@medicare/shared';
import { WebComponentRegistry } from './WebComponentRegistry';

interface CmsRendererProps {
  blocks: CmsBlock[];
  context?: any; // e.g., member data, plan data passed to all components
}

export function CmsRenderer({ blocks, context }: CmsRendererProps) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <>
      {blocks.map((block) => {
        const Component = WebComponentRegistry[block.componentType as keyof typeof WebComponentRegistry];
        
        if (!Component) {
          console.warn(`[CmsRenderer] No component found in registry for type: ${block.componentType}`);
          return null;
        }

        return <Component key={block.id} {...block.props} context={context} />;
      })}
    </>
  );
}
