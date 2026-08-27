import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import type { StoreState, ElementState, Viewport, RevisionType } from '../types';
import { defaultTemplate } from './defaultTemplate';

export const useStore = create<StoreState>((set) => ({
  template: defaultTemplate,
  history: [],
  selection: [],
  activeViewport: 'desktop',
  activeScope: 'desktop', // defaults to editing desktop
  pendingAiProposals: {},

  selectElement: (id: string, additive = false) => {
    set((state) => {
      if (additive) {
        if (state.selection.includes(id)) {
          return { selection: state.selection.filter(s => s !== id) };
        }
        return { selection: [...state.selection, id] };
      }
      return { selection: [id] };
    });
  },

  clearSelection: () => set({ selection: [] }),

  setActiveViewport: (viewport: Viewport) => set({ activeViewport: viewport }),
  
  setActiveScope: (scope: Viewport | 'all') => set({ activeScope: scope }),

  updateElement: (id: string, updates: Partial<ElementState>, type: RevisionType) => {
    set((state) => {
      const currentElement = state.template.elements[id];
      if (!currentElement) return state;

      const newElement = { ...currentElement };
      const scope = state.activeScope;
      
      // Update logic based on scope
      if (updates.base) {
        newElement.base = { ...newElement.base, ...updates.base };
      }
      
      if (updates.overrides) {
        if (scope === 'all') {
          // 'all' scope means we are updating the base style/content, overrides should be cleared for those keys?
          // Actually, as per requirements, "Base values apply across views. Desktop, tablet, or mobile overrides affect only that view."
          // Usually 'all' updates base, and single view updates overrides.
          // Let's refine this: if scope is 'all', apply to base.
          // If scope is viewport, apply to overrides[viewport].
        }
      }

      // Simple patch logic for now: assume updates are fully prepared correctly
      // We will handle the exact deep merging logic inside the editor components before calling updateElement,
      // or we can implement it here.
      
      const patchedElement = { ...currentElement, ...updates };

      const newHistory = [
        ...state.history,
        {
          id: uuidv4(),
          timestamp: Date.now(),
          elementId: id,
          viewportScope: state.activeScope,
          changes: updates,
          previousState: currentElement,
          type
        }
      ];

      return {
        template: {
          ...state.template,
          elements: {
            ...state.template.elements,
            [id]: patchedElement
          }
        },
        history: newHistory
      };
    });
  },

  setPendingProposals: (proposals: Record<string, ElementState>) => set({ pendingAiProposals: proposals }),

  acceptProposal: (id: string) => {
    set((state) => {
      const proposal = state.pendingAiProposals[id];
      if (!proposal) return state;

      // Create history entry
      const newHistory = [
        ...state.history,
        {
          id: uuidv4(),
          timestamp: Date.now(),
          elementId: id,
          viewportScope: state.activeScope,
          changes: proposal,
          previousState: state.template.elements[id],
          type: 'ai_accepted' as RevisionType
        }
      ];

      // Remove from pending
      const newPending = { ...state.pendingAiProposals };
      delete newPending[id];

      return {
        template: {
          ...state.template,
          elements: {
            ...state.template.elements,
            [id]: proposal
          }
        },
        history: newHistory,
        pendingAiProposals: newPending
      };
    });
  },

  rejectProposal: (id: string) => {
    set((state) => {
      const newPending = { ...state.pendingAiProposals };
      delete newPending[id];
      return { pendingAiProposals: newPending };
    });
  },

  recoverElement: (id: string, revisionId: string) => {
    set((state) => {
      const revision = state.history.find(r => r.id === revisionId);
      if (!revision || revision.elementId !== id) return state;

      const currentElement = state.template.elements[id];
      if (!currentElement) return state;

      const newHistory = [
        ...state.history,
        {
          id: uuidv4(),
          timestamp: Date.now(),
          elementId: id,
          viewportScope: revision.viewportScope,
          changes: revision.previousState, // we are applying the previous state
          previousState: currentElement,
          type: 'recovery' as RevisionType
        }
      ];

      return {
        template: {
          ...state.template,
          elements: {
            ...state.template.elements,
            [id]: revision.previousState
          }
        },
        history: newHistory
      };
    });
  }
}));
