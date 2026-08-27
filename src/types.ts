export type Viewport = 'desktop' | 'tablet' | 'mobile';

export interface BaseStyle {
  [key: string]: string | number;
}

export interface ElementOverrides {
  desktop?: BaseStyle;
  tablet?: BaseStyle;
  mobile?: BaseStyle;
}

export interface ElementState {
  id: string;
  type: 'container' | 'text' | 'image' | 'button';
  base: {
    content?: string;
    style?: BaseStyle;
    src?: string; // for image
    href?: string; // for button
  };
  overrides: ElementOverrides;
  children?: string[]; // IDs of child elements
}

export type RevisionType = 'manual_canvas' | 'manual_code' | 'ai_accepted' | 'recovery';

export interface TemplateRevision {
  id: string;
  timestamp: number;
  elementId: string;
  viewportScope: Viewport | 'all';
  changes: Partial<ElementState>; // The patched state
  previousState: ElementState; // Full previous state for easy recovery
  type: RevisionType;
}

export interface TemplateData {
  id: string;
  name: string;
  elements: Record<string, ElementState>;
  rootElementId: string;
}

export interface EditorState {
  template: TemplateData;
  history: TemplateRevision[];
  selection: string[]; // selected element IDs
  activeViewport: Viewport;
  activeScope: Viewport | 'all';
  pendingAiProposals: Record<string, ElementState>;
}

export interface EditorActions {
  // Selection
  selectElement: (id: string, additive?: boolean) => void;
  clearSelection: () => void;
  
  // Viewport
  setActiveViewport: (viewport: Viewport) => void;
  setActiveScope: (scope: Viewport | 'all') => void;
  
  // Edits
  updateElement: (id: string, updates: Partial<ElementState>, type: RevisionType) => void;
  
  // AI Demo
  setPendingProposals: (proposals: Record<string, ElementState>) => void;
  acceptProposal: (id: string) => void;
  rejectProposal: (id: string) => void;
  
  // History
  recoverElement: (id: string, revisionId: string) => void;
  
  // App
  reset: () => void;
}

export type StoreState = EditorState & EditorActions;
