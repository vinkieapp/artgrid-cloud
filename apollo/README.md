# Artgrid Studio

A public SSR pilot with two fictional, programmed guides. Apollo teaches drawing and painting the Seven Wonders through art, architecture and conceptual engineering. Athena offers prepared history and cultural context. Intended lesson audience: ages 8–18, with accessible foundations and optional deeper challenges. This is not an age-verification system or child-privacy certification.

## Run and test

Node 22 or newer. `npm start` starts the SSR server; `npm test` runs the source, state, security, media and narration tests. No runtime packages, database, accounts, credentials or external AI service are required. Existing Render service uses repository subdirectory `apollo`, branch `apollo-guide-preview`, build `npm test --prefix apollo`, start `npm start --prefix apollo`, health `/health`. Do not change the main portfolio branch when updating this pilot.

## Guided lessons

Seven themes: Great Wall, Petra, Colosseum, Chichén Itzá, Machu Picchu, Taj Mahal and Christ the Redeemer. Each has five bilingual drawing/painting steps, pencil/crayon/washable-water-paint guidance, an optional tip and an optional perspective, proportion, shading or colour challenge. The examples are simplified artistic interpretations, not accurate construction plans. `public/wonder-lessons.mjs` holds lesson text; `public/demonstrations.mjs` holds original native SVG drawings.

Athena retains seven researched, culturally respectful EN/FR entries and source links. Her history guide is not a free-text or live-AI chatbot. Guide switching preserves each activity's choices only while the page remains open. Refresh resets progress. Direct links: `?guide=apollo`, `?guide=athena`, and optional `&lang=fr`.

## Visual animation

Apollo and his cloud float as a unit using the main site's Colosseum bob, rotation and scale timing, with bounded horizontal drift to keep the guide visible. Visual animation is on by default. Current drawing stages play once automatically when selected; Replay, drawing Pause/Resume and a static Finished example remain available. Global Pause freezes the guide and current drawing. Reduced-motion settings produce static visuals. Unsupported SVG animation shows a readable static example. Lesson controls remain stationary.

## Optional prepared voices

Listen requires an explicit tap. No microphone, autoplay speech, voice upload or live voice service. Distinct synthetic character voices read fixed published scripts. Language-wide same-origin MP3 bundles use short reusable segments and byte-range responses for Safari. Voice Pause/Resume retains position; Stop, Mute, activity changes and hiding/leaving the page cancel playback. Device-local language-matched synthesis is a fallback; unknown/remote voices are not selected. Voice credits/licences are public at `/audio/CREDITS.txt`. Generation scripts are offline build tooling, not visitor endpoints. Physical iPhone audibility requires device confirmation.

## Privacy, accessibility and limits

No free text, child names/ages, uploads, camera, microphone, location, cookies, cross-session storage, analytics, ads or shopping within the guide. Hosting processes IP/access/security data and audio file/range requests; ranges can reveal audio positions. No claim of zero customer data or universal legal compliance. Keep `noindex` during pilot review. Adult supervision and a jurisdiction-specific child-safety/privacy assessment are recommended before broader deployment.

Keyboard controls, clear focus, bilingual labels, status announcements, reduced motion and stationary controls are included. Without JavaScript, one complete Great Wall lesson is available in English/French, not all seven interactive themes. Optional `/learn` integration prefixes assets; standalone deployment is the currently used setup.

Static SVG atlases verify artwork, not browser animation. Browser and physical-device QA remain separate from automated tests.
