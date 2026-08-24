/** GLORY local administrator session helpers, backed solely by server-side secrets. */
import { timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import { parse } from "cookie";
import type { User } from "../drizzle/schema.js";
import { isConfiguredAdminEmail } from "./adminAccess.js";

export const LOCAL_ADMIN_COOKIE = "glory_admin_session";
const SESSION_SECONDS = 60 * 60 * 12;

function signingKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Server session signing is not configured.");
  return new TextEncoder().encode(`${secret}:glory-local-admin`);
}

function configuredPasswordMatches(candidate: string) {
  const configured = process.env.GLORY_ADMIN_PASSWORD;
  if (!configured) return false;
  const provided = Buffer.from(candidate);
  const expected = Buffer.from(configured);
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}

export function localAdminCredentialsAreValid(email: string, password: string) {
  return isConfiguredAdminEmail(email) && configuredPasswordMatches(password);
}

export function localAdminUser(): User {
  const now = new Date();
  return { id: 0, openId: "glory-local-admin", email: process.env.GLORY_ADMIN_EMAIL ?? null, name: "GLORY Administrator", loginMethod: "local-password", role: "admin", createdAt: now, updatedAt: now, lastSignedIn: now };
}

export async function createLocalAdminSession() {
  return new SignJWT({ scope: "glory-admin" }).setProtectedHeader({ alg: "HS256" }).setSubject("glory-local-admin").setIssuedAt().setExpirationTime(`${SESSION_SECONDS}s`).sign(signingKey());
}

export async function localAdminFromRequest(request: { headers: { cookie?: string } }) {
  const token = parse(request.headers.cookie ?? "")[LOCAL_ADMIN_COOKIE];
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, signingKey());
    return payload.sub === "glory-local-admin" && payload.scope === "glory-admin" ? localAdminUser() : null;
  } catch {
    return null;
  }
}

export function setLocalAdminCookie(response: { cookie: Function }, token: string) {
  response.cookie(LOCAL_ADMIN_COOKIE, token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: SESSION_SECONDS * 1_000 });
}

export function clearLocalAdminCookie(response: { clearCookie: Function }) {
  response.clearCookie(LOCAL_ADMIN_COOKIE, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: -1 });
}
