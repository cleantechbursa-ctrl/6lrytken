/**
 * GLORY — Altın Eşik / source of truth
 * Every user-facing contract reference derives from these immutable official values.
 */
import { OAUTH_STATE_COOKIE, encodeOAuthState } from "@shared/const";

export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

export function startLogin() {
  const appId = import.meta.env.VITE_APP_ID;
  const portalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;

  if (!appId || !portalUrl) {
    throw new Error("GLORY sign-in is not configured.");
  }

  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const nonce = crypto.randomUUID();
  document.cookie = `${OAUTH_STATE_COOKIE}=${nonce}; Path=/; Max-Age=600; SameSite=None; Secure`;

  const params = new URLSearchParams({
    app_id: appId,
    redirect_url: redirectUri,
    state: encodeOAuthState({ redirectUri, nonce }),
  });
  window.location.assign(`${portalUrl}/login?${params.toString()}`);
}

/** Public asset origin retained for external deployments such as Vercel. */
export const GLORY_ASSET_ORIGIN = "https://gloryfintech-nuqnlxra.manus.space";
export const gloryAsset = (filename: string) => `${GLORY_ASSET_ORIGIN}/manus-storage/${filename}`;

export const GLRY_CONTRACT = "0xC7717427b4f2c4dC6C65999554CBF2F95F9A2d33";
export const BSCSCAN_URL = `https://bscscan.com/address/${GLRY_CONTRACT}`;

export const TOKEN_DETAILS = [
  ["Name", "GLORY"],
  ["Symbol", "GLRY"],
  ["Network", "BNB Chain Mainnet"],
  ["Standard", "ERC-20 compatible / BEP-20 compatible"],
  ["Decimals", "18"],
  ["Total Supply", "1,000,000,000 GLRY"],
  ["Verified", "YES"],
] as const;

export const CONTRACT_GUARDS = [
  ["Mint Authority", "None"],
  ["Owner / Admin", "None"],
  ["Tax", "None"],
  ["Blacklist", "None"],
  ["Pause", "None"],
] as const;

export const TOKENOMICS = [
  { label: "Ecosystem & Rewards", percentage: 30, amount: "300,000,000 GLRY", tone: "#c6a66a" },
  { label: "Liquidity", percentage: 20, amount: "200,000,000 GLRY", tone: "#a78b60" },
  { label: "Treasury", percentage: 15, amount: "150,000,000 GLRY", tone: "#73604a" },
  { label: "Community", percentage: 12, amount: "120,000,000 GLRY", tone: "#e1c78f" },
  { label: "Partnerships", percentage: 8, amount: "80,000,000 GLRY", tone: "#8d785b" },
  { label: "Marketing", percentage: 7, amount: "70,000,000 GLRY", tone: "#b49a6e" },
  { label: "Team", percentage: 5, amount: "50,000,000 GLRY", tone: "#5e5141" },
  { label: "Reserve", percentage: 3, amount: "30,000,000 GLRY", tone: "#dbc185" },
] as const;
