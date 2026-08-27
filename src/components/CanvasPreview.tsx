import React from 'react';
import { useStore } from '../store/useStore';
import clsx from 'clsx';
import { TemplateElement } from './TemplateElement';

export const CanvasPreview = () => {
  const { activeViewport, template, clearSelection } = useStore();

  const getViewportWidth = () => {
    switch (activeViewport) {
      case 'desktop': return '100%';
      case 'tablet': return '768px';
      case 'mobile': return '375px';
      default: return '100%';
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    // If the click reaches the canvas background, clear selection
    if (e.target === e.currentTarget) {
      clearSelection();
    }
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-auto flex justify-center py-8" onClick={handleCanvasClick}>
      <div 
        className={clsx(
          "bg-white shadow-xl transition-all duration-300 ease-in-out origin-top",
          activeViewport === 'desktop' ? 'w-full max-w-[1440px]' : ''
        )}
        style={{ width: activeViewport !== 'desktop' ? getViewportWidth() : undefined, minHeight: '800px' }}
      >
        <TemplateElement id={template.rootElementId} />
      </div>
    </div>
  );
};
