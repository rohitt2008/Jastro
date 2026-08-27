# AI Usage

## Tools used
- AI Model: Gemini 3.1 Pro (via Antigravity IDE)
- Asked to: Generate the frontend architecture, state management patterns, React components, and boilerplate for the Scoped AI Template Editor.

## Interaction Examples

**Planning/Product Framing:**
Asked the model to generate a durable, typed JSON schema for a template editor with viewport scope and element-based modularity. The model proposed a Zustand store with `base` and `overrides[viewport]` which fit the assignment requirements perfectly.

**Implementation/Debugging:**
Asked the model to write the style resolution utility. The model correctly mapped how `activeViewport` overrides `base` styles without altering other viewports, ensuring the isolation rule.

## Rejected Suggestion
- **Suggestion:** The model initially suggested using TailwindCSS for rapid prototyping.
- **Reason:** System guidelines explicitly requested Vanilla CSS for flexibility unless Tailwind was specifically demanded.
- **Result:** Refactored the approach to use standard CSS modules and inline styles for dynamic overrides.

## Verification
- Code was verified by running `npm run dev` and manually exercising the viewport toggles to ensure styling changes only affected the active viewport scope.
- Checked that pending AI proposals appear visually before being committed to the store.

## Limitations
- **Limitation:** The AI lacks deep intrinsic understanding of visual aesthetics; it can write CSS but not guarantee it "looks premium" without explicit detailed prompting. Next time I would prompt it with specific hex codes, padding rules, and font systems (e.g. Google Fonts) up-front.
