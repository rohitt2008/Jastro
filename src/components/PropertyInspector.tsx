import React from 'react';
import { useStore } from '../store/useStore';
import { getResolvedStyle } from '../utils/styleUtils';

export const PropertyInspector = () => {
  const { selection, template, activeViewport, activeScope, updateElement } = useStore();

  if (selection.length !== 1) {
    return (
      <div className="text-gray-500 text-sm italic mt-4">
        {selection.length > 1 ? "Multiple elements selected. Select one to edit properties." : "Select an element to edit properties."}
      </div>
    );
  }

  const id = selection[0];
  const element = template.elements[id];
  const resolvedStyle = getResolvedStyle(element, activeViewport);

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateElement(id, { base: { content: e.target.value } }, 'manual_canvas');
  };

  const handleStyleChange = (property: string, value: string) => {
    // If scope is 'all', update base style. Otherwise update viewport override.
    if (activeScope === 'all') {
      updateElement(id, { 
        base: { ...element.base, style: { ...element.base.style, [property]: value } } 
      }, 'manual_canvas');
    } else {
      const overrides = { ...element.overrides };
      const scopeOverride = overrides[activeScope] || {};
      overrides[activeScope] = { ...scopeOverride, [property]: value };
      
      updateElement(id, { overrides }, 'manual_canvas');
    }
  };

  return (
    <div className="space-y-4 mt-4">
      {['text', 'button'].includes(element.type) && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Content</label>
          <textarea
            value={element.base.content || ''}
            onChange={handleContentChange}
            className="w-full border border-gray-300 rounded p-1.5 text-sm"
            rows={2}
          />
        </div>
      )}

      {element.type === 'image' && (
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            value={element.base.src || ''}
            onChange={(e) => updateElement(id, { base: { ...element.base, src: e.target.value } }, 'manual_canvas')}
            className="w-full border border-gray-300 rounded p-1.5 text-sm"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Color</label>
        <input
          type="color"
          value={(resolvedStyle.color as string) || '#000000'}
          onChange={(e) => handleStyleChange('color', e.target.value)}
          className="w-full border border-gray-300 rounded h-8"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Background Color</label>
        <input
          type="color"
          value={(resolvedStyle.backgroundColor as string) || '#ffffff'}
          onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
          className="w-full border border-gray-300 rounded h-8"
        />
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Padding</label>
        <input
          type="text"
          value={(resolvedStyle.padding as string) || ''}
          placeholder="e.g. 1rem 2rem"
          onChange={(e) => handleStyleChange('padding', e.target.value)}
          className="w-full border border-gray-300 rounded p-1.5 text-sm"
        />
      </div>
      
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Font Size</label>
        <input
          type="text"
          value={(resolvedStyle.fontSize as string) || ''}
          placeholder="e.g. 1.5rem"
          onChange={(e) => handleStyleChange('fontSize', e.target.value)}
          className="w-full border border-gray-300 rounded p-1.5 text-sm"
        />
      </div>
    </div>
  );
};
