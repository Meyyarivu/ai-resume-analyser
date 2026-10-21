# Codex Implementation Prompt --- AI Resume Analyzer UI Redesign

Repository: https://github.com/Meyyarivu/ai-resume-analyser\
Live app: https://ai-resume-analyser-qx8sl5h74-ai-project9.vercel.app/

Read the repository-root `DESIGN.md` completely before editing. It is
the source of truth for the redesign.

## Goal

Redesign the entire existing application in the **Apple Minimal Pro**
direction: light theme, calm neutral surfaces, refined typography,
restrained liquid-glass-inspired navigation and overlays, and smooth
purposeful transitions. Use Magic UI components selectively. The result
should feel polished and portfolio-ready, not like a generic AI
dashboard template.

## Required workflow

1.  Inspect the codebase, Next.js version, routes, package scripts,
    dependencies, current styles, components, PDF upload/parser, Groq
    API route, environment variable usage, and tests.
2.  If `DESIGN.md` is missing, create it from the agreed design
    specification before implementing the UI. If it exists, preserve its
    intent and use it as the source of truth.
3.  Summarize the current route/component map and identify any features
    that are not present. Do not invent functionality.
4.  Implement the design tokens and shared layout first, then redesign
    every existing route and state in scope.
5.  Check official current Magic UI docs and the existing project's
    conventions before installing components. Install only components
    used. Do not blindly replace the component system or add unnecessary
    dependencies.
6.  Preserve all current product behavior and API contracts.
7.  Run the actual lint, type-check, tests, and production build scripts
    from `package.json`. Fix regressions introduced by your changes.
8.  Report files changed, commands run and results, and any remaining
    issues.

## Visual requirements

-   Light theme only: warm off-white canvas, white content surfaces,
    near-black typography, subtle gray borders, and restrained blue
    accent.
-   Use the exact color, spacing, typography, radius, shadow, glass, and
    motion tokens defined in `DESIGN.md`.
-   Use glass sparingly for navigation, floating controls, menus, and
    overlays. Main content cards and analysis reports should remain
    readable on solid surfaces.
-   Use smooth transitions for navigation, dialogs, hover/press states,
    upload selection, and result reveal. Avoid large parallax, constant
    motion, excessive glow, or delayed interactions.
-   Consider Magic UI Blur Fade for section entrances, Shimmer Button
    for a single primary CTA, Number Ticker for real returned scores,
    and Border Beam only for an upload area if it improves usability.
-   Respect `prefers-reduced-motion`; provide fallback surfaces where
    backdrop blur is unsupported or reduced.
-   Ensure desktop, tablet, and mobile layouts work without horizontal
    overflow.

## Functional requirements

-   Keep all existing routes and working features.
-   Preserve the Groq server-side API route, model configuration,
    request/response shape, error handling, and environment variables.
-   Never expose the Groq key in client code or `NEXT_PUBLIC_*`.
-   Preserve PDF selection, file type/size validation, text extraction,
    job-description input, analysis request, and results rendering.
-   Do not replace actual API data with mock scores, fake history, fake
    testimonials, or invented metrics.
-   Clearly label ATS compatibility as an estimate and never promise
    hiring or ATS success.
-   Treat resume text as untrusted input. Do not log sensitive resume
    content or secrets unnecessarily.
-   Keep existing authentication, persistence, and deployment
    conventions intact.

## Implementation rules

-   Reuse existing components where sensible and keep React/Next.js
    server-client boundaries correct.
-   Avoid large unrelated refactors. Do not remove routes or business
    logic to make the UI easier.
-   Use semantic HTML, accessible labels, keyboard-operable upload
    controls, visible focus rings, WCAG AA contrast, and accessible
    async status/error messages.
-   Make buttons, inputs, dialogs, navigation, loading states, empty
    states, errors, and retry actions visually consistent.
-   Do not claim tests passed unless they were actually run. Separate
    pre-existing failures from regressions.

## Definition of done

The entire existing app follows `DESIGN.md`, all existing
resume-analysis workflows still work, the Groq key remains server-only,
mobile layouts are usable, reduced-motion/accessibility requirements are
respected, and the production build and available checks are reported
accurately.
