import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from './useStore';

describe('Scoped AI Template Editor Store', () => {
  beforeEach(() => {
    useStore.getState().reset();
  });

  it('Selection: validates additive selection', () => {
    const store = useStore.getState();
    store.selectElement('header');
    expect(useStore.getState().selection).toEqual(['header']);

    useStore.getState().selectElement('hero', true);
    expect(useStore.getState().selection).toEqual(['header', 'hero']);

    useStore.getState().selectElement('header', true);
    expect(useStore.getState().selection).toEqual(['hero']);
  });

  it('View-specific isolation: verifies overrides do not pollute base', () => {
    const store = useStore.getState();
    
    // Set active scope to mobile
    store.setActiveScope('mobile');
    
    // Update hero title font size in mobile
    store.updateElement('hero-title', {
      overrides: {
        mobile: { fontSize: '1.5rem' }
      }
    }, 'manual_canvas');

    const updatedElement = useStore.getState().template.elements['hero-title'];
    expect(updatedElement.overrides.mobile?.fontSize).toBe('1.5rem');
    expect(updatedElement.overrides.desktop).toBeUndefined();
    expect(updatedElement.base.style?.fontSize).not.toBe('1.5rem'); // Base remains untouched
  });

  it('Canvas-code state consistency: applying a manual edit creates a history entry', () => {
    const store = useStore.getState();
    const initialHistoryLength = store.history.length;

    store.updateElement('logo', {
      base: { content: 'New Logo Text' }
    }, 'manual_code');

    const nextState = useStore.getState();
    expect(nextState.history.length).toBe(initialHistoryLength + 1);
    expect(nextState.history[nextState.history.length - 1].elementId).toBe('logo');
    expect(nextState.template.elements['logo'].base.content).toBe('New Logo Text');
  });

  it('Independent element recovery: restoring one element does not revert another', () => {
    const store = useStore.getState();
    
    // 1. Edit Element A
    store.updateElement('feature-1', { base: { content: 'Feature 1 Edited' } }, 'manual_canvas');
    // 2. Edit Element B
    store.updateElement('feature-2', { base: { content: 'Feature 2 Edited' } }, 'manual_canvas');
    
    const stateAfterEdits = useStore.getState();
    expect(stateAfterEdits.template.elements['feature-1'].base.content).toBe('Feature 1 Edited');
    expect(stateAfterEdits.template.elements['feature-2'].base.content).toBe('Feature 2 Edited');
    
    // 3. Find revision for Element A and recover it
    const revA = stateAfterEdits.history.find(r => r.elementId === 'feature-1');
    expect(revA).toBeDefined();
    
    useStore.getState().recoverElement('feature-1', revA!.id);
    
    const finalState = useStore.getState();
    // Element A should be reverted to original
    expect(finalState.template.elements['feature-1'].base.content).toBe('Safe Edits: Your layouts are isolated by viewport.');
    // Element B should REMAIN edited
    expect(finalState.template.elements['feature-2'].base.content).toBe('Feature 2 Edited');
  });
});
