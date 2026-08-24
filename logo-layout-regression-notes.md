# GLORY Header Logo Regression — 2026-08-25

The reported Vercel screenshot was reproduced at the source level: the official wordmark was referenced through a relative `/manus-storage/...` path. That path resolves in the managed development preview but is not served by the external Vercel deployment; its failed image fallback exposes truncated alt text in the upper-left header.

The correction changes the public wordmark source to the existing absolute GLORY asset host. Desktop inspection at 1440px confirms a complete, readable logo lockup with a contained navigation and no hero-card collision. Mobile inspection at 390px confirms a complete logo lockup, a contained menu trigger, readable hero text and vertically stacked CTA buttons with no horizontal overflow. The remaining step is to publish and check the external Vercel result after the new source is synchronized.
