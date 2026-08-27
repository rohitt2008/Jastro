import { useState } from 'react';
import { useStore } from '../store/useStore';

export const HistoryPanel = () => {
  const { history, recoverElement } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-white border border-gray-200 shadow-lg px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
      >
        <span>History ({history.length})</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 w-80 bg-white border border-gray-200 shadow-xl rounded-lg flex flex-col max-h-[60vh]">
      <div className="p-3 border-b flex justify-between items-center bg-gray-50 rounded-t-lg">
        <h3 className="font-semibold text-gray-700 text-sm">Revision History</h3>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
      </div>
      <div className="p-3 overflow-y-auto flex-1 space-y-3">
        {history.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-4">No revisions yet.</p>
        ) : (
          [...history].reverse().map((rev) => (
            <div key={rev.id} className="border border-gray-100 p-2 rounded bg-gray-50 text-xs">
              <div className="flex justify-between items-start mb-1">
                <span className="font-semibold text-gray-700">{rev.elementId}</span>
                <span className="text-gray-400">{new Date(rev.timestamp).toLocaleTimeString()}</span>
              </div>
              <div className="text-gray-500 mb-2 flex justify-between">
                <span>Scope: {rev.viewportScope}</span>
                <span className="italic">{rev.type}</span>
              </div>
              <button 
                onClick={() => recoverElement(rev.elementId, rev.id)}
                className="w-full text-center bg-white border border-gray-200 text-gray-600 py-1 rounded hover:bg-gray-100 transition-colors"
              >
                Recover to this state
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
