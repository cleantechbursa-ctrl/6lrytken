import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const vercelTrpcEntry = readFileSync(new URL("../api/trpc/[...trpc].ts", import.meta.url), "utf8");

describe("GLORY Vercel tRPC entry", () => {
  it("exposes the application router and request context through an explicit API catch-all", () => {
    expect(vercelTrpcEntry).toContain('import { appRouter } from "../../server/routers.js"');
    expect(vercelTrpcEntry).toContain('import { createContext } from "../../server/_core/context.js"');
    expect(vercelTrpcEntry).toContain("createExpressMiddleware({");
    expect(vercelTrpcEntry).toContain("export default app;");
  });
});
