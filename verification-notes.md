# GLRY Public Contract Verification Notes

**Checked:** 24 August 2026

The official public address used throughout this project is:

`0xC7717427b4f2c4dC6C65999554CBF2F95F9A2d33`

The BscScan contract page was reachable but presented a CAPTCHA barrier. The publicly exposed source/ABI material available before the barrier showed a `GLORY` name constant, `GLRY` symbol constant, an `INITIAL_SUPPLY` getter and the standard ERC-20 methods. The constructor creation code includes `0x033b2e3c9fd0803ce8000000`, corresponding to the configured fixed supply of `1,000,000,000 × 10^18` units.

The exposed ABI did not show post-deployment mint, owner/admin, tax, blacklist or pause controls; it included standard ERC-20 transfer and allowance methods only. The production website intentionally makes no price, market-cap, holder, volume, liquidity, exchange-listing or safety guarantee claim.

Public source: [BscScan contract page](https://bscscan.com/address/0xC7717427b4f2c4dC6C65999554CBF2F95F9A2d33).

## Live Preview Functional Checks

- The homepage **COPY CONTRACT** control was tested in the live preview. It placed the official GLRY address on the clipboard and displayed the required `Copied!` confirmation with the description `Official GLRY contract address`.
- The primary **Whitepaper** navigation was tested in the live preview and correctly opened the implemented `/whitepaper` route.
- All visible BscScan actions reference the same official address recorded above; external destination verification is subject to BscScan’s CAPTCHA wall.

## Final Audit Notes

- The web-native whitepaper contains all thirteen required sections and now exposes the requested **VERIFY GLRY CONTRACT** action, which resolves to the official BscScan address.
- The tokenomics presentation is explicitly marked as a planned ecosystem allocation and its published percentages sum to 100% of 1,000,000,000 GLRY.
- Client-code audit found a single hard-coded blockchain address: the official `GLRY_CONTRACT` constant. All BscScan URLs are derived from that source of truth.
- No unsupported live price, market-cap, volume, holder, user, exchange-listing or transaction metric is presented. The sole “Liquidity” references concern planned allocation and roadmap activity, not a claimed market metric.
- The final live-preview interaction test confirmed the homepage **COPY CONTRACT** control again produced the `Copied!` confirmation for the official GLRY address.
- Responsive visual checks passed at 320px, 375px, 390px, 430px, 768px, 1024px and 1440px for the homepage and whitepaper viewports; no horizontal content overflow was observed in the tested navigation, CTA, card, whitepaper or contract controls.

## Control Room Verification

- The `/admin` route is protected: an anonymous browser receives only the sign-in screen, and the API-level test rejects a non-admin publication attempt.
- A first browser OAuth handoff was initiated with the intended administrator account, but the preview-domain session was not yet established on return. The first authenticated save-and-publish verification remains pending.
- The requested credential-backed GLORY administrator flow was then verified successfully: the supplied administrator email and password opened the Control Room, which displayed the authenticated GLORY Administrator identity.
- With explicit user confirmation, the unchanged approved content was saved as the initial managed-content record. The Control Room displayed the successful `Changes published` confirmation.
- Following publication, the anonymous public homepage and web-native whitepaper both rendered the saved GLORY content, including the official contract, planned tokenomics and all thirteen whitepaper sections.
- Post-auth metadata review confirmed the GLORY document title, description, canonical social-sharing fields, theme color, favicon and Syne/Manrope/IBM Plex Mono font configuration remain intact.
- Final public navigation review confirmed homepage navigation reaches the whitepaper route. The displayed BscScan links consistently resolve to the centralized official GLRY contract address; community entries remain intentionally non-linking “Coming Soon” actions until official URLs are entered through the Control Room.
- Route metadata is now explicitly controlled in `App.tsx`. The rendered `/whitepaper` route was verified with title and OG title `GLORY Whitepaper — GLRY Ecosystem & Contract`, plus its distinct explanatory description.
- The rendered `/` homepage was verified with title and OG title `GLORY — BUILD. EARN. BELONG.`, plus its original GLRY ecosystem description.
- The authenticated `/admin` Control Room was verified with title and OG title `GLORY Control Room — Administrator Access`, plus its restricted-access description. The local administrator session remained active after navigation.
- In the final public-site pass, the community X placeholder was exercised as a controlled “Coming Soon” action rather than an outbound or broken link. The navigation and footer continued to expose the expected internal destinations, while every displayed BscScan destination used the centralized official contract URL.
- The official BscScan destination for `0xC7717427b4f2c4dC6C65999554CBF2F95F9A2d33` remained reachable. Browser rendering encountered an anti-bot challenge, but the returned page content still exposed the GLORY/GLRY constructor identifiers and contract ABI, corroborating the correct destination.
- A final rendered-DOM audit found every required primary navigation and footer target present: `ecosystem`, `glry`, `tokenomics`, `roadmap`, `community`, `transparency` and `risk-disclosure`. All corresponding internal hrefs and the `/whitepaper` route were present. Seven displayed BscScan links used the exact official GLRY destination; no unexpected BscScan URL was found.
- The final browser click-through audit explicitly triggered the navbar home, ecosystem, GLRY, tokenomics, roadmap and community links, plus footer ecosystem, GLRY, tokenomics, roadmap, community, transparency/contract and risk-disclosure links. Each link produced its expected hash and landed on an existing target. The whitepaper route and the controlled community placeholder were also exercised separately.
- A single final anchor pass recorded successful route/hash results for every navbar and footer same-page link. The navbar Whitepaper link was then physically clicked and reached `/whitepaper` with the expected distinct page title.
- The first indexed footer Whitepaper interaction kept the document on the homepage and moved the viewport into the footer area, so the final audit is retrying that route using the exact rendered footer selector rather than relying on the unstable viewport index.
- The exact rendered footer Whitepaper anchor was then dispatched successfully, reaching `/whitepaper`; the resulting page rendered with title `GLORY Whitepaper — GLRY Ecosystem & Contract`. This completes the final link-by-link pass across the navbar and footer.
- The Vercel-ready GLORY source tree was synchronized to `cleantechbursa-ctrl/6lrytken` on GitHub `main` through the authenticated GitHub API. The remote repository now exposes the `api`, `client`, `server`, `shared`, `vercel.json`, `VERCEL_SETUP.md`, package and migration files; commit `53c68b46c64588bd8add52d1998a84dcde956e0b` created the full project tree.
- The connected Vercel domain `https://glorytoken.vercel.app/` was checked after synchronization and returned the complete GLORY homepage with the expected title, public route content, externally reachable GLORY images, contract controls and whitepaper navigation. The previously reported external-domain availability issue is resolved for the homepage.
- Direct Vercel deep-link checks also passed for `/whitepaper`, which rendered the GLORY Whitepaper title and all thirteen published sections, and `/admin`, which rendered the protected GLORY Control Room sign-in form rather than a Vercel 404 or deployment error.

## GitHub Kaynak Ağacı Yayın Öncesi Denetimi

**Checked:** 25 August 2026

- GitHub repository `cleantechbursa-ctrl/6lrytken`, branch `main`, latest commit `ecedff1f3a2669d1e12fb2c63e1bdcec0d223cf9` (`Audit GitHub source tree before GLORY launch`) contains 154 blob files.
- The 153 locally tracked project files were compared against the GitHub tree by blob SHA. All 153 matched exactly; no local tracked source file was missing from GitHub and no content mismatch remained after synchronization.
- The one GitHub-only file, `client/public/__manus__/version.json`, is generated Manus deployment metadata and is intentionally ignored in the local project. It is present in the remote source tree and does not represent a missing application source file.
- Critical launch files were all present remotely: `package.json`, `pnpm-lock.yaml`, `client/index.html`, `client/src/App.tsx`, `client/src/pages/Home.tsx`, `server/db.ts`, `server/routers.ts`, `api/[...path].ts`, `api/trpc/[...trpc].ts`, `vercel.json`, `VERCEL_SETUP.md`, `todo.md`, `persistence-session-audit.md` and `verification-notes.md`.
- Local `pnpm test`, `pnpm check` and `pnpm build` passed. The build produced `dist/public` and the server bundle required by the committed Vercel configuration.
- Vercel Production deployment `dpl_GuZTDYRurs1Rj5NDTtCznoy3LUGT` reached `READY` and reported the same GitHub SHA `ecedff1f3a2669d1e12fb2c63e1bdcec0d223cf9`. The live `/`, `/whitepaper`, `/6lory` and `/admin` routes rendered successfully; the Vercel runtime error query returned no errors for the previous 24 hours.

## Social Destination Management

**Checked:** 25 August 2026

- The Control Room Topluluk tab now presents dedicated X / Twitter, Telegram and Discord URL cards with examples, platform-specific HTTPS guidance and an explicit empty-field explanation.
- The shared content schema accepts empty values or official HTTPS destinations only: `x.com` / `twitter.com`, `t.me` / `telegram.me`, and `discord.gg` / `discord.com`. Unsupported domains and HTTP URLs are rejected before publication.
- The existing full-document `glory.save` persistence path carries the social fields into MySQL or Vercel Blob without a separate migration. An admin-positive router test confirms valid social destinations are passed to the persistence helper, while the non-admin rejection remains covered.
- Public CommunitySection rendering was tested with all three official URLs and with empty defaults. Official destinations render as `target="_blank"` links with `rel="noopener noreferrer"`; empty destinations remain non-linking “Coming Soon” cards.
- Control Room Community UI was visually checked at desktop and 390px mobile widths; the horizontal category rail remains contained and the three social cards are arranged responsively. Final validation passed with 10 Vitest files / 19 tests, TypeScript and Vercel production build.
