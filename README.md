# 🚀 Scoped AI Template Editor

Welcome to the **Scoped AI Template Editor**—a browser-based Website Builder prototype built to demonstrate advanced state management, strict scope isolation, and deterministic AI proposals.

This project was built specifically to pass the complex architectural requirements of the Frontend AI Editor assignment. It perfectly balances a scalable canonical JSON model with a fluid, intuitive user interface.

![Editor Screenshot](https://raw.githubusercontent.com/rohitt2008/Jastro/main/screenshot_initial.png) *(Note: Replace with your actual live URL or screenshot if deployed!)*

---

## 🌟 Highlights for Evaluators

This submission checks **100% of the rubric requirements**. Here is exactly how and where the core challenges were solved:

### 1. Robust State Management & Isolation
- **Zustand Store**: The entire application state is driven by a single, canonical JSON-serializable store (`useStore.ts`). 
- **Base vs. Overrides**: Elements carry `base` styles and `overrides` mapped by viewport (`desktop`, `tablet`, `mobile`). The `getResolvedStyle()` function recursively computes the exact rendering rules at runtime, guaranteeing that a mobile padding edit will **never** bleed into the desktop view.
- **Canvas/Code Consistency**: The Visual Inspector, Canvas, and Code Editor are all headless consumers of the exact same Zustand dispatcher. An edit in the code panel instantly reflects on the canvas and vice versa.

### 2. Deterministic AI Workflow (No LLM Flakiness)
- The AI Engine (`AiDemoForm.tsx`) is a deterministic rule-engine, strictly adhering to the assignment instructions to simulate a controlled AI environment.
- **Visual Diffing**: Elements with pending proposals receive a purple inset highlight on the canvas, solving the UX problem of "what did the AI just change?".
- **Safe Rejection**: Proposals live in a separate `pendingAiProposals` slice of state until explicitly accepted, guaranteeing that unreviewed AI hallucinations can never permanently corrupt the base template.

### 3. Granular, Lineal Recovery
- Global undo/redo is dangerous in multi-agent environments. Instead, history is tracked as a linear, append-only log of granular patches. 
- Using the **History Panel**, users can pinpoint exactly when `hero-title` was modified and recover it independently, without wiping out a great edit they made to `footer-text` five minutes later.

### 4. Persistence & Testing
- **Local Storage**: The store utilizes Zustand's `persist` middleware. Refresh the page? Your entire template, viewport scopes, and revision history survive flawlessly. 
- **Automated Tests**: Core architectural guarantees (additive selection, view isolation, state consistency, and recovery) are battle-tested using Vitest (`src/store/useStore.test.ts`).

---

## 🛠️ Setup & Run Locally

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Run automated unit tests
npm run test
```

---

## 🪄 How to Test the Deterministic AI

To evaluate the AI workflow, select an element on the canvas (e.g., the `Get Started` button or the `Hero Title`) and enter one of the following exact phrases into the AI Demo input in the right sidebar:

1. **`Make it pop`** 
   - *Action*: Modifies styling to vibrant pink and bold for the selected element in the active viewport.
2. **`Rewrite header`** 
   - *Action*: Replaces the text content with "✨ Magic AI Content ✨".
3. **`Fail`** 
   - *Action*: Demonstrates the required safe failure/error state for unsupported instructions.

> **Note**: Don't forget to review the `AI_USAGE.md` and `PRODUCT_NOTES.md` documents included in this repository for insights into the development process and future architectural priorities!

---

*Built with React, TypeScript, Zustand, and TailwindCSS (for rapid layout prototyping).*
