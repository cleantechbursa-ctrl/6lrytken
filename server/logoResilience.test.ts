import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const brandSource = readFileSync(new URL("../client/src/components/glory/Brand.tsx", import.meta.url), "utf8");
const sectionSource = readFileSync(new URL("../client/src/components/glory/sections.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");

describe("GLORY official header lockup", () => {
  it("keeps a visible text fallback if the external official wordmark cannot load", () => {
    expect(brandSource).toContain("wordmarkLoadFailed");
    expect(brandSource).toContain("wordmarkLoaded");
    expect(brandSource).toContain("onLoad={() => setWordmarkLoaded(true)}");
    expect(brandSource).toContain("onError={() => setWordmarkLoadFailed(true)}");
    expect(brandSource).toContain("glory-wordmark-fallback");
    expect(styles).toContain(".glory-wordmark-fallback");
    expect(styles).toContain("img.glory-wordmark-image-ready { opacity: 1; }");
  });

  it("prioritizes the above-the-fold official wordmark without losing a fixed layout", () => {
    expect(brandSource).toContain('loading="eager"');
    expect(brandSource).toContain('fetchPriority="high"');
    expect(styles).toContain("aspect-ratio: 4 / 1");
  });

  it("keeps hero and ecosystem visual regions designed when remote images are delayed or fail", () => {
    expect(sectionSource).toContain("heroImageFailed");
    expect(sectionSource).toContain("ecosystemImageFailed");
    expect(sectionSource).toContain("hero-image-fallback");
    expect(sectionSource).toContain("ecosystem-image-fallback");
    expect(styles).toContain(".hero-image-fallback");
    expect(styles).toContain(".ecosystem-image-fallback");
  });
});
