import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("GLORY Vercel Blob content fallback", () => {
  it("keeps managed content persistent when Vercel does not provide DATABASE_URL", () => {
    const dbSource = readFileSync(new URL("./db.ts", import.meta.url), "utf8");

    expect(dbSource).toContain('from "@vercel/blob"');
    expect(dbSource).toContain('const GLORY_CONTENT_BLOB_PATH = "glory/site-content.json"');
    expect(dbSource).toContain("process.env.BLOB_READ_WRITE_TOKEN");
    expect(dbSource).toContain("await saveGloryContentToBlob(content, updatedBy)");
    expect(dbSource).toContain("return readGloryContentFromBlob()");
  });
});
