import { describe, expect, it } from "vitest";
import { cloneDefaultGloryContent, gloryContentSchema } from "../shared/gloryContent";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createUserContext(): TrpcContext {
  return {
    user: {
      id: 12,
      openId: "regular-user",
      email: "regular@example.com",
      name: "Regular User",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("GLORY content control room", () => {
  it("rejects publication attempts made by a non-admin user", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.glory.save(cloneDefaultGloryContent())).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("accepts official HTTPS social destinations", () => {
    const content = cloneDefaultGloryContent();
    content.community.xUrl = "https://x.com/gloryofficial";
    content.community.telegramUrl = "https://t.me/gloryofficial";
    content.community.discordUrl = "https://discord.gg/gloryofficial";

    expect(gloryContentSchema.parse(content).community).toMatchObject({
      xUrl: "https://x.com/gloryofficial",
      telegramUrl: "https://t.me/gloryofficial",
      discordUrl: "https://discord.gg/gloryofficial",
    });
  });

  it.each([
    ["xUrl", "http://x.com/gloryofficial"],
    ["xUrl", "https://example.com/gloryofficial"],
    ["telegramUrl", "https://discord.gg/gloryofficial"],
    ["discordUrl", "https://example.com/gloryofficial"],
  ])("rejects an invalid %s social destination", (field, value) => {
    const content = cloneDefaultGloryContent();
    content.community[field as "xUrl" | "telegramUrl" | "discordUrl"] = value;

    expect(() => gloryContentSchema.parse(content)).toThrow();
  });
});
