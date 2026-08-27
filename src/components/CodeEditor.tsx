import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

export const CodeEditor = () => {
  const { selection, template, updateElement } = useStore();
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const selectedId = selection.length === 1 ? selection[0] : null;
  const element = selectedId ? template.elements[selectedId] : null;

  // Sync state to local string
  useEffect(() => {
    if (element) {
      // Omit things we don't want them editing easily like ID or children, or we can just let them edit everything
      // but they can break it if they change ID.
      // Let's just serialize base and overrides.
      const editableState = {
        base: element.base,
        overrides: element.overrides
      };
      setCode(JSON.stringify(editableState, null, 2));
      setError(null);
    } else {
      setCode('');
      setError(null);
    }
  }, [element]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    setError(null);
  };

  const handleApply = () => {
    if (!selectedId) return;

    try {
      const parsed = JSON.parse(code);
      
      // Basic validation
      if (!parsed.base && !parsed.overrides) {
        throw new Error('Must contain base or overrides.');
      }

      updateElement(selectedId, {
        base: parsed.base,
        overrides: parsed.overrides
      }, 'manual_code');
      
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON');
    }
  };

  if (!selectedId) {
    return null;
  }

  return (
    <div className="mt-6 border-t border-gray-100 pt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Code Editor</h3>
      <textarea
        value={code}
        onChange={handleCodeChange}
        className="w-full font-mono text-xs border rounded p-2 bg-gray-50 text-gray-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
        rows={8}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      <button 
        onClick={handleApply}
        className="mt-2 w-full bg-gray-100 text-gray-700 hover:bg-gray-200 py-1.5 rounded text-sm font-medium transition-colors"
      >
        Apply Code Edits
      </button>
    </div>
  );
};
