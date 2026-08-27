import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { CanvasPreview } from './CanvasPreview';
import { HistoryPanel } from './HistoryPanel';

export const EditorShell = () => {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-gray-50 text-gray-900">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <CanvasPreview />
        <Sidebar />
      </div>
      <HistoryPanel />
    </div>
  );
};
