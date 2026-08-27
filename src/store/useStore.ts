import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { StoreState, ElementState, Viewport, RevisionType } from '../types';
import { defaultTemplate } from './defaultTemplate';

const initialState = {
  template: defaultTemplate,
  history: [],
  selection: [],
  activeViewport: 'desktop' as Viewport,
  activeScope: 'desktop' as Viewport,
  pendingAiProposals: {},
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      ...initialState,

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
          
          if (updates.base) {
            newElement.base = { ...newElement.base, ...updates.base };
          }
          
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
              changes: revision.previousState, 
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
      },

      reset: () => set(initialState)
    }),
    {
      name: 'jastro-editor-storage',
      partialize: (state) => ({ 
        template: state.template,
        history: state.history,
        // We do not persist selection or active viewport/pending states to ensure clean fresh loads
      }),
    }
  )
);
