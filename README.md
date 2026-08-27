# Scoped AI Template Editor

A browser-based Website Builder prototype that allows safe, scoped, deterministic AI edits. 
Built as part of an exercise to demonstrate state management, scope isolation (viewports), and revision history in a visual editor context.

## Setup & Run

1. `npm install`
2. `npm run dev`

## Chosen Template

The template used is an original, simple responsive "Acme Corp" landing page created specifically for this assignment. It features a Header, Hero Section, Features grid, and a Footer. It is stored inside `src/store/defaultTemplate.ts`.

## Architecture & Requirement Mapping

- **Framework**: React + TypeScript (Vite)
- **State Management**: Zustand
- **Styling**: Vanilla CSS / CSS Modules
- **Canonical Model**: JSON-serializable `TemplateData` in Zustand.
- **Viewport Isolation**: `TemplateElement` renders using `getResolvedStyle` which merges `base` with `overrides[activeViewport]`.
- **Canvas/Code Consistency**: Both the property inspector and code editor fire the same `updateElement` action which patches the central Zustand store.
- **AI Demo Engine**: A simple deterministic matcher in `AiDemoForm.tsx`.

## Demo Examples

Select an element (e.g. `hero-title` or `hero-cta`), and enter one of these exact phrases into the AI Demo input:
1. `Make it pop` -> Modifies styling to pink & bold for the selected element in the active viewport.
2. `Rewrite header` -> Rewrites content to "✨ Magic AI Content ✨".
3. `Fail` -> Safe failure example showing unsupported instructions.
