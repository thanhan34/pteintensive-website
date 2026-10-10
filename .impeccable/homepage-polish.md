# Homepage polish — October 10, 2026

Processed critique: `2026-10-10T16-18-04Z__app-page-tsx.md`.

Implemented source-level fixes for all six priority issues: readable mobile hero typography and wrapping; dark labels on orange hero/header CTAs; in-page course anchor with fixed-header offset; simpler benefits hierarchy with only the existing outer reduced-motion-aware reveal; permanently mounted FAQ panels with synchronized hidden/expanded state; BookOpen icon replacing the misleading play icon. Also fixed the benefits registration link from nonexistent `#register` to `/register`.

Kept existing imagery, factual claims, course data, section order, and cinematic/light identity. No dependencies added. Browser automation unavailable: do not treat these source fixes as visually verified. The critique remains open pending rendered mobile/desktop, keyboard, and assistive-technology review.

Validation: TypeScript and targeted ESLint passed; HTTP 200; course anchor exists; all ten FAQ controls have mounted targets; diff whitespace checks passed. Detector: one preserved hero-gradient warning, 47 incumbent/advisory findings, none in benefits or FAQ. Declared dark-text/orange endpoint contrasts previously calculated at 5.39:1–8.37:1, above 4.5:1; no rendered pixel measurement or production build performed.