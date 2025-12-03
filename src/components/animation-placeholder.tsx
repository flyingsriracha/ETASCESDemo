import React, { useState } from 'react';
import { Resizable } from 're-resizable';
import { cn } from './ui/utils';

interface AnimationPlaceholderProps {
  label?: string;
  className?: string;
  width?: number;
  height?: number;
  resizable?: boolean;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number | string;
  maxHeight?: number | string;
}

export const AnimationPlaceholder: React.FC<AnimationPlaceholderProps> = ({ 
  label = "ANIMATION_PLACEHOLDER",
  className,
  width = 960,
  height = 540,
  resizable = true,
  minWidth = 300,
  minHeight = 200,
  maxWidth = '100%',
  maxHeight = '100%',
}) => {
  const [size, setSize] = useState({ width, height });

  const content = (
    null
  );

  if (!resizable) {
    return (
      <div style={{ width: `${width}px`, height: `${height}px` }}>
        {content}
      </div>
    );
  }

  return (
    <Resizable
      size={{ width: size.width, height: size.height }}
      onResizeStop={(e, direction, ref, d) => {
        setSize({
          width: size.width + d.width,
          height: size.height + d.height,
        });
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      enable={{
        top: false,
        right: true,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: true,
        bottomLeft: false,
        topLeft: false,
      }}
      handleStyles={{
        right: {
          width: '8px',
          right: '-4px',
          cursor: 'ew-resize',
        },
        bottom: {
          height: '8px',
          bottom: '-4px',
          cursor: 'ns-resize',
        },
        bottomRight: {
          width: '16px',
          height: '16px',
          right: '-8px',
          bottom: '-8px',
          cursor: 'nwse-resize',
          zIndex: 10,
        },
      }}
      handleClasses={{
        right: 'hover:bg-[#164293]/20 transition-colors',
        bottom: 'hover:bg-[#164293]/20 transition-colors',
        bottomRight: 'hover:bg-[#164293]/30 transition-colors',
      }}
    >
      {content}
    </Resizable>
  );
};
