# GLORY Header Logo Regression — 2026-08-25

The reported Vercel screenshot was reproduced at the source level: the official wordmark was referenced through a relative `/manus-storage/...` path. That path resolves in the managed development preview but is not served by the external Vercel deployment; its failed image fallback exposes truncated alt text in the upper-left header.

The correction changes the public wordmark source to the existing absolute GLORY asset host. Desktop inspection at 1440px confirms a complete, readable logo lockup with a contained navigation and no hero-card collision. Mobile inspection at 390px confirms a complete logo lockup, a contained menu trigger, readable hero text and vertically stacked CTA buttons with no horizontal overflow. The remaining step is to publish and check the external Vercel result after the new source is synchronized.

The live Vercel follow-up confirms that the header image now resolves from `https://gloryfintech-nuqnlxra.manus.space/manus-storage/glory-official-wordmark_e2592f8d.png`, reports a natural size of 1774 × 887 pixels, and is complete/visible in the page. This removes the earlier relative-path fallback that exposed clipped Turkish alt text in the upper-left navigation.

The logo container was then adjusted to trim only the image file’s excess black canvas, rather than allowing the full canvas to enlarge the header. A fresh 1440px review shows the complete GLORY symbol, wordmark and microcopy within the desktop header without navigation collision. A separate 390px review shows the same complete lockup beside the menu button, with no horizontal overflow and no hero/header overlap.
