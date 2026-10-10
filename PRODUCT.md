# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The primary audience is Vietnamese-speaking prospective PTE Academic learners evaluating preparation courses and seeking a personalized study pathway or consultation. The user confirmed this audience and priority during initialization on October 10, 2026.

Staff-facing blog and content-management workflows are supporting features, not the primary public experience.

## Product Purpose

Help prospective learners understand PTE Intensive's courses, evaluate whether its preparation approach fits their needs, and request a personalized pathway or consultation. Prioritize clear course information and usable inquiry flows over expanding unrelated features.

## Positioning

Existing site copy emphasizes personalized study pathways, practical preparation strategies, teacher support, and support toward a learner's target score. Preserve those topics without treating marketing copy as independently verified evidence. A unique competitive claim has not been confirmed.

## Operating Context

- Public content is primarily Vietnamese; the root document declares `lang="vi"`.
- Existing public routes include courses, study pathways, teacher/organization information, guarantees, reviews, contact, registration, migration information, knowledge resources, and a blog.
- Visitors can explore preparation options and follow existing registration or contact links to request help.
- The repository includes authentication and staff administration/CMS functionality. Preserve existing permissions and content workflows.

## Capabilities and Constraints

- Preserve existing Vietnamese content, brand assets, and application functionality; the user explicitly confirmed these constraints.
- Extend the established application rather than replacing it with an unrelated product or introducing unconfirmed dependencies.
- The existing implementation uses Next.js App Router, TypeScript, React, Tailwind CSS, reusable Radix-based UI components, Firebase services, and MDX content. The package manifest and source code are authoritative for implementation details; older README version labels may be stale.
- Course discovery and requests for personalized pathways or consultations are the primary product priorities. Blog/CMS features support them.
- Existing application commands include `npm run dev`, `npm run build`, `npm run lint`, and `npm run typecheck`.
- Exact conversion targets, course pricing authority, guarantee eligibility, and independently validated outcome claims remain open. Do not invent them or silently change their meaning.

## Brand Commitments

- Preserve the PTE Intensive name, existing Vietnamese content, and existing logo and imagery.
- Respect the incumbent interface as the starting point for future UI work. Initialization does not authorize a redesign or rebrand.
- Maintain clear, practical language about preparation and learner support. Do not manufacture endorsements, outcomes, or certainty about exam results or migration eligibility.

## Evidence on Hand

- `app/page.tsx` defines the public homepage and educational-organization metadata.
- `app/components/HeroSection.tsx` contains current pathway, course, teacher, migration, and guarantee messaging plus registration and course links.
- `app/layout.tsx` contains the Vietnamese document language and shared application shell.
- Existing assets live under `public/images/`, including `logo`, `hero`, `courses`, `trainers`, `certificate`, `scores`, `reviews`, `studentreviews`, and `students`.
- The presence of these assets is not proof of publication consent, current accuracy, or substantiation of any specific result. Reuse existing approved content carefully; never invent students, testimonials, certifications, success rates, or pricing.

## Product Principles

1. Make course evaluation and requests for a personalized pathway or consultation straightforward.
2. Preserve Vietnamese comprehension, existing product terminology, and continuity across public pages.
3. Keep claims grounded in real, approved content and distinguish preparation goals from guaranteed outcomes.
4. Preserve staff content workflows, authentication boundaries, and existing public functionality.
5. Improve the incumbent experience incrementally; major product or brand changes require explicit direction.

## Open Decisions

- No product-specific accessibility conformance target was confirmed during initialization; do not claim certification or compliance.
- No new visual direction, deployment commitment, competitive benchmark, or performance target was established.