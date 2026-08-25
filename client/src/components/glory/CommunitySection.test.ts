import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { cloneDefaultGloryContent, type GloryContent } from "@shared/gloryContent";

const mocked = vi.hoisted(() => ({ content: null as GloryContent | null }));

vi.mock("@/contexts/GloryContentContext", () => ({
  useGloryContent: () => mocked.content,
}));

import { CommunitySection } from "@/components/glory/sections";

describe("public community destinations", () => {
  it("renders official URLs as secure external links", () => {
    const content = cloneDefaultGloryContent();
    content.community.xUrl = "https://x.com/gloryofficial";
    content.community.telegramUrl = "https://t.me/gloryofficial";
    content.community.discordUrl = "https://discord.gg/gloryofficial";
    mocked.content = content;

    const markup = renderToStaticMarkup(React.createElement(CommunitySection));

    expect(markup).toContain('href="https://x.com/gloryofficial"');
    expect(markup).toContain('href="https://t.me/gloryofficial"');
    expect(markup).toContain('href="https://discord.gg/gloryofficial"');
    expect(markup).toContain('target="_blank"');
    expect(markup).toContain('rel="noopener noreferrer"');
    expect(markup).not.toContain("COMING SOON");
  });

  it("keeps empty channels as non-linking Coming Soon cards", () => {
    mocked.content = cloneDefaultGloryContent();

    const markup = renderToStaticMarkup(React.createElement(CommunitySection));

    expect(markup.match(/COMING SOON/g)?.length).toBe(3);
    expect(markup).not.toContain("href=\"\"");
    expect(markup).not.toContain('target="_blank"');
  });
});
