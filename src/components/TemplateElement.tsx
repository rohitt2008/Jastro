import React from 'react';
import { useStore } from '../store/useStore';
import { getResolvedStyle } from '../utils/styleUtils';
import clsx from 'clsx';

interface TemplateElementProps {
  id: string;
}

export const TemplateElement: React.FC<TemplateElementProps> = ({ id }) => {
  const { template, activeViewport, selection, selectElement, pendingAiProposals } = useStore();
  
  // If there's a pending AI proposal, we preview it, otherwise we use the actual state
  const elementData = pendingAiProposals[id] || template.elements[id];
  
  if (!elementData) return null;

  const isSelected = selection.includes(id);
  const resolvedStyle = getResolvedStyle(elementData, activeViewport);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Shift/Cmd/Ctrl click for additive selection
    const isAdditive = e.shiftKey || e.metaKey || e.ctrlKey;
    selectElement(id, isAdditive);
  };

  const commonProps = {
    onClick: handleClick,
    style: {
      ...resolvedStyle,
      outline: isSelected ? '2px solid #3b82f6' : undefined,
      outlineOffset: '-2px',
      cursor: 'pointer',
      position: 'relative' as const,
      boxShadow: pendingAiProposals[id] ? '0 0 0 2px #a855f7 inset' : undefined, // Visual Diff Highlight (purple)
    },
    'data-element-id': id,
  };

  switch (elementData.type) {
    case 'container':
      return (
        <div {...commonProps}>
          {elementData.children?.map(childId => (
            <TemplateElement key={childId} id={childId} />
          ))}
        </div>
      );
    
    case 'text':
      return (
        <div {...commonProps}>
          {elementData.base.content}
        </div>
      );
      
    case 'image':
      return (
        <img 
          {...commonProps} 
          src={elementData.base.src} 
          alt={elementData.base.content || "Image"} 
        />
      );
      
    case 'button':
      return (
        <button {...commonProps} onClick={(e) => { e.preventDefault(); handleClick(e); }}>
          {elementData.base.content}
        </button>
      );

    default:
      return null;
  }
};
