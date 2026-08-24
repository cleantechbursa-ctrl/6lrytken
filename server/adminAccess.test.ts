import { describe, expect, it } from "vitest";
import { isConfiguredAdminEmail } from "./adminAccess";

describe("GLORY administrator email configuration", () => {
  it("recognizes the configured administrator email while rejecting another address", () => {
    const configuredEmail = process.env.GLORY_ADMIN_EMAIL;

    expect(configuredEmail).toBeTruthy();
    expect(isConfiguredAdminEmail(configuredEmail)).toBe(true);
    expect(isConfiguredAdminEmail("not-an-admin@example.com")).toBe(false);
  });
});

