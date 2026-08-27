import { useStore } from '../store/useStore';
import { Monitor, Tablet, Smartphone, Undo, Redo, Play, Trash2 } from 'lucide-react';
import clsx from 'clsx';
import type { Viewport } from '../types';

export const Topbar = () => {
  const { activeViewport, setActiveViewport, activeScope, setActiveScope, reset } = useStore();

  const handleViewportChange = (viewport: Viewport) => {
    setActiveViewport(viewport);
    setActiveScope(viewport); // Sync scope with viewport for simplicity initially, user can change later if needed
  };

  return (
    <div className="h-14 border-b border-gray-200 bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-lg text-gray-800">Scoped AI Editor</h1>
      </div>

      <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md">
        <button
          onClick={() => handleViewportChange('desktop')}
          className={clsx('p-2 rounded', activeViewport === 'desktop' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700')}
          title="Desktop (1440px)"
        >
          <Monitor size={18} />
        </button>
        <button
          onClick={() => handleViewportChange('tablet')}
          className={clsx('p-2 rounded', activeViewport === 'tablet' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700')}
          title="Tablet (768px)"
        >
          <Tablet size={18} />
        </button>
        <button
          onClick={() => handleViewportChange('mobile')}
          className={clsx('p-2 rounded', activeViewport === 'mobile' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700')}
          title="Mobile (375px)"
        >
          <Smartphone size={18} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 mr-4 text-sm border-r pr-4">
          <span className="text-gray-500">Scope:</span>
          <select 
            value={activeScope} 
            onChange={(e) => setActiveScope(e.target.value as Viewport | 'all')}
            className="border-none bg-transparent font-medium focus:ring-0 cursor-pointer"
          >
            <option value="all">All Viewports</option>
            <option value="desktop">Desktop Only</option>
            <option value="tablet">Tablet Only</option>
            <option value="mobile">Mobile Only</option>
          </select>
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50" disabled>
          <Undo size={18} />
        </button>
        <button 
          onClick={() => {
            if (window.confirm("Are you sure you want to reset the template to its initial state? This will clear all history and persistence.")) {
              reset();
            }
          }}
          className="p-2 text-red-500 hover:text-red-700 bg-red-50 rounded" 
          title="Reset Template"
        >
          <Trash2 size={18} />
        </button>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-blue-700 ml-2">
          <Play size={16} />
          Preview
        </button>
      </div>
    </div>
  );
};
