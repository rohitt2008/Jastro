import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import type { ElementState } from '../types';

export const AiDemoForm = () => {
  const { selection, template, activeScope, setPendingProposals } = useStore();
  const [instruction, setInstruction] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (selection.length === 0) {
      setError('Please select at least one element.');
      return;
    }

    const proposals: Record<string, ElementState> = {};
    const text = instruction.toLowerCase().trim();

    // Deterministic Scenario Engine
    let matched = false;

    for (const id of selection) {
      const el = template.elements[id];
      if (!el) continue;
      
      const newEl = JSON.parse(JSON.stringify(el)) as ElementState;

      if (text.includes('make it pop') || text.includes('style change')) {
        matched = true;
        if (activeScope === 'all') {
          newEl.base.style = { ...newEl.base.style, color: '#ec4899', fontWeight: 'bold' };
        } else {
          const overrides = newEl.overrides[activeScope] || {};
          newEl.overrides[activeScope] = { ...overrides, color: '#ec4899', fontWeight: 'bold' };
        }
      } 
      else if (text.includes('rewrite') || text.includes('content rewrite')) {
        if (el.type === 'text' || el.type === 'button') {
          matched = true;
          newEl.base.content = "✨ Magic AI Content ✨";
        } else if (selection.length === 1) {
          setError(`Cannot rewrite content for a ${el.type} element.`);
          return;
        }
      }
      else if (text.includes('invalid') || text.includes('fail')) {
        setError('Safe failure example: Unsupported instruction or invalid state.');
        return;
      }
      
      if (matched) {
        proposals[id] = newEl;
      }
    }

    if (!matched && !error) {
      setError("No matching deterministic path. Try: 'Make it pop', 'Rewrite header', or 'Fail'");
      return;
    }

    if (Object.keys(proposals).length > 0) {
      setPendingProposals(proposals);
      setInstruction('');
    }
  };

  return (
    <div className="border-t border-gray-100 pt-4 mt-6">
      <h3 className="text-sm font-medium text-purple-700 mb-2 flex items-center gap-2">
        ✨ AI Demo Edit
      </h3>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          className="w-full text-sm border rounded-md p-2 mt-2 focus:ring-purple-500 focus:border-purple-500"
          rows={3}
          placeholder="e.g., 'Make it pop', 'Rewrite header', 'Fail'"
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        <button 
          type="submit"
          className="w-full mt-2 bg-purple-600 text-white py-1.5 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
        >
          Generate Proposal
        </button>
      </form>
      <div className="mt-2 text-xs text-gray-500">
        Scope: <span className="font-semibold">{activeScope}</span>
      </div>
    </div>
  );
};
