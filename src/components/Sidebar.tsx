import { useStore } from '../store/useStore';
import { PropertyInspector } from './PropertyInspector';
import { CodeEditor } from './CodeEditor';
import { AiDemoForm } from './AiDemoForm';
import { ProposalReview } from './ProposalReview';

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
            
            <AiDemoForm />
            
            <ProposalReview />
          </div>
        )}
      </div>
    </div>
  );
};
