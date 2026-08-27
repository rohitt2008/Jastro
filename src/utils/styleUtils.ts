import type { ElementState, Viewport } from '../types';

export const getResolvedStyle = (element: ElementState, activeViewport: Viewport) => {
  const baseStyle = element.base.style || {};
  
  // Resolution order: Base -> Desktop -> Tablet -> Mobile
  // Since we don't have desktop first layout forced, we just apply the exact active viewport override on top of base.
  // The PDF says: "Base values apply across views. Desktop, tablet, or mobile overrides affect only that view."
  // So we just merge base and the specific active viewport override.
  
  const viewportOverride = element.overrides[activeViewport] || {};
  
  return {
    ...baseStyle,
    ...viewportOverride
  };
};
