# ARTGRID Little Studio — Apollo art guide prototype

Prepared for a standalone public pilot deployment. This repository does not itself prove deployment or legal compliance.

## Run
Requires Node 22 or later. No runtime dependencies or API keys.

    npm start

Open http://localhost:3000 (or ?lang=fr). Run `npm test` for the 12 automated tests.

## What is built
- Apollo: gently animated illustrated adult Greek-inspired artist with wavy hair, a draped tunic, palette and brush, explicitly labelled programmed/prepared, not a human or live AI.
- Three complete five-step lessons in English and French: Cloud Garden, Ocean Rhythms, Castle of Shapes.
- Pencil, crayon and washable water-based paint adaptations.
- Back, help, repeat, optional break, resume, end/reset and animation pause.
- Language switching preserves current lesson position. No score, streak, emotional dependency or sales prompts.
- Prepared content generated into HTML on each server request; browser enhances it with memory-only state.
- Without JavaScript the full Cloud Garden lesson is readable in EN/FR; other themes require JavaScript in this prototype.
- Responsive CSS, labelled controls, focus states, reduced-motion support. Actual browser/mobile/screen-reader QA remains pending.

## Data boundaries
No user accounts, free-text input, uploads, voice/camera/location access, external fonts, analytics, advertising, AI calls or persistent browser storage. Choices stay in page memory and reset on refresh/end lesson; language and animation preferences are retained only for the current open page. No server-side customer database or chat transcript.

Client CSP blocks network connections, frames and form submissions. Public serving is allowlisted to CSS and the two browser modules. There is no shop or checkout in this guide.

Hosting still processes requests and may retain IP/access/security logs. This design is NOT a claim of zero personal-data processing. Before publication review host logging/retention, vendor agreements, applicable child privacy obligations, parent-facing information, accessibility and age-appropriate content with qualified reviewers. Do not add telemetry, AI, uploads, accounts or shopping without reassessing those boundaries.

## Optional integration with existing ARTGRID SSR app
Keep this complete folder outside the public asset root. `integration.mjs` exports `handleArtGuide(request)`, which returns a Response for /learn and /learn/* or null elsewhere. In the existing server, call it before `website.handle(request)` and use its response if non-null. It prefixes static paths to /learn. No existing repository files were changed by this package.

Keep existing open-ended AI chat disabled. This prototype does not change or certify the earlier commerce backend. No Render resource, GitHub publication, DNS change or charge was made.

## Verification
- 12 automated Node tests pass (18 full lesson/theme/material/language flows, state controls, SSR/fallback, asset allowlist, CSP and privacy source checks).
- Additional DOM run using the existing workspace's linkedom passed theme/material selection, French switching mid-lesson, break/resume, cancel/end, animation pause and reset.
- Real browser screenshot attempt failed because the execution sandbox denied Chromium's socket creation. No claim of browser visual, mobile or screen-reader testing.
- Included PNG is a separately rendered design illustration using the prototype character/content. It is labelled NOT A BROWSER SCREENSHOT; exact fonts/layout may differ on device.
- Independent focused safety/UX source review found no blocker for prototype delivery. Not a production safety certification.

## Design preview
preview/ARTGRID-Apollo-art-guide-design.png shows the Cloud Garden shading step. Source SVG is generated inline by public/guide.mjs. Prepared lesson text and colours can be edited there and in public/style.css.

## Standalone Render pilot
Deploy only this apollo directory on branch apollo-guide-preview, not main. Build from repo root with npm test --prefix apollo; start with npm start --prefix apollo. Health check: /health. No disk, database, API keys or build dependencies. Node 24.19.0 is the tested runtime. No telemetry or visitor-specific application logs. Hosting technical logs may still exist; retention is not independently verified. Keep noindex while pilot review continues.


## Cloud atelier redesign
Apollo is now a semi-realistic illustrated adult Greek artist, generated from the owner’s visual references, with ivory/gold/lavender clothing, palette and brush. A separately generated cloud kingdom background and CSS cloud veils create depth. Apollo glides gently; a tightly clipped matching eyelid frame provides one blink every 6.2 seconds. Lesson controls do not move. Pause disables all scene animation; reduced-motion forces a still, open-eyed pose. All image files are local WebP assets, served by an explicit allowlist. No external image or AI calls are made at runtime.

Generated image assets: public/images/apollo-open.webp, apollo-blink.webp, cloud-kingdom.webp. No human interaction or sentience is implied; existing programmed-guide disclosure and hosting privacy notice remain. Browser-device visual verification is not established by source tests.

## Two distinct guides
Apollo uses the approved animated-film face and jeans outfit. He is the fictional artist, architect and engineer; his three curated EN/FR drawing activities include imagined architecture and a conceptual bridge/triangles drawing, not a construction plan. Athena wears the approved lavender jacket and jeans with owl pendant. She is the fictional historian and anthropologist, offering seven researched Wonders with preset dates, history, living cultures and reflection questions in EN/FR. Sources are linked and labelled external. Neither claims professional credentials.

Guide switching preserves each activity’s separate choices in page memory. No new runtime services, AI, commerce, storage or tracking. Pause and reduced motion cover both characters. 13 automated tests verify guide selection, 56 Wonder-language-question branches and existing art flows, source links, asset serving and privacy boundaries. Actual mobile/browser visual QA is separate.

## Optional voices
Listen reads only the authored current guidance after a user tap. Stop and Mute cancel playback; changing guides, language or activity, hiding/leaving the page also cancels speech. No autoplay or microphone. Only speechSynthesis voices with localService === true and a matching language are permitted; remote and unknown voices are never selected. Two local voices are assigned separately when available, otherwise both guides share one, as disclosed in the UI. If no matching local voice exists, a localized message explains the limitation; no network fallback. Real device voice availability and playback require browser testing. References: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice/localService and https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/voiceschanged_event .
