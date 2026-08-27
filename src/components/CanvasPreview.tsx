import React from 'react';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

export const CanvasPreview = () => {
  const { activeViewport } = useStore();

  const getViewportWidth = () => {
    switch (activeViewport) {
      case 'desktop': return '100%'; // Will scale to max available
      case 'tablet': return '768px';
      case 'mobile': return '375px';
      default: return '100%';
    }
  };

  return (
    <div className="flex-1 bg-gray-100 overflow-auto flex justify-center py-8">
      <div 
        className={clsx(
          "bg-white shadow-xl transition-all duration-300 ease-in-out origin-top",
          activeViewport === 'desktop' ? 'w-full max-w-[1440px]' : ''
        )}
        style={{ width: activeViewport !== 'desktop' ? getViewportWidth() : undefined, minHeight: '800px' }}
      >
        <div className="w-full h-full p-8 flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 m-8 w-auto">
          Canvas Content will render here
        </div>
      </div>
    </div>
  );
};
