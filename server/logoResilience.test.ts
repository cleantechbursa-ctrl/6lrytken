import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const brandSource = readFileSync(new URL("../client/src/components/glory/Brand.tsx", import.meta.url), "utf8");
const styles = readFileSync(new URL("../client/src/index.css", import.meta.url), "utf8");

describe("GLORY official header lockup", () => {
  it("keeps a visible text fallback if the external official wordmark cannot load", () => {
    expect(brandSource).toContain("wordmarkLoadFailed");
    expect(brandSource).toContain("onError={() => setWordmarkLoadFailed(true)}");
    expect(brandSource).toContain("glory-wordmark-fallback");
    expect(styles).toContain(".glory-wordmark-fallback");
  });

  it("prioritizes the above-the-fold official wordmark without losing a fixed layout", () => {
    expect(brandSource).toContain('loading="eager"');
    expect(brandSource).toContain('fetchPriority="high"');
    expect(styles).toContain("aspect-ratio: 4 / 1");
  });
});
