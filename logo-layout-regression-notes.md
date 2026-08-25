# GLORY Header Logo Regression — 2026-08-25

The reported Vercel screenshot was reproduced at the source level: the official wordmark was referenced through a relative `/manus-storage/...` path. That path resolves in the managed development preview but is not served by the external Vercel deployment; its failed image fallback exposes truncated alt text in the upper-left header.

The correction changes the public wordmark source to the existing absolute GLORY asset host. Desktop inspection at 1440px confirms a complete, readable logo lockup with a contained navigation and no hero-card collision. Mobile inspection at 390px confirms a complete logo lockup, a contained menu trigger, readable hero text and vertically stacked CTA buttons with no horizontal overflow. The remaining step is to publish and check the external Vercel result after the new source is synchronized.

The live Vercel follow-up confirms that the header image now resolves from `https://gloryfintech-nuqnlxra.manus.space/manus-storage/glory-official-wordmark_e2592f8d.png`, reports a natural size of 1774 × 887 pixels, and is complete/visible in the page. This removes the earlier relative-path fallback that exposed clipped Turkish alt text in the upper-left navigation.

The logo container was then adjusted to trim only the image file’s excess black canvas, rather than allowing the full canvas to enlarge the header. A fresh 1440px review shows the complete GLORY symbol, wordmark and microcopy within the desktop header without navigation collision. A separate 390px review shows the same complete lockup beside the menu button, with no horizontal overflow and no hero/header overlap.

After the final Vercel deployment, the live page reports the same absolute asset source, a loaded 1774 × 887 image, and a 153.6 × 38.4px header crop window around the visually centered logo image. The final visual pass checks the rendered screenshot itself as the decisive confirmation rather than relying on DOM geometry alone.

The source asset was subsequently replaced with a header-safe, wide GLORY lockup that retains the complete gold symbol, wordmark and tagline while eliminating the original excess canvas. Fresh development renders at 1440px and 390px show this lockup fully visible in the top-left navigation. The desktop navigation stays contained; the mobile lockup remains legible beside the menu trigger, and both viewports preserve the hero hierarchy without horizontal overflow.

Final live review after the Vercel API repair confirms the desktop homepage loads the upper-left GLORY lockup rather than the earlier clipped fallback text. A dedicated 390px mobile review shows the complete gold icon and GLORY wordmark in a compact header lockup, with the menu trigger clear of the mark, readable hero lines, vertically stacked primary actions, and no horizontal overflow.

## Resilience and mobile audit refresh — 2026-08-25

The official header source remains reachable from the absolute Manus asset host (HTTP 200, `image/png`). The shared `BrandMark` now prioritizes this above-the-fold image and preserves fixed header geometry with explicit dimensions. If an external deployment or a transient network condition prevents the image from loading, the component replaces the empty image area with a contained GLORY text lockup that retains the brand name and tagline instead of showing a broken-image icon or clipped alt text.

Fresh local checks cover the homepage, whitepaper, 6lory and Control Room at a 390px phone width. The public routes retain the complete official lockup, readable hero/whitepaper copy, contained cards and no visible horizontal collision. The Control Room keeps vertically stacked fields and a horizontally scrollable category rail appropriate for touch. The 6lory page retains its planned-status image treatment without obscuring the primary message. External Vercel verification remains the follow-up step after source synchronization.

The responsive-logo source update was synchronized to GitHub commit `0c03629b44ab5cd6a56f73946baae5bf62ff715d` and its Vercel production deployment completed with state `READY`. The deployment URL returned HTTP 200. The canonical public domain also renders the complete GLORY public document and its ecosystem image reference. The protected per-deployment URL is intentionally not suitable for public browser validation because Vercel Authentication intercepts it; the canonical `glorytoken.vercel.app` domain is the relevant public surface.

Independent Chromium captures of the canonical production domain provide the final visual confirmation. At 1440 × 900, the complete official gold GLORY lockup appears in the upper left, navigation remains contained, and the hero prism image is fully visible. At 390 × 844, the same complete lockup, visible menu trigger, readable hero content, full-width CTA targets and lower hero image all render without clipping or horizontal overflow.

The canonical production `/admin` route was also checked at 390 × 844 while unauthenticated. Its administrator sign-in card remains fully contained, labels and inputs are legible, and the primary entry control fills the available touch width. Authenticated Control Room category management remains protected by the administrator session and is not exposed in a public visual check.

An additional canonical-production interaction check verifies the mobile header behavior after React hydration. The official wordmark reports a loaded image, the menu trigger changes to its expanded state, seven mobile navigation links become available, and the hero CTA targets are each at least 44px tall. This establishes both visual and interactive mobile evidence for the public surface.

The development capture process also revealed that an image can remain unresolved momentarily after the header container paints. The shared brand component now renders a compact GLORY text lockup beneath the official image until the image load event completes; the official asset then fades in over it. If the image fails entirely, that same lockup remains visible. The regression test, TypeScript check, production build, 1440px desktop preview and 390px mobile preview all passed after this change.

## Cross-domain production comparison — 2026-08-25

Independent 1440 × 900 Chromium captures of the canonical Vercel domain and the Manus production domain render the same complete official GLORY lockup and gold/obsidian hero prism composition. Both show the upper-left logo, the desktop navigation, the two hero actions and the GLRY specification card. The Manus surface adds its own platform badge, but neither live surface has a missing logo or hero image in the tested render.

The corresponding 390 × 844 mobile captures also match in the relevant public header and hero region: the complete official logo is visible in the upper left, the menu trigger is visible in the upper right, CTA targets are full width, and the lower hero prism image begins without clipping. The Manus badge overlays only its own platform surface and does not obscure the GLORY navigation or primary CTA content.

The GitHub `main` branch was rechecked against Vercel Production and both point to the visual-resilience release commit `fe1b353b5410ed1ae53f18368ee4ba69690c735e`, whose production deployment is `READY`. The remote branch contains the wordmark load handler and visible fallback source. All four current media paths respond successfully from the asset host: the ecosystem orbit, header lockup, hero prism and technical field each returned HTTP 200 with an image content type. In addition to these successful requests, the hero and ecosystem areas now retain designed CSS fallback compositions until their remote images finish loading or if a request fails, preventing the empty visual regions that could otherwise make a public page appear incomplete.

Vercel Production whitepaper screenshots at 1440 × 900 and 390 × 844 confirm the shared GLORY lockup is visible in the document header, the web-whitepaper masthead and body copy remain readable, and the Copy Contract / Verify GLRY Contract actions remain fully reachable. The phone layout keeps the back navigation, wordmark and action targets contained with no horizontal clipping.

Vercel Production 6lory screenshots at 1440 × 900 and 390 × 844 confirm the same visible GLORY lockup, planned-status indicator, restrained product prism treatment and fully contained Product Signal card. The 6lory phone layout preserves the heading, body, return/document links and information card without horizontal overflow or obscured media.
