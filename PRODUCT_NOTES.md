# Product Notes

## Definitions
- **Primary User**: A small-business owner adapting a website without deep coding knowledge.
- **Safe Completed Template Edit**: An edit (manual or AI) that affects only intended elements and viewports, is recorded in history, and can be isolated and reverted without damaging other work.
- **Element / Selection**: Elements are independent nodes tracked by stable IDs. Group selection is a collection of these IDs. 
- **Committed Step**: Any applied edit that is finalized and saved into the history array as a revision.
- **Viewport Scope**: Modifications strictly apply to either `base` (all views) or a specific override dictionary (`desktop`, `tablet`, `mobile`).
- **Editable Property Boundary**: `content`, `style`, and semantic attributes like `href` and `src`.

## State & Resolution
- Canvas and code editing share the exact same Zustand store (`template`). 
- Base values are merged dynamically with active viewport overrides at runtime in `TemplateElement.tsx` using `getResolvedStyle`.
- **Persistence**: The Zustand store uses `persist` middleware to save the `template` and `history` to `localStorage`. A deliberate 'Reset' action is available in the top bar to clear this state.

## Testing
- Implemented focused automated tests via Vitest testing the core Zustand reducer logic for:
  - Additive selection logic.
  - View-specific isolation (overrides do not pollute base).
  - Canvas-code state consistency (edits create history entries).
  - Independent element recovery.

## Deterministic AI & Scope Validation
- The `AiDemoForm` acts as a static rule engine mapping strings to state patches.
- If scope is `mobile`, the engine strictly writes into `overrides.mobile`.
- Rejections delete the pending state; partial acceptance is inherently supported by iterating over proposals individually.

## Recovery Policy
- History is tracked linearly. A recovery action reads the `previousState` stored in a specific revision and dispatches an update to revert that specific element to that exact prior state. 
- This creates a *new* revision (type: `recovery`) to maintain a clean append-only log.

## Added Capability: Visual Diff Highlights
- **Problem**: When users generate AI proposals, they might not realize which elements are about to change if the canvas is crowded.
- **Solution**: Elements with pending AI proposals are highlighted with a purple inset shadow on the canvas.
- **Testing**: A/B test with novice users comparing the time it takes them to identify proposed changes vs a baseline editor without highlights.

## Cuts & Assumptions
- **Cuts**: Removed structural dragging/dropping (reordering) due to time constraints; assumed standard parent-child array edits via code editor suffice for now.
- **Assumptions**: Desktop scales to `100%` rather than fixed `1440px` to allow fluid browser previewing.

## Next Priorities
1. **Drag-and-Drop Canvas Reordering**: Let users move elements structurally on the canvas.
2. **True Marquee Selection**: Implement mouse-drag marquee boxes to select multiple elements intuitively.
