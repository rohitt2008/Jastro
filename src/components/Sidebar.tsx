import React from 'react';
import { useStore } from '../store/useStore';
import { PropertyInspector } from './PropertyInspector';
import { CodeEditor } from './CodeEditor';

export const Sidebar = () => {
  const { selection, template } = useStore();

  return (
    <div className="w-80 border-l border-gray-200 bg-white flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Inspector</h2>
      </div>

      <div className="flex-1 p-4">
        {selection.length === 0 ? (
          <div className="text-gray-500 text-sm text-center mt-10">
            Select an element on the canvas to inspect and edit its properties.
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Elements</h3>
              <div className="flex flex-wrap gap-2">
                {selection.map(id => (
                  <span key={id} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {id} ({template.elements[id]?.type})
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Properties</h3>
              <PropertyInspector />
            </div>

            <CodeEditor />
            
            {/* AI Demo form will go here */}
            <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-medium text-purple-700 mb-2 flex items-center gap-2">
                ✨ AI Demo Edit
              </h3>
              <textarea 
                className="w-full text-sm border rounded-md p-2 mt-2 focus:ring-purple-500 focus:border-purple-500"
                rows={3}
                placeholder="e.g., 'Make it pop', 'Rewrite header'"
              />
              <button className="w-full mt-2 bg-purple-600 text-white py-1.5 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors">
                Generate Proposal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
