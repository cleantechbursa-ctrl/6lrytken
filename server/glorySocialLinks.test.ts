import { describe, expect, it, vi } from "vitest";
import { cloneDefaultGloryContent } from "../shared/gloryContent";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const mocks = vi.hoisted(() => ({
  getGlorySiteContent: vi.fn(),
  saveGlorySiteContent: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./db.js", () => mocks);

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 42,
      openId: "glory-admin",
      email: "admin@glory.example",
      name: "GLORY Administrator",
      loginMethod: "local",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("GLORY social destinations", () => {
  it("publishes valid social URLs through the admin save procedure", async () => {
    const content = cloneDefaultGloryContent();
    content.community.xUrl = "https://x.com/gloryofficial";
    content.community.telegramUrl = "https://t.me/gloryofficial";
    content.community.discordUrl = "https://discord.gg/gloryofficial";

    const caller = appRouter.createCaller(createAdminContext());
    await expect(caller.glory.save(content)).resolves.toEqual({ success: true });
    expect(mocks.saveGlorySiteContent).toHaveBeenCalledWith(content, 42);
  });
});
