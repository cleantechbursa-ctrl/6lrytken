import { describe, expect, it } from "vitest";
import { OFFICIAL_GLORY_WORDMARK_SRC } from "./Brand";

describe("official GLORY brand asset", () => {
  it("uses the externally deployable published user-supplied wordmark asset", () => {
    expect(OFFICIAL_GLORY_WORDMARK_SRC).toBe("https://gloryfintech-nuqnlxra.manus.space/manus-storage/glory-official-wordmark_e2592f8d.png");
  });
});
