/** GLORY server authorization helpers. */
export function isConfiguredAdminEmail(email: string | null | undefined) {
  const configuredEmail = process.env.GLORY_ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(configuredEmail && email && configuredEmail === email.trim().toLowerCase());
}
